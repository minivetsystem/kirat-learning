import {  NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { S3Client,  DeleteObjectCommand } from "@aws-sdk/client-s3"
import { uploadToS3 } from "@/lib/s3"
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})



export async function GET(request, { params }) {
  
  try {
    const { id } = await params
    // Convert string id to number if your Post model uses Int for id
    const postId = Number.parseInt(id)
    const blog = await prisma.blog.findUnique({
      where: { id },
    })

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const formData = await request.formData()
    const title = formData.get("title") 
    const slug = formData.get("slug") 
    const description = formData.get("description") 
    const published = formData.get("published") === "true"
    const authorEmail = formData.get("authorEmail") 
   const coverImage = formData.get("coverImage") 

    let coverImageUrl = null

    // Handle cover image upload to S3
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

    // Prepare update data
    const updateData = {
      title,
      slug,
      description,
      authorEmail,
      published,
    }

    // Only update coverImage if a new one was uploaded
    if (coverImageUrl) {
      updateData.coverImage = coverImageUrl
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(blog)
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(req, context) {
  const blogId = context.params.id
  const bucket = process.env.AWS_S3_BUCKET_NAME

  console.log("DELETE handler called for blog ID:", blogId)

  try {
    const blog = await prisma.blog.findUnique({
      where: { id: blogId },
      include: {
        images: true,
      },
    })

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    // Delete cover image if exists
    if (blog.coverImage) {
      try {
        const key = new URL(blog.coverImage).pathname.slice(1)
        await s3Client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }))
        console.log(`Deleted cover image from S3: ${key}`)
      } catch (err) {
        console.error("Failed to delete cover image:", err)
      }
    }

    // Delete associated blog images
    for (const image of blog.images) {
      try {
        await s3Client.send(new DeleteObjectCommand({ Bucket: bucket, Key: image.s3Key }))
        console.log(`Deleted blog image from S3: ${image.s3Key}`)
      } catch (err) {
        console.error(`Failed to delete image ${image.s3Key}:`, err)
      }
    }

    // Delete blog from database
    await prisma.blog.delete({ where: { id: blogId } })

    return NextResponse.json({ message: "Blog deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
