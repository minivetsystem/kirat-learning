import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { uploadToS3 } from "@/lib/s3"
import { getAuthUser } from "@/lib/auth"
export async function GET(request) {
  try {
    // Check if user is authenticated
    const user = await getAuthUser(request)

    // Build query based on authentication status
    const whereClause = user ? {} : { published: true }

    const blogs = await prisma.blog.findMany({
      where: whereClause,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // Add metadata to response to indicate if user is authenticated
    const response = NextResponse.json({
      blogs,
      meta: {
        isAuthenticated: !!user,
        totalCount: blogs.length,
        showingPublishedOnly: !user,
      },
    })

    return response
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request) {
  try {

    // Get authenticated user
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const formData = await request.formData()
    const title = formData.get("title")
    const slug = formData.get("slug")
    const description = formData.get("description")
    const published = formData.get("published") === "true" 
    const coverImage = formData.get("coverImage") 
    const subject = formData.get("topicName")

    console.log("Form data received:", {
      title,
      slug,
      coverImage: coverImage ? `File: ${coverImage.name}` : null,
      authorId: user.id,
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
        subject,
        coverImage: coverImageUrl,
         authorId: user.id, // Add the required authorId field
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Internal server error while creating the post" }, { status: 500 })
  }
}
