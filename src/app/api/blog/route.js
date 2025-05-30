import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { uploadToS3 } from "@/lib/s3"

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return NextResponse.json(blogs)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData()
    const title = formData.get("title")
    const slug = formData.get("slug")
    const description = formData.get("description")
    const published = formData.get("published") === "true"
    const author = formData.get("author")
    const authorEmail = formData.get("authorEmail")
    const coverImage = formData.get("coverImage") // Fixed: Removed the | null

    console.log("Form data received:", {
      title,
      slug,
      coverImage: coverImage ? `File: ${coverImage.name}` : null,
    })

    if (!title || !slug || !description) {
      return NextResponse.json({ error: "Missing required fields: title, slug, or description" }, { status: 400 })
    }

    // Check for existing slug
    const existingPost = await prisma.blog.findUnique({
      where: { slug },
    })

    if (existingPost) {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 })
    }

    let coverImageUrl = null

    if (coverImage && coverImage.size > 0) {
      console.log("Processing cover image:", coverImage.name, coverImage.type, coverImage.size)

      const buffer = Buffer.from(await coverImage.arrayBuffer())
      const fileName = `cover-images/${Date.now()}-${coverImage.name.replace(/\s+/g, "-")}`
      const mimeType = coverImage.type || "image/jpeg"

      try {
        coverImageUrl = await uploadToS3(buffer, fileName, mimeType)
        console.log("Image uploaded successfully to S3:", coverImageUrl)
      } catch (uploadError) {
        console.error("S3 Upload Failed:", uploadError)
        return NextResponse.json({ error: "Image upload failed. Please try again." }, { status: 500 })
      }
    } else {
      console.log("No cover image provided or image is empty")
    }

    const newPost = await prisma.blog.create({
      data: {
        title,
        slug,
        description,
        published,
        authorEmail,
        author,
        coverImage: coverImageUrl,
      },
    })

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Internal server error while creating the post" }, { status: 500 })
  }
}
