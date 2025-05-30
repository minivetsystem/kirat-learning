import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req, { params }) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug: params.slug },
    })

    if (!blog) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error("Error fetching post:", error)
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}
