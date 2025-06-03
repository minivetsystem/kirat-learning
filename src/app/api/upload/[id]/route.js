import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function DELETE(request, { params }) {
  try {
    const imageId = params.id

    console.log("🗑️ Deleting image with ID:", imageId)

    // Find the image in database first
    const image = await prisma.blogImage.findUnique({
      where: { id: imageId },
    })

    if (!image) {
      console.log("❌ Image not found in database:", imageId)
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    // Delete from S3 first
    try {
      const deleteCommand = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: image.s3Key,
      })

      await s3Client.send(deleteCommand)
      console.log("✅ Image deleted from S3:", image.s3Key)
    } catch (s3Error) {
      console.error("❌ Failed to delete from S3:", s3Error)
      // Continue with database deletion even if S3 fails
    }

    // Delete from database
    await prisma.blogImage.delete({
      where: { id: imageId },
    })

    console.log("✅ Image deleted from database:", imageId)

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    })
  } catch (error) {
    console.error("❌ Error deleting image:", error)
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 })
  }
}

export async function GET(request, { params }) {
  try {
    const imageId = params.id

    const image = await prisma.blogImage.findUnique({
      where: { id: imageId },
    })

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    return NextResponse.json(image)
  } catch (error) {
    console.error("❌ Error fetching image:", error)
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 })
  }
}
