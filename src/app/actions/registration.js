"use server";

import React, { useState, useEffect, useCallback } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "./msalConfig";

export async function submitRegistration(formData) {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const [accessToken, setAccessToken] = useState("");
  const [siteId, setSiteId] = useState("");
  const [driveId, setDriveId] = useState("");
  const [formsExcelItemId, setFormsExcelItemId] = useState("");
  const [excelData, setExcelData] = useState([]); // Stores data read from Excel
  const [status, setStatus] = useState("Please sign in to upload files.");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const tenantName = "kiratitsolutions1"; // Replace with your SharePoint hostname prefix (e.g., 'contoso')
  const siteName = "ProjectForms"; // Replace with the actual name of your SharePoint site
  const uploadFolderPath = "uploads/files"; // Folder where uploaded files are located
  const excelFileFolderPath = "uploads"; // Folder where Forms.xlsx is located
  const excelFileName = "Forms.xlsx"; // File name for data entry.
  const excelWorksheetName = "Sheet1"; // Default worksheet name

  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const DOB = formData.get("DOB");
    const course = formData.get("course");
    const state = formData.get("state");
    const city = formData.get("city");
    const file = formData.get("file");
    const identity = formData.get("identity");
    const consent = formData.get("consent");

    console.log("Form data extracted:", {
      name,
      email,
      phone,
      DOB,
      course,
      state,
      city,
      identity,
      consent,
      fileSize: file?.size,
    });

    useEffect(() => {
      if (isAuthenticated) {
        acquireToken();
      } else {
        setStatus("Please sign in to upload files.");
        setAccessToken("");
        setSiteId("");
        setDriveId("");
        setFormsExcelItemId("");
        setExcelData([]);
      }
    }, [isAuthenticated, acquireToken]);

    const acquireToken = useCallback(async () => {
      if (accounts.length > 0) {
        try {
          const response = await instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
          });
          setAccessToken(response.accessToken);
          setStatus("Access token acquired. Getting SharePoint info...");
          return response.accessToken;
        } catch (error) {
          console.error(
            "Silent token acquisition failed. Acquiring token with redirect...",
            error
          );
          instance.acquireTokenRedirect(loginRequest); // Fallback to redirect if silent fails
        }
      }
      return null;
    }, [accounts, instance]);

    // --- Get SharePoint Site, Drive, and Excel Item IDs ---
    const getSharePointInfo = useCallback(
      async (token) => {
        if (!token) return;

        try {
          // 1. Get Site ID by path
          const siteUrl = `https://graph.microsoft.com/v1.0/sites/${tenantName}.sharepoint.com:/sites/${siteName}`;
          const siteResponse = await fetch(siteUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });

          if (!siteResponse.ok) {
            throw new Error(
              `Error getting site: ${
                siteResponse.status
              } - ${await siteResponse.text()}`
            );
          }
          const siteData = await siteResponse.json();
          const fetchedSiteId = siteData.id;
          console.log("SharePoint Site ID:", fetchedSiteId);
          setSiteId(fetchedSiteId);

          // 2. Get Drive (Document Library) ID for the site
          const drivesUrl = `https://graph.microsoft.com/v1.0/sites/${fetchedSiteId}/drives`;
          const drivesResponse = await fetch(drivesUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });

          if (!drivesResponse.ok) {
            throw new Error(
              `Error getting drives: ${
                drivesResponse.status
              } - ${await drivesResponse.text()}`
            );
          }
          const drivesData = await drivesResponse.json();
          const fetchedDriveId = drivesData.value[0]?.id; // Assuming default document library
          if (!fetchedDriveId) {
            throw new Error("No default drive found for the site.");
          }
          console.log("SharePoint Drive ID:", fetchedDriveId);
          setDriveId(fetchedDriveId);
          // jasbir:: Chaged file path

          // 3. Get Forms.xlsx Item ID
          //   const encodedFolderPath = uploadFolderPath.split('/').map(segment => encodeURIComponent(segment)).join('/');
          //   const excelFileUrl = `https://graph.microsoft.com/v1.0/sites/${fetchedSiteId}/drives/${fetchedDriveId}/root:/${encodedFolderPath}/${encodeURIComponent(excelFileName)}`;

          const encodedFolderPath = excelFileFolderPath
            .split("/")
            .map((segment) => encodeURIComponent(segment))
            .join("/");
          const excelFileUrl = `https://graph.microsoft.com/v1.0/sites/${fetchedSiteId}/drives/${fetchedDriveId}/root:/${encodedFolderPath}/${encodeURIComponent(
            excelFileName
          )}`;

          const excelFileResponse = await fetch(excelFileUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });

          if (!excelFileResponse.ok) {
            throw new Error(
              `Error getting Excel file: ${
                excelFileResponse.status
              } - ${await excelFileResponse.text()}`
            );
          }
          const excelFileData = await excelFileResponse.json();
          const fetchedExcelItemId = excelFileData.id;
          console.log("Forms.xlsx Item ID:", fetchedExcelItemId);
          setFormsExcelItemId(fetchedExcelItemId);

          setStatus(
            "SharePoint info and Excel file located. Ready to interact."
          );
        } catch (error) {
          console.error("Error getting SharePoint info:", error);
          setStatus(`Error getting SharePoint info: ${error.message}`);
        }
      },
      [tenantName, siteName, uploadFolderPath, excelFileName]
    );

    useEffect(() => {
      if (accessToken && !siteId && !driveId) {
        getSharePointInfo(accessToken);
      }
    }, [accessToken, siteId, driveId, getSharePointInfo]);
    // --- Read Excel Data ---
    const readExcelData = useCallback(async () => {
      if (!accessToken || !siteId || !driveId || !formsExcelItemId) {
        setStatus("SharePoint info or Excel file not loaded.");
        return;
      }
      setStatus("Reading Excel data...");
      try {
        const readRangeUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/items/${formsExcelItemId}/workbook/worksheets('${excelWorksheetName}')/usedRange?$select=values`;

        const response = await fetch(readRangeUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Error reading Excel data: ${
              response.status
            } - ${await response.text()}`
          );
        }

        const data = await response.json();
        // 'values' is an array of arrays, representing rows and columns
        const rawValues = data.values;

        if (!rawValues || rawValues.length === 0) {
          setExcelData([]);
          setStatus("Excel file is empty or no data found.");
          return;
        }

        // Assuming first row is headers
        const headers = rawValues[0];
        const rows = rawValues.slice(1); // Actual data rows

        // Convert array of arrays to array of objects for easier processing
        const parsedData = rows.map((row) => {
          const rowObject = {};
          headers.forEach((header, index) => {
            rowObject[header] = row[index];
          });
          return rowObject;
        });

        setExcelData(parsedData);
        setStatus(`Successfully read ${parsedData.length} rows from Excel.`);
        console.log("Parsed Excel Data:", parsedData);
      } catch (error) {
        console.error("Error reading Excel data:", error);
        setStatus(`Error reading Excel data: ${error.message}`);
      }
    }, [accessToken, siteId, driveId, formsExcelItemId, excelWorksheetName]);

    useEffect(() => {
      // Read Excel data once SharePoint info and Excel item ID are available
      if (
        accessToken &&
        siteId &&
        driveId &&
        formsExcelItemId &&
        excelData.length === 0
      ) {
        readExcelData();
      }
    }, [
      accessToken,
      siteId,
      driveId,
      formsExcelItemId,
      excelData.length,
      readExcelData,
    ]);

    // --- Handle Form Input Changes ---
    const handleFormChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const insertDataIntoExcel = async (e) => {
      e.preventDefault();
      if (!accessToken || !siteId || !driveId || !formsExcelItemId) {
        setStatus("SharePoint info or Excel file not loaded.");
        return;
      }

      setStatus("Preparing to insert data...");

      try {
        // 1. Get the current worksheet structure
        const worksheetUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/items/${formsExcelItemId}/workbook/worksheets('${excelWorksheetName}')`;
        const worksheetResponse = await fetch(worksheetUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        });

        if (!worksheetResponse.ok) {
          throw new Error(
            `Error getting worksheet: ${
              worksheetResponse.status
            } - ${await worksheetResponse.text()}`
          );
        }

        // 2. Get the used range to understand current data structure
        const rangeUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/items/${formsExcelItemId}/workbook/worksheets('${excelWorksheetName}')/usedRange`;
        const rangeResponse = await fetch(rangeUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        });

        if (!rangeResponse.ok) {
          throw new Error(
            `Error getting range: ${
              rangeResponse.status
            } - ${await rangeResponse.text()}`
          );
        }

        const rangeData = await rangeResponse.json();
        const currentValues = rangeData.values || [];
        // const columnCount = rangeData.columnCount || 0;
        // const rowCount = rangeData.rowCount || 0;

        // 3. Determine headers - use first row if exists, otherwise create default headers
        let headers = [];
        let dataRows = [];

        if (currentValues.length > 0) {
          // Case 1: File has data
          headers = currentValues[0];
          dataRows = currentValues.slice(1);
        } else {
          // Case 2: Empty file - initialize with headers
          headers = [
            "name",
            "phone",
            "email",
            "DOB",
            "course",
            "state",
            "city",
            "identity",
            "file_url",
            "reference",
          ];
        }

        // 4. Check for duplicates (only if we have data rows)
        if (dataRows.length > 0) {
          const phoneIndex = headers.indexOf("phone");
          const emailIndex = headers.indexOf("email");

          if (phoneIndex >= 0 && emailIndex >= 0) {
            const isDuplicate = dataRows.some(
              (row) =>
                String(row[phoneIndex]) === String(formData.phone) &&
                String(row[emailIndex]) === String(formData.email)
            );

            if (isDuplicate) {
              setStatus(
                "Error: Duplicate entry found based on phone and email."
              );
              return;
            }
          }
        }

        // 5. Prepare the new row in correct column order
        const newRow = headers.map((header) => formData[header] || "");

        // 6. Prepare the complete data to write back
        let dataToWrite;
        if (currentValues.length === 0) {
          // Empty file case - write headers + new row
          dataToWrite = [headers, newRow];
        } else {
          // Existing data case - append new row
          dataToWrite = [...currentValues, newRow];
        }

        // 7. Calculate the target range address
        // const startRow = 1; // A1
        const endRow = dataToWrite.length;
        const endCol = headers.length;
        const rangeAddress = `A1:${String.fromCharCode(64 + endCol)}${endRow}`;

        // 8. Update the range
        const updateUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/items/${formsExcelItemId}/workbook/worksheets('${excelWorksheetName}')/range(address='${rangeAddress}')`;

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
          throw new Error(
            `Error updating Excel: ${
              updateResponse.status
            } - ${await updateResponse.text()}`
          );
        }

        setStatus("Data inserted successfully!");

        // Update local state
        const newEntry = {};
        headers.forEach((header, index) => {
          newEntry[header] = newRow[index];
        });
        setExcelData((prev) => [...prev, newEntry]);

        // Clear form
        setFormData({
          name: "",
          phone: "",
          email: "",
          DOB: "",
          course: "",
          state: "",
          city: "",
          identity: "",
          file_url: "",
          reference: "",
        });
      } catch (error) {
        console.error("Excel operation failed:", error);
        setStatus(`Error: ${error.message}`);
      }
    };

    // --- File Upload Logic (from previous interaction, kept for completeness) ---
    const uploadFile = async () => {
      if (!selectedFile) {
        setStatus("Please select a file first.");
        return;
      }
      if (!accessToken || !siteId || !driveId) {
        setStatus(
          "Authentication or SharePoint info missing. Please sign in and ensure info is loaded."
        );
        return;
      }

      setStatus(`Uploading "${selectedFile.name}"...`);
      setUploadProgress(0);

      try {
        const fileName = selectedFile.name;
        const fileSize = selectedFile.size;
        const fileType = selectedFile.type || "application/octet-stream";

        let uploadUrlBase;
        if (uploadFolderPath) {
          const encodedFolderPath = uploadFolderPath
            .split("/")
            .map((segment) => encodeURIComponent(segment))
            .join("/");
          uploadUrlBase = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/root:/${encodedFolderPath}/${encodeURIComponent(
            fileName
          )}`;
        } else {
          uploadUrlBase = `https://graph.microsoft.com/v1.0/sites/${siteId}/drives/${driveId}/root:/${encodeURIComponent(
            fileName
          )}`;
        }

        if (fileSize < 4 * 1024 * 1024) {
          // 4 MB threshold for direct PUT
          const response = await fetch(`${uploadUrlBase}:/content`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": fileType,
            },
            body: selectedFile,
          });

          if (response.ok) {
            //FROM GOOGLE
            //FOR UPLOAD FILE PATH
            setStatus(
              `File "https://kiratitsolutions1.sharepoint.com/sites/projectforms/shared%20documents/uploads/files/${fileName}" uploaded successfully!`
            );
            console.log("File uploaded successfully:", await response.json());
            // Optionally update formData.file_url here if this upload is tied to the form
            // setFormData(prev => ({ ...prev, file_url: response.json().webUrl })); // Example
          } else {
            throw new Error(
              `Error uploading file (direct): ${
                response.status
              } - ${await response.text()}`
            );
          }
        } else {
          // For large files, implement resumable upload
          const createSessionUrl = `${uploadUrlBase}:/createUploadSession`;
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
            throw new Error(
              `Error creating upload session: ${
                sessionResponse.status
              } - ${await sessionResponse.text()}`
            );
          }
          const sessionData = await sessionResponse.json();
          const uploadSessionUrl = sessionData.uploadUrl;
          console.log("Upload session created:", uploadSessionUrl);

          const chunkSize = 327680; // 320KB
          let offset = 0;
          const fileReader = new FileReader();

          const uploadNextChunk = () => {
            if (offset < fileSize) {
              const end = Math.min(offset + chunkSize, fileSize);
              const chunk = selectedFile.slice(offset, end);

              fileReader.onload = async (e) => {
                const buffer = e.target.result;
                try {
                  const chunkResponse = await fetch(uploadSessionUrl, {
                    method: "PUT",
                    headers: {
                      "Content-Range": `bytes ${offset}-${end - 1}/${fileSize}`,
                      "Content-Length": chunk.size.toString(),
                    },
                    body: buffer,
                  });

                  if (chunkResponse.ok) {
                    const progress = Math.round((end / fileSize) * 100);
                    setUploadProgress(progress);
                    console.log(
                      `Uploaded chunk ${offset}-${end - 1} (Status: ${
                        chunkResponse.status
                      })`
                    );
                    offset = end;
                    uploadNextChunk();
                  } else {
                    throw new Error(
                      `Error uploading chunk: ${
                        chunkResponse.status
                      } - ${await chunkResponse.text()}`
                    );
                  }
                } catch (error) {
                  console.error("Error during chunk upload:", error);
                  setStatus(`Error during chunk upload: ${error.message}`);
                }
              };
              fileReader.readAsArrayBuffer(chunk);
            } else {
              setStatus(`File "${fileName}" uploaded successfully (chunked)!`);
              console.log("File uploaded successfully (chunked)");
              // Optionally update formData.file_url here
            }
          };
          uploadNextChunk();
        }
      } catch (error) {
        console.error("Error during file upload:", error);
        setStatus(`Error during file upload: ${error.message}`);
        setUploadProgress(0);
      }
    };

    const registrationData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      DOB,
      course,
      state,
      city,
      file,
      identity,
      consent,
    };

    console.log("Attempting to send email...");
    await sendRegisterEmail(registrationData);
    console.log("Email sent successfully");

    return {
      success: true,
      message:
        "Registration submitted successfully! We'll get back to you soon.",
    };
  } catch (error) {
    console.error("Registration submission error:", error);

    // Return a more specific error message
    let errorMessage = "Failed to submit registration. Please try again.";

    if (error.message.includes("SendGrid")) {
      errorMessage =
        "Email service is temporarily unavailable. Please try again later.";
    } else if (
      error.message.includes("network") ||
      error.message.includes("timeout")
    ) {
      errorMessage =
        "Network error. Please check your connection and try again.";
    } else if (
      error.message.includes("file") ||
      error.message.includes("attachment")
    ) {
      errorMessage =
        "File upload failed. Please try with a smaller file or try again.";
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}
