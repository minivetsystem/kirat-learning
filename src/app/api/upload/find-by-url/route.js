import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    console.log("🔍 Looking for image with URL:", url)

    // Find the image by URL in the database
    const image = await prisma.blogImage.findFirst({
      where: {
        url: url,
      },
    })

    if (!image) {
      console.log("❌ Image not found for URL:", url)
      return NextResponse.json({ error: "Image not found" }, { status: 404 })
    }

    console.log("✅ Found image:", image.id)

    return NextResponse.json({
      id: image.id,
      url: image.url,
      filename: image.filename,
      size: image.size,
      mimeType: image.mimeType,
      createdAt: image.createdAt,
    })
  } catch (error) {
    console.error("❌ Error finding image by URL:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
