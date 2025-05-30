import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { deleteFromS3 } from "@/lib/s3"

export async function DELETE({ params }) {
  try {
    const image = await prisma.blogImage.findUnique({
      where: { id: params.imageId },
    })

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    // Delete from S3
    await deleteFromS3(image.url)

    // Delete from database
    await prisma.blogImage.delete({
      where: { id: params.imageId },
    })

    return NextResponse.json({ message: "Image deleted successfully" })
  } catch (error) {
    console.error("Error deleting image:", error)
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 })
  }
}
