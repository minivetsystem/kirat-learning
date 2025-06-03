import {  NextResponse } from "next/server"
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"

export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function DELETE(request) {
  try {
    const { imageUrl } = await request.json()

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 })
    }

    // Check if it's an S3 URL
    if (!imageUrl.includes("s3.") && !imageUrl.includes("amazonaws.com")) {
      return NextResponse.json({ error: "Not an S3 URL" }, { status: 400 })
    }

    // Extract S3 key from URL
    const url = new URL(imageUrl)
    const key = url.pathname.substring(1) // Remove leading slash
const bucket = process.env.AWS_S3_BUCKET_NAME
    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    })

    await s3.send(deleteCommand)

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
      deletedKey: key,
    })
  } catch (error) {
    console.error("Error deleting image from S3:", error)
    return NextResponse.json(
      {
        error: "Failed to delete image",
        details: error.message,
      },
      { status: 500 },
    )
  }
}
