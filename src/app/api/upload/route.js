import {  NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function POST(request) {
  try {
    console.log("Upload request received")
    const formData = await request.formData()

    // JoditEditor sends files with different field names, let's check all possible names
    let file = formData.get("file") | null

    if (!file) {
      // Try alternative field names that JoditEditor might use
      file = formData.get("files[]") | null
    }

    if (!file) {
      file = formData.get("files") | null
    }

    if (!file) {
      file = formData.get("upload") | null
    }

    if (!file) {
      // Debug: Log all form data keys to see what JoditEditor is sending
      console.log("Available form data keys:", Array.from(formData.keys()))

      // Try to get the first file from any field
      for (const [key, value] of formData.entries()) {
        // Check if value has file-like properties instead of instanceof File
        if (value && typeof value === "object" && "name" in value && "size" in value && "type" in value) {
          file = value
          console.log(`Found file in field: ${key}`)
          break
        }
      }
    }

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 })
    }

    // Validate file size (max 10MB for S3)
    if (file.size > 10 * 1024 * 1024) {
        console.log(`Invalid file type: ${file.type}`)
      return NextResponse.json({ error: "File size must be less than 10MB" }, { status: 400 })
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Clean filename and generate unique key
    const timestamp = Date.now()
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-")
    const s3Key = `blog-images/${timestamp}-${cleanFileName}`
// Upload to S3
    const bucketName = process.env.AWS_S3_BUCKET_NAME

     const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read",
    })
    
await s3Client.send(command)
 // Generate S3 URL
    const s3Url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`
    // Save file info to database (without blogId)
    const image = await prisma.blogImage.create({
        data: {
          url: s3Url,
          s3Key,
          filename: cleanFileName,
          size: file.size,
          mimeType: file.type,
        },
      })

    return NextResponse.json({
      success: true,
      file: {
        url: s3Url,
        id: image.id,
      },
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
