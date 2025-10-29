import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { User } from "@/lib/models/user"
import { Doctor } from "@/lib/models/doctor"
import { Pharmacy } from "@/lib/models/pharmacy"
import { verifyAuth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAuth(request)

    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (admin.userType !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    await connectDB()

    const { userId, userType, isVerified } = await request.json()

    if (userType === "doctor") {
      await Doctor.findOneAndUpdate(
        { userId },
        {
          isVerified,
          verificationStatus: isVerified ? "verified" : "rejected",
        },
      )
    } else if (userType === "pharmacist") {
      await Pharmacy.findOneAndUpdate(
        { userId },
        {
          isVerified,
          verificationStatus: isVerified ? "verified" : "rejected",
        },
      )
    }

    // Update user verification status
    await User.findByIdAndUpdate(userId, { isVerified })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error verifying user:", error)
    return NextResponse.json({ error: "Failed to verify user" }, { status: 500 })
  }
}
