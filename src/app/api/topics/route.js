import {  NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"



// GET /api/topics - Fetch all topics
export async function GET() {
  try {
    const topics = await prisma.topic.findMany({
      orderBy: {
        name: "asc",
      },
    })

    return NextResponse.json(topics)
  } catch (error) {
    console.error("❌ Prisma error while fetching topics:", error)

    return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 })
  }
}


// POST /api/topics - Create a new topic
export async function POST(request) {
  try {
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

    // Check if topic already exists (case-insensitive)
  const existingTopic = await prisma.topic.findFirst({
  where: {
    name: trimmedName,
  },
});


    if (existingTopic) {
      return NextResponse.json({ error: "A topic with this name already exists" }, { status: 409 })
    }

    // Create the topic
    const topic = await prisma.topic.create({
      data: {
        name: trimmedName,
      },
    })

    return NextResponse.json(topic, { status: 201 })
  } catch (error) {
    console.error("Error creating topic:", error)

    // Handle Prisma unique constraint error
    if (error.code === "P2002") {
      return NextResponse.json({ error: "A topic with this name already exists" }, { status: 409 })
    }

    return NextResponse.json({ error: "Failed to create topic" }, { status: 500 })
  }
}
