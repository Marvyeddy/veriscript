import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Referral } from "@/lib/models/referral"
import { verifyAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()

    // Get all referrals for this patient
    const referrals = await Referral.find({ patientId: user.userId })
      .populate("doctorId", "specialization")
      .populate("pharmacyId", "pharmacyName address phone location")
      .populate("appointmentId")
      .sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      data: referrals,
      count: referrals.length,
    })
  } catch (error) {
    console.error("Fetch patient referrals error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch referrals" }, { status: 500 })
  }
}
