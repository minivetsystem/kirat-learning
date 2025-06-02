import {  NextResponse } from "next/server"

export async function POST(request) {
  try {
    // Since we're using JWT tokens, logout is handled client-side
    // by removing the token from storage
    return NextResponse.json({
      message: "Logout successful",
    })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
