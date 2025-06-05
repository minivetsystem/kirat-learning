"use server";

import { revalidatePath } from "next/cache";

export async function submitRegistration(formData, accessToken) {
  const tenantName = "kiratitsolutions1";
  const siteName = "ProjectForms";
  const uploadFolderPath = "uploads/files";
  const excelFileFolderPath = "uploads";
  const excelFileName = "Forms.xlsx";
  const excelWorksheetName = "Sheet1";

  try {
    // Extract and validate form data
    const registrationData = extractFormData(formData);
    const validationResult = validateRegistrationData(registrationData);

    if (!validationResult.isValid) {
      return { success: false, error: validationResult.error };
    }

    // Get SharePoint site and drive information
    const sharePointInfo = await getSharePointInfo(accessToken, tenantName, siteName);
    if (!sharePointInfo.success) {
      return { success: false, error: sharePointInfo.error };
    }

    let fileUrl = null;

    // Handle file upload if present
    if (registrationData.file) {
      const uploadResult = await uploadFileToSharePoint(
        registrationData.file,
        accessToken,
        sharePointInfo.siteId,
        sharePointInfo.driveId,
        uploadFolderPath,
      );

      if (!uploadResult.success) {
        return { success: false, error: uploadResult.error };
      }

      fileUrl = uploadResult.fileUrl;
    }

    // Add data to Excel file
    const excelResult = await addDataToExcel(
      accessToken,
      sharePointInfo.siteId,
      sharePointInfo.driveId,
      excelFileFolderPath,
      excelFileName,
      excelWorksheetName,
      { ...registrationData, fileUrl },
    );

    if (!excelResult.success) {
      return { success: false, error: excelResult.error };
    }

    // Revalidate any cached data
    revalidatePath("/registration");

    return {
      success: true,
      message: "Registration submitted successfully! We'll get back to you soon.",
    };
  } catch (error) {
    console.error("Registration submission error:", error);
    return {
      success: false,
      error: getErrorMessage(error),
    };
  }
}

function extractFormData(formData) {
  return {
    name: formData.get("name")?.toString().trim() || "",
    email: formData.get("email")?.toString().trim().toLowerCase() || "",
    phone: formData.get("phone")?.toString().trim() || "",
    DOB: formData.get("DOB")?.toString() || "",
    course: formData.get("course")?.toString() || "",
    state: formData.get("state")?.toString() || "",
    city: formData.get("city")?.toString() || "",
    identity: formData.get("identity")?.toString() || "",
    consent: formData.get("consent")?.toString() || "",
    file: formData.get("file") || undefined,
  };
}

function validateRegistrationData(data) {
  const requiredFields = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    DOB: data.DOB,
    course: data.course,
    state: data.state,
    city: data.city,
    identity: data.identity,
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length) {
    return {
      isValid: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  if (!/^[+]?[1-9][\d]{0,15}$/.test(data.phone.replace(/[\s\-()]/g, ""))) {
    return { isValid: false, error: "Please enter a valid phone number" };
  }

  if (data.consent !== "true") {
    return { isValid: false, error: "Consent is required to proceed with registration" };
  }

  if (data.file && data.file.size > 10 * 1024 * 1024) {
    return { isValid: false, error: "File size should not exceed 10MB" };
  }

  return { isValid: true };
}

async function getSharePointInfo(accessToken, tenantName, siteName) {
  try {
    // Get Site ID
    const siteUrl = `https://graph.microsoft.com/v1.0/sites/${tenantName}.sharepoint.com:/sites/${siteName}`;
    const siteResponse = await fetch(siteUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!siteResponse.ok) {
      throw new Error(`Error getting site: ${siteResponse.status}`);
    }

    const siteData = await siteResponse.json();
    const siteId = siteData.id;

    // Get Drive ID
    const drivesUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives`;
    const drivesResponse = await fetch(drivesUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!drivesResponse.ok) {
      throw new Error(`Error getting drives: ${drivesResponse.status}`);
    }

    const drivesData = await drivesResponse.json();
    const driveId = drivesData.value[0]?.id;

    if (!driveId) {
      throw new Error("No default drive found for the site");
    }

    return { success: true, siteId, driveId };
  } catch (error) {
    console.error("Error getting SharePoint info:", error);
    return { success: false, error: `SharePoint connection failed: ${error.message}` };
  }
}

async function uploadFileToSharePoint(file, accessToken, siteId, driveId, folderPath) {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const encodedFolderPath = folderPath
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");
    const uploadUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/root:/${encodedFolderPath}/${encodeURIComponent(fileName)}:/content`;

    const fileBuffer = await file.arrayBuffer();

    if (file.size < 4 * 1024 * 1024) {
      // Direct upload for files < 4MB
      const response = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": file.type || "application/octet-stream",
        },
        body: fileBuffer,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        fileUrl: `https://kiratitsolutions1.sharepoint.com/sites/projectforms/shared%20documents/${folderPath}/${fileName}`,
      };
    } else {
      // For larger files, implement resumable upload
      return await uploadLargeFile(file, accessToken, siteId, driveId, folderPath, fileName);
    }
  } catch (error) {
    console.error("File upload error:", error);
    return { success: false, error: `File upload failed: ${error.message}` };
  }
}

async function uploadLargeFile(file, accessToken, siteId, driveId, folderPath, fileName) {
  try {
    const encodedFolderPath = folderPath
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");
    const createSessionUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/root:/${encodedFolderPath}/${encodeURIComponent(fileName)}:/createUploadSession`;

    // Create upload session
    const sessionResponse = await fetch(createSessionUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "@microsoft.graph.conflictBehavior": "replace",
      }),
    });

    if (!sessionResponse.ok) {
      throw new Error(`Error creating upload session: ${sessionResponse.status}`);
    }

    const sessionData = await sessionResponse.json();
    const uploadSessionUrl = sessionData.uploadUrl;

    // Upload file in chunks
    const chunkSize = 327680; // 320KB
    const fileBuffer = await file.arrayBuffer();
    let offset = 0;

    while (offset < file.size) {
      const end = Math.min(offset + chunkSize, file.size);
      const chunk = fileBuffer.slice(offset, end);

      const chunkResponse = await fetch(uploadSessionUrl, {
        method: "PUT",
        headers: {
          "Content-Range": `bytes ${offset}-${end - 1}/${file.size}`,
          "Content-Length": chunk.byteLength.toString(),
        },
        body: chunk,
      });

      if (!chunkResponse.ok) {
        throw new Error(`Error uploading chunk: ${chunkResponse.status}`);
      }

      offset = end;
    }

    return {
      success: true,
      fileUrl: `https://kiratitsolutions1.sharepoint.com/sites/projectforms/shared%20documents/${folderPath}/${fileName}`,
    };
  } catch (error) {
    console.error("Large file upload error:", error);
    return { success: false, error: `Large file upload failed: ${error.message}` };
  }
}

async function addDataToExcel(accessToken, siteId, driveId, folderPath, fileName, worksheetName, data) {
  try {
    const encodedFolderPath = folderPath
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");
    const excelFileUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/root:/${encodedFolderPath}/${encodeURIComponent(fileName)}`;

    // Get Excel file info
    const fileResponse = await fetch(excelFileUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!fileResponse.ok) {
      throw new Error(`Error accessing Excel file: ${fileResponse.status}`);
    }

    const fileData = await fileResponse.json();
    const itemId = fileData.id;

    // Get the used range to understand current data structure
    const rangeUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/items/${itemId}/workbook/worksheets('${worksheetName}')/usedRange`;
    const rangeResponse = await fetch(rangeUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!rangeResponse.ok) {
      throw new Error(`Error getting range: ${rangeResponse.status}`);
    }

    const rangeData = await rangeResponse.json();
    const currentValues = rangeData.values || [];

    // Determine headers - use first row if exists, otherwise create default headers
    let headers = [];
    let dataRows = [];

    if (currentValues.length > 0) {
      headers = currentValues[0];
      dataRows = currentValues.slice(1);
    } else {
      headers = [
        "name",
        "email",
        "phone",
        "DOB",
        "course",
        "state",
        "city",
        "identity",
        "consent",
        "fileUrl",
        "timestamp",
      ];
    }

    // Check for duplicates
    if (dataRows.length > 0) {
      const phoneIndex = headers.indexOf("phone");
      const emailIndex = headers.indexOf("email");

      if (phoneIndex >= 0 && emailIndex >= 0) {
        const isDuplicate = dataRows.some(
          (row) => String(row[phoneIndex]) === String(data.phone) && String(row[emailIndex]) === String(data.email),
        );

        if (isDuplicate) {
          return {
            success: false,
            error: "A registration with this phone number and email already exists.",
          };
        }
      }
    }

    // Prepare the new row in correct column order
    const timestamp = new Date().toISOString();
    const newRow = headers.map((header) => {
      if (header === "timestamp") return timestamp;
      return data[header] || "";
    });

    // Prepare the complete data to write back
    let dataToWrite;
    if (currentValues.length === 0) {
      dataToWrite = [headers, newRow];
    } else {
      dataToWrite = [...currentValues, newRow];
    }

    // Calculate the target range address
    const endRow = dataToWrite.length;
    const endCol = headers.length;
    const rangeAddress = `A1:${String.fromCharCode(64 + endCol)}${endRow}`;

    // Update the range
    const updateUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/items/${itemId}/workbook/worksheets('${worksheetName}')/range(address='${rangeAddress}')`;

    const updateResponse = await fetch(updateUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: dataToWrite,
      }),
    });

    if (!updateResponse.ok) {
      throw new Error(`Error updating Excel: ${updateResponse.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Excel data insertion error:", error);
    return { success: false, error: `Failed to save data: ${error.message}` };
  }
}

function getErrorMessage(error) {
  if (error instanceof Error) {
    if (error.message.includes("SharePoint")) {
      return "SharePoint service is temporarily unavailable. Please try again later.";
    } else if (error.message.includes("network")) {
      return "Network error. Please check your connection and try again.";
    } else if (error.message.includes("file")) {
      return "File upload failed. Please try with a smaller file or try again.";
    }
    return error.message;
  }
  return "An unexpected error occurred. Please try again.";
}