import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
const prisma = new PrismaClient();

// GET /api/topics/[id] - Get a single topic
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const topic = await prisma.topic.findUnique({
      where: { id },
    });

    if (!topic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json(topic);
  } catch (error) {
    console.error("Error fetching topic:", error);
    return NextResponse.json(
      { error: "Failed to fetch topic" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { name } = await request.json();

    const trimmedName = name?.trim();

    if (!trimmedName) {
      return NextResponse.json(
        { error: "Topic name is required" },
        { status: 400 }
      );
    }

    if (trimmedName.length < 2 || trimmedName.length > 50) {
      return NextResponse.json(
        { error: "Topic name must be between 2 and 50 characters long" },
        { status: 400 }
      );
    }

    const existingTopic = await prisma.topic.findUnique({ where: { id } });

    if (!existingTopic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }

    const duplicate = await prisma.topic.findFirst({
      where: {
        AND: [
          { id: { not: id } },
          {
            name: {
              equals: trimmedName.toLowerCase(),
            },
          },
        ],
      },
    });

    if (duplicate) {
      return NextResponse.json(
        { error: "A topic with this name already exists" },
        { status: 409 }
      );
    }

    const updated = await prisma.topic.update({
      where: { id },
      data: { name: trimmedName.toLowerCase() }, // Normalize to lowercase
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating topic:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/topics/[id] - Delete a topic
export async function DELETE(request, { params }) {
  try {
    // Delete the blog post (this will cascade delete related records based on your schema)
    await prisma.topic.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Topic deleted successfully" });
  } catch (error) {
    console.error("Error deleting topic:", error);
    return NextResponse.json(
      { error: "Failed to delete topic: " + error.message },
      { status: 500 }
    );
  }
}
