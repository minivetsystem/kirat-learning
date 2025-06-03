// src/app/api/registration/route.js
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import ExcelJS from "exceljs"
import * as spauth from "node-sp-auth"
import https from "https"

const SP_SITE_URL = process.env.SP_SITE_URL
const SP_USERNAME = "tech@kiratitsolutions.com"
const SP_PASSWORD = "PwGu45b38$pu"
const EXCEL_FILE_PATH = process.env.SP_EXCEL_FILE_PATH || "/Shared%20Documents/uplodes/Forms.xlsx"
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
})

const normalizePhone = (phone) => phone?.replace(/\D/g, "") || ""

async function uploadFileToS3(file, fileName) {
  const fileExtension = fileName.split(".").pop()
  const uniqueFileName = `uploads/${uuidv4()}.${fileExtension}`
  const buffer = Buffer.from(await file.arrayBuffer())

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME || "",
      Key: uniqueFileName,
      Body: buffer,
      ContentType: file.type,
    })
  )

  const getCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME || "",
    Key: uniqueFileName,
  })

  return await getSignedUrl(s3Client, getCommand, { expiresIn: 604800 })
}

async function getSharePointAuthHeaders() {
  try {
    const { headers } = await spauth.getAuth(SP_SITE_URL, {
      username: SP_USERNAME,
      password: SP_PASSWORD,
      online: true,
    })
    return headers
  } catch (error) {
    throw new Error(`SharePoint authentication failed: ${error.message}`)
  }
}

async function fetchWithSSLIgnore(url, options = {}) {
  return fetch(url, { ...options, agent: new https.Agent({ rejectUnauthorized: false }) })
}

function encodeSharePointPath(path) {
  return encodeURIComponent(path).replace(/%2F/g, "/");
}



async function addToSharePointExcel(rowData) {
    const headers = await getSharePointAuthHeaders();
  const encodedPath = encodeSharePointPath(EXCEL_FILE_PATH);
const fileUrl = `${SP_SITE_URL}/_api/web/GetFileByServerRelativeUrl('${encodedPath}')/$value`;

console.log("URL:", fileUrl);

  const fileResponse = await fetchWithSSLIgnore(fileUrl, { headers });

  if (!fileResponse.ok)
    throw new Error(`Failed to download Excel: ${fileResponse.status} ${fileResponse.statusText}`);

  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(await fileResponse.arrayBuffer())
  const worksheet = workbook.getWorksheet(1)
  if (!worksheet) throw new Error("Worksheet not found")

  const firstRow = worksheet.getRow(1)
  if (!firstRow.getCell(1).value?.toString().toLowerCase().includes("name")) {
    worksheet.addRow([
      "name", "phone", "email", "DOB", "course", "state", "city", "identity", "file_url", "reference",
    ])
  }
  worksheet.addRow(rowData)
  const updatedBuffer = await workbook.xlsx.writeBuffer()

  const uploadUrl = `${SP_SITE_URL}/_api/web/GetFileByServerRelativeUrl('${EXCEL_FILE_PATH}')/SaveBinaryStream`
  const uploadResponse = await fetchWithSSLIgnore(uploadUrl, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/octet-stream" },
    body: updatedBuffer,
  })

  if (!uploadResponse.ok)
    throw new Error(`Failed to upload Excel: ${uploadResponse.status} ${uploadResponse.statusText}`)
}

async function checkForDuplicates(email, phone) {
  const headers = await getSharePointAuthHeaders()
  const fileUrl = `${SP_SITE_URL}/_api/web/GetFileByServerRelativeUrl('${EXCEL_FILE_PATH}')/$value`
  const fileResponse = await fetchWithSSLIgnore(fileUrl, { headers })

  if (!fileResponse.ok) return { duplicates: false, errors: {} }

  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(await fileResponse.arrayBuffer())
  const worksheet = workbook.getWorksheet(1)
  if (!worksheet) return { duplicates: false, errors: {} }

  const errors = {}
  const inputEmail = email.trim().toLowerCase()
  const inputPhone = normalizePhone(phone)

  for (let i = 2; i <= worksheet.rowCount; i++) {
    const row = worksheet.getRow(i)
    const rowEmail = row.getCell(3).value?.toString().trim().toLowerCase()
    const rowPhone = normalizePhone(row.getCell(2).value?.toString())

    if (rowEmail === inputEmail) errors.email = "This email is already registered."
    if (rowPhone === inputPhone) errors.phone = "This phone number is already registered."
  }

  return { duplicates: Object.keys(errors).length > 0, errors }
}

export async function POST(request) {
  try {
    if (!SP_SITE_URL || !SP_USERNAME || !SP_PASSWORD)
      throw new Error("Missing SharePoint configuration")

    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_S3_BUCKET_NAME)
      throw new Error("Missing AWS S3 configuration")

    const formData = await request.formData()
    const name = formData.get("name") || ""
    const phone = formData.get("phone") || ""
    const email = formData.get("email") || ""
    const dob = formData.get("DOB") || ""
    const course = formData.get("course") || ""
    const state = formData.get("state") || ""
    const city = formData.get("city") || ""
    const identity = formData.get("identity") || ""
    const file = formData.get("file")

    const { duplicates, errors } = await checkForDuplicates(email, phone)
    if (duplicates)
      return NextResponse.json({ message: "Duplicate detected", errors }, { status: 400 })

    let fileUrl = ""
    if (file) {
      try {
        fileUrl = await uploadFileToS3(file, file.name)
      } catch (err) {
        console.error("File upload failed:", err.message)
        fileUrl = `File upload failed: ${file.name}`
      }
    }

    const refId = uuidv4()
    const rowData = [name.trim(), phone.trim(), email.trim(), dob, course, state, city, identity, fileUrl, refId]
    await addToSharePointExcel(rowData)

    return NextResponse.json({
      message: "Registration successful!",
      referenceId: refId,
      fileUrl: fileUrl || null,
    }, { status: 200 })
  } catch (err) {
    console.error("Error processing registration:", err)
    return NextResponse.json({ message: "Server error", error: err.message }, { status: 500 })
  }
}
