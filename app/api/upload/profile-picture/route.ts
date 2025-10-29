import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { User } from "@/lib/models/user"
import { verifyAuth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    await connectDB()

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to base64 for storage
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString("base64")
    const dataUrl = `data:${file.type};base64,${base64}`

    // Update user profile picture
    await User.findByIdAndUpdate(user._id, { profilePicture: dataUrl })

    return NextResponse.json({ success: true, profilePicture: dataUrl })
  } catch (error) {
    console.error("Error uploading profile picture:", error)
    return NextResponse.json({ error: "Failed to upload profile picture" }, { status: 500 })
  }
}
