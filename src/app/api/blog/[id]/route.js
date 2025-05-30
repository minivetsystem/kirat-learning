import {  NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request, { params }) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const formData = await request.formData();
   const title = formData.get("title");
    const slug = formData.get("slug");
    const description = formData.get("description");
    const published = formData.get("published") === "true";
    const author = formData.get("author");
    const authorEmail = formData.get("authorEmail");
    const coverImage = formData.get("coverImage") | null;


    const blog = await prisma.blog.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        description,
        published,
        author,
        authorEmail,
        coverImage
      },
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await prisma.blog.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
