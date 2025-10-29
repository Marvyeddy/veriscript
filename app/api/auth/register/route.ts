import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { User } from "@/lib/models/user"
import { generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const { email, password, fullName, userType, location } = body

    if (!email || !password || !fullName) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ success: false, error: "User already exists" }, { status: 409 })
    }

    let parsedLocation = undefined
    if (location) {
      try {
        parsedLocation = typeof location === "string" ? JSON.parse(location) : location
      } catch {
        parsedLocation = undefined
      }
    }

    const newUser = new User({
      email,
      password,
      fullName,
      userType: userType || "patient",
      location: parsedLocation,
      isOnline: true,
      lastOnline: new Date(),
    })

    await newUser.save()

    const token = generateToken({
      userId: newUser._id.toString(),
      email: newUser.email,
      userType: newUser.userType,
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newUser._id,
          email: newUser.email,
          fullName: newUser.fullName,
          userType: newUser.userType,
          isVerified: newUser.isVerified,
        },
        token,
        message: "User registered successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, error: "Registration failed" }, { status: 500 })
  }
}
