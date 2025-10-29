import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { User } from "@/lib/models/user"
import { generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password required" }, { status: 400 })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
    }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
    }

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      userType: user.userType,
    })

    return NextResponse.json({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
      },
      token,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 })
  }
}
