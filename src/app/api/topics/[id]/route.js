import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { DeleteObjectCommand } from "@aws-sdk/client-s3"
const prisma = new PrismaClient()

// GET /api/topics/[id] - Get a single topic
export async function GET(request, { params }) {
  try {
    const { id } = params

    const topic = await prisma.topic.findUnique({
      where: { id },
    })

    if (!topic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 })
    }

    return NextResponse.json(topic)
  } catch (error) {
    console.error("Error fetching topic:", error)
    return NextResponse.json({ error: "Failed to fetch topic" }, { status: 500 })
  }
}

// PUT /api/topics/[id] - Update a topic
export async function PUT(request, { params }) {
  try {
    const { id } = params
    const { name } = await request.json()

    // Validation
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Topic name is required and must be a string" }, { status: 400 })
    }

    const trimmedName = name.trim()

    if (trimmedName.length < 2) {
      return NextResponse.json({ error: "Topic name must be at least 2 characters long" }, { status: 400 })
    }

    if (trimmedName.length > 50) {
      return NextResponse.json({ error: "Topic name must be less than 50 characters" }, { status: 400 })
    }

    // Check if topic exists
    const existingTopic = await prisma.topic.findUnique({
      where: { id },
    })

    if (!existingTopic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 })
    }

    // Check if another topic with the same name exists
    const duplicateTopic = await prisma.topic.findFirst({
      where: {
        name: {
          equals: trimmedName,
          mode: "insensitive",
        },
        id: {
          not: id,
        },
      },
    })

    if (duplicateTopic) {
      return NextResponse.json({ error: "A topic with this name already exists" }, { status: 409 })
    }

    // Update the topic
    const updatedTopic = await prisma.topic.update({
      where: { id },
      data: { name: trimmedName },
    })

    return NextResponse.json(updatedTopic)
  } catch (error) {
    console.error("Error updating topic:", error)

    // Handle Prisma unique constraint error
    if (error.code === "P2002") {
      return NextResponse.json({ error: "A topic with this name already exists" }, { status: 409 })
    }

    // Handle record not found error
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 })
    }

    return NextResponse.json({ error: "Failed to update topic" }, { status: 500 })
  }
}

// DELETE /api/topics/[id] - Delete a topic
export async function DELETE(request, { params }) {
  try {
    // Get the blog post with its images to delete associated S3 objects
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
      include: {
        images: true, // Include related blog images
      },
    })

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    const bucket = process.env.AWS_S3_BUCKET_NAME

    if (!bucket) {
      console.error("AWS_S3_BUCKET_NAME environment variable is not set")
      return NextResponse.json({ error: "S3 configuration error" }, { status: 500 })
    }

    // Delete cover image from S3 if it exists
    if (blog.coverImage) {
      try {
        // Extract S3 key from URL
        const url = new URL(blog.coverImage)
        const key = url.pathname.substring(1) // Remove leading slash

        const deleteCommand = new DeleteObjectCommand({
          Bucket: bucket,
          Key: key,
        })

        await s3Client.send(deleteCommand)
        console.log(`Successfully deleted cover image: ${key}`)
      } catch (s3Error) {
        console.error("Error deleting cover image from S3:", s3Error)
        // Continue with database deletion even if S3 deletion fails
      }
    }

    // Delete all associated blog images from S3
    if (blog.images && blog.images.length > 0) {
      for (const image of blog.images) {
        try {
          const deleteCommand = new DeleteObjectCommand({
            Bucket: bucket,
            Key: image.s3Key,
          })

          await s3Client.send(deleteCommand)
          console.log(`Successfully deleted blog image: ${image.s3Key}`)
        } catch (s3Error) {
          console.error(`Error deleting blog image from S3 (${image.s3Key}):`, s3Error)
          // Continue with next image deletion
        }
      }
    }

    // Delete the blog post (this will cascade delete related records based on your schema)
    await prisma.blog.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Blog deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return NextResponse.json({ error: "Failed to delete blog: " + error.message }, { status: 500 })
  }
}
