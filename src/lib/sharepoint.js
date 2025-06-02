import { excelService } from "./excel"



class SharePointService {
 
  constructor() {
     this.siteUrl = process.env.SP_SITE_URL
    this.username = process.env.SP_USERNAME
    this.password = process.env.SP_PASSWORD
    this.documentLibrary = process.env.SP_FILE_DOC_LIBRARY
    this.uploadFolder = process.env.SP_FILE_FOLDER
    this.excelFilePath = process.env.SP_EXCEL_FILE_PATH
    this.accessToken = null
    this.tokenExpiry = 0
  }

  async getAccessToken() {
    // Check if we have a valid token
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }

    try {
      // Get form digest for authentication
      const digestResponse = await fetch(`${this.siteUrl}/_api/contextinfo`, {
        method: "POST",
        headers: {
          Accept: "application/json;odata=verbose",
        //   "Content-Type": "application/json;odata=verbose",
          Authorization: `Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`,
        },
      })

      if (!digestResponse.ok) {
        throw new Error(`Authentication failed: ${digestResponse.statusText}`)
      }

      const digestData = await digestResponse.json()
      this.accessToken = digestData.d.GetContextWebInformation.FormDigestValue
      this.tokenExpiry = Date.now() + 30 * 60 * 1000 // 30 minutes

      return this.accessToken
    } catch (error) {
      console.error("SharePoint authentication error:", error)
      throw new Error("Failed to authenticate with SharePoint")
    }
  }

async makeAuthenticatedRequest(url, options = {}) {
    const token = await this.getAccessToken()

     const defaultHeaders = {
      Accept: "application/json;odata=verbose",
      Authorization: `Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`,
      "X-RequestDigest": token,
    }

    // Only add Content-Type if not already specified and not uploading binary data
    const headers = {
      ...defaultHeaders,
      ...options.headers,
    }
    return fetch(url, {
      ...options,
      headers,
    })
  }

 async uploadFile(file, referenceId) {
    try {
      console.log("Starting file upload process...")

      // Ensure upload folder exists first
      await this.ensureUploadFolderExists()

      const buffer = await file.arrayBuffer()

      // Generate unique filename similar to Python code
      const fileExtension = file.name.split(".").pop() || ""
      const sanitizedOriginalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
      const uniqueFileName = `${referenceId}_${sanitizedOriginalName}`

      console.log("Uploading file:", uniqueFileName)

      // Construct the upload URL - matching Python path structure
      const filesFolder = `${this.documentLibrary}/${this.uploadFolder}/files`
       const uploadUrl = `${this.siteUrl}/_api/web/GetFolderByServerRelativeUrl('${filesFolder}')/Files/add(url='${uniqueFileName}',overwrite=true)`

      console.log("Upload URL:", uploadUrl)

      const response = await this.makeAuthenticatedRequest(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: buffer,
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Upload response error:", response.status, errorText)
        throw new Error(`File upload failed: ${response.status} - ${response.statusText}`)
      }

      const result = await response.json()
  // Construct the file URL similar to Python code - use the ServerRelativeUrl from response
      const fileUrl = `${this.siteUrl}${result.d.ServerRelativeUrl}`
    
    

      console.log(`File uploaded successfully: ${fileUrl}`)
      return fileUrl
    } catch (error) {
      console.error("File upload error:", error)
      throw new Error(
        `Failed to upload file to SharePoint: ${error instanceof Error ? error.message : "Unknown error"}`,
      )
    }
  }

  async downloadExcelFile() {
    try {
      const fileUrl = `${this.siteUrl}/_api/web/GetFileByServerRelativeUrl('${this.documentLibrary}/${this.excelFilePath}')/$value`

      const response = await this.makeAuthenticatedRequest(fileUrl, {
        method: "GET",
        headers: {
          Accept: "application/octet-stream",
        },
      })

      if (response.status === 404) {
        console.log("Excel file not found, will create new one")
        return new ArrayBuffer(0)
      }

      if (!response.ok) {
        throw new Error(`Failed to download Excel file: ${response.statusText}`)
      }

      const arrayBuffer = await response.arrayBuffer()
      console.log("Excel file downloaded successfully")
      return arrayBuffer
    } catch (error) {
      console.error("Excel download error:", error)
      // Return empty buffer if file doesn't exist
      return new ArrayBuffer(0)
    }
  }

  async uploadExcelFile(buffer) {
    try {
      const uploadUrl = `${this.siteUrl}/_api/web/GetFolderByServerRelativeUrl('${this.documentLibrary}')/Files/add(url='${this.excelFilePath}',overwrite=true)`

      const response = await this.makeAuthenticatedRequest(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: buffer,
      })

      if (!response.ok) {
        throw new Error(`Failed to upload Excel file: ${response.statusText}`)
      }

      console.log("Excel file uploaded successfully")
    } catch (error) {
      console.error("Excel upload error:", error)
      throw new Error("Failed to upload Excel file to SharePoint")
    }
  }

  async checkDuplicate(email, phone) {
    try {
      const excelBuffer = await this.downloadExcelFile()

      // If file doesn't exist (empty buffer), no duplicates
      if (excelBuffer.byteLength === 0) {
        return false
      }

      const isDuplicate = await excelService.checkDuplicateInExcel(excelBuffer, email, phone)
      return isDuplicate
    } catch (error) {
      console.error("Duplicate check error:", error)
      // If we can't check, assume no duplicate to allow registration
      return false
    }
  }

   async ensureUploadFolderExists() {
    try {
      console.log("Ensuring upload folder structure exists...")

      // First ensure the main uploads folder exists
      const uploadsFolder = `${this.documentLibrary}/${this.uploadFolder}`
      await this.createFolderIfNotExists(uploadsFolder)

      // Then ensure the files subfolder exists
      const filesFolder = `${this.documentLibrary}/${this.uploadFolder}/files`
      await this.createFolderIfNotExists(filesFolder)

      console.log("Upload folder structure verified")
    } catch (error) {
      console.error("Error ensuring upload folder exists:", error)
      // Don't throw error, folder might already exist
    }
  }


   async createFolderIfNotExists(folderPath) {
    try {
      // Check if folder exists
      const checkUrl = `${this.siteUrl}/_api/web/GetFolderByServerRelativeUrl('${folderPath}')`
      const checkResponse = await this.makeAuthenticatedRequest(checkUrl, { method: "GET" })

      if (checkResponse.status === 404) {
        // Create folder if it doesn't exist
        const createUrl = `${this.siteUrl}/_api/web/folders`
        const createResponse = await this.makeAuthenticatedRequest(createUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;odata=verbose",
          },
          body: JSON.stringify({
            __metadata: { type: "SP.Folder" },
            ServerRelativeUrl: folderPath,
          }),
        })

        if (!createResponse.ok) {
          const errorText = await createResponse.text()
          console.error("Failed to create folder:", createResponse.status, errorText)
          throw new Error(`Failed to create folder: ${createResponse.statusText}`)
        }

        console.log(`Folder created successfully: ${folderPath}`)
      } else if (checkResponse.ok) {
        console.log(`Folder already exists: ${folderPath}`)
      } else {
        throw new Error(`Failed to check folder: ${checkResponse.statusText}`)
      }
    } catch (error) {
      console.error(`Error with folder ${folderPath}:`, error)
      throw error
    }
  }

  // Test method to verify connection
  async testConnection() {
    try {
      await this.getAccessToken()
      await this.ensureUploadFolderExists()
      return { success: true, message: "SharePoint connection successful" }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : "Connection test failed",
      }
    }
  }
}

export const sharePointService = new SharePointService()
