import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// SharePoint config using Microsoft Graph
const CLIENT_ID = process.env.AZURE_CLIENT_ID;
const CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET;
const TENANT_ID = process.env.AZURE_TENANT_ID;

// Your SharePoint site and file details
const SITE_URL = ""; // <-- SET this to your SharePoint site URL
const FILE_ID = "6CC4A0EE-606C-441D-BCC5-6926BAC2EE13";

class GraphAPIClient {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    if (this.accessToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
      return this.accessToken;
    }

    const tokenUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;

    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      scope: "https://graph.microsoft.com/.default",
    });

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get access token: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const tokenData = await response.json();
    this.accessToken = tokenData.access_token;
    this.tokenExpiry = new Date(Date.now() + (tokenData.expires_in - 300) * 1000);

    return this.accessToken;
  }

  async makeGraphRequest(url, options = {}) {
    const token = await this.getAccessToken();

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    };

    return fetch(`https://graph.microsoft.com/v1.0${url}`, {
      ...options,
      headers,
    });
  }

  async getSiteId() {
    const hostname = new URL(SITE_URL).hostname;
    const sitePath = new URL(SITE_URL).pathname;

    const response = await this.makeGraphRequest(`/sites/${hostname}:${sitePath}`);

    if (!response.ok) {
      throw new Error(`Failed to get site ID: ${response.status} ${response.statusText}`);
    }

    const siteData = await response.json();
    return siteData.id;
  }

  async getDriveId(siteId) {
    const response = await this.makeGraphRequest(`/sites/${siteId}/drive`);

    if (!response.ok) {
      throw new Error(`Failed to get drive ID: ${response.status} ${response.statusText}`);
    }

    const driveData = await response.json();
    return driveData.id;
  }

  async ensureFolderExists(siteId, folderPath) {
    const pathParts = folderPath.split("/").filter(Boolean);
    let currentPath = "";
    let currentFolderId = "root";

    for (const part of pathParts) {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      const encodedPath = encodeURIComponent(currentPath);

      let response = await this.makeGraphRequest(`/sites/${siteId}/drive/root:/${encodedPath}`);

      if (response.ok) {
        const folderData = await response.json();
        currentFolderId = folderData.id;
      } else {
        const createResponse = await this.makeGraphRequest(
          `/sites/${siteId}/drive/items/${currentFolderId}/children`,
          {
            method: "POST",
            body: JSON.stringify({
              name: part,
              folder: {},
              "@microsoft.graph.conflictBehavior": "rename",
            }),
          }
        );

        if (!createResponse.ok) {
          const errorText = await createResponse.text();
          throw new Error(`Failed to create folder ${part}: ${createResponse.status} - ${errorText}`);
        }

        const newFolder = await createResponse.json();
        currentFolderId = newFolder.id;
      }
    }

    return currentFolderId;
  }

  async uploadFile(siteId, folderPath, fileName, fileContent) {
    await this.ensureFolderExists(siteId, folderPath);

    const extension = fileName.split(".").pop();
    const baseName = fileName.replace(`.${extension}`, "");
    const uniqueFileName = `${baseName}_${uuidv4()}.${extension}`;

    const uploadResponse = await this.makeGraphRequest(
      `/sites/${siteId}/drive/root:/${encodeURIComponent(folderPath)}/${encodeURIComponent(uniqueFileName)}:/content`,
      {
        method: "PUT",
        body: fileContent,
        headers: {
          "Content-Type": "application/octet-stream",
        },
      }
    );

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Failed to upload file: ${uploadResponse.status} - ${errorText}`);
    }

    const uploadData = await uploadResponse.json();
    return uploadData.webUrl;
  }

  async getWorksheetData(siteId, worksheetName = "Sheet1") {
    const response = await this.makeGraphRequest(
      `/sites/${siteId}/drive/items/${FILE_ID}/workbook/worksheets/${worksheetName}/usedRange`
    );

    if (!response.ok) {
      if (response.status === 404) return [];
      throw new Error(`Failed to get worksheet data: ${response.status}`);
    }

    const rangeData = await response.json();
    return rangeData.values || [];
  }

  async addRowToWorksheet(siteId, worksheetName = "Sheet1", rowData = []) {
    const currentData = await this.getWorksheetData(siteId, worksheetName);
    const nextRowIndex = currentData.length + 1;

    const response = await this.makeGraphRequest(
      `/sites/${siteId}/drive/items/${FILE_ID}/workbook/worksheets/${worksheetName}/range(address='A${nextRowIndex}:J${nextRowIndex}')`,
      {
        method: "PATCH",
        body: JSON.stringify({ values: [rowData] }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add row: ${response.status} - ${errorText}`);
    }
  }

  async initializeWorksheet(siteId, worksheetName = "Sheet1") {
    const currentData = await this.getWorksheetData(siteId, worksheetName);

    if (currentData.length === 0) {
      const headers = ["name", "phone", "email", "DOB", "course", "state", "city", "identity", "file_url", "reference"];

      const response = await this.makeGraphRequest(
        `/sites/${siteId}/drive/items/${FILE_ID}/workbook/worksheets/${worksheetName}/range(address='A1:J1')`,
        {
          method: "PATCH",
          body: JSON.stringify({ values: [headers] }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to initialize worksheet: ${response.status}`);
      }
    }
  }
}

function normalizePhone(phone) {
  return phone ? phone.replace(/\D/g, "") : "";
}

export async function POST(request) {
  try {
    if (!CLIENT_ID || !CLIENT_SECRET || !TENANT_ID) {
      throw new Error("Missing Azure configuration in environment variables");
    }

    const formData = await request.formData();
    const name = formData.get("name") || "";
    const phone = formData.get("phone") || "";
    const email = formData.get("email") || "";
    const dob = formData.get("DOB") || "";
    const course = formData.get("course") || "";
    const state = formData.get("state") || "";
    const city = formData.get("city") || "";
    const identity = formData.get("identity") || "";
    const file = formData.get("file");

    if (isNaN(new Date(dob))) {
      return NextResponse.json({ message: "Invalid date format" }, { status: 400 });
    }

    const graphClient = new GraphAPIClient();
    const siteId = await graphClient.getSiteId();
    await graphClient.initializeWorksheet(siteId);
    const existingData = await graphClient.getWorksheetData(siteId);

    const errors = {};
    const inputEmail = email.trim().toLowerCase();
    const inputPhone = normalizePhone(phone);

    if (existingData.length > 1) {
      const dataRows = existingData.slice(1);

      if (inputEmail) {
        const emailExists = dataRows.some((row) => row[2]?.trim().toLowerCase() === inputEmail);
        if (emailExists) errors.email = "This email is already registered.";
      }

      if (inputPhone) {
        const phoneExists = dataRows.some((row) => normalizePhone(row[1]) === inputPhone);
        if (phoneExists) errors.phone = "This phone number is already registered.";
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ message: "Duplicate detected", errors }, { status: 400 });
    }

    let fileUrl = "";
    if (file) {
      try {
        const fileBuffer = await file.arrayBuffer();
        fileUrl = await graphClient.uploadFile(siteId, "uploads/files", file.name, fileBuffer);
      } catch (err) {
        console.error("File upload failed", err);
        fileUrl = "File upload failed";
      }
    }

    const refId = uuidv4();
    const rowData = [name, phone, email, dob, course, state, city, identity, fileUrl, refId];
    await graphClient.addRowToWorksheet(siteId, "Sheet1", rowData);

    return NextResponse.json({
      message: "Registration successful! Data has been added to SharePoint Excel file.",
      referenceId: refId,
      fileUrl: fileUrl || null,
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 });
  }
}
