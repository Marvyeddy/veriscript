import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { User } from "@/lib/models/user"
import { Doctor } from "@/lib/models/doctor"
import { Pharmacy } from "@/lib/models/pharmacy"
import { verifyAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Only admins can access this
    if (user.userType !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    await connectDB()

    const users = await User.find().select("-password").lean()

    // Get verification status for doctors and pharmacists
    const enrichedUsers = await Promise.all(
      users.map(async (u) => {
        if (u.userType === "doctor") {
          const doctor = await Doctor.findOne({ userId: u._id })
          return { ...u, verificationStatus: doctor?.verificationStatus }
        } else if (u.userType === "pharmacist") {
          const pharmacy = await Pharmacy.findOne({ userId: u._id })
          return { ...u, verificationStatus: pharmacy?.verificationStatus }
        }
        return u
      }),
    )

    return NextResponse.json(enrichedUsers)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
