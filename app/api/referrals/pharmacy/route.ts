import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Referral } from "@/lib/models/referral"
import { Pharmacy } from "@/lib/models/pharmacy"
import { verifyAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user || user.userType !== "pharmacist") {
      return NextResponse.json({ success: false, error: "Only pharmacists can view referrals" }, { status: 401 })
    }

    await connectDB()

    // Get pharmacy for this user
    const pharmacy = await Pharmacy.findOne({ userId: user.userId })
    if (!pharmacy) {
      return NextResponse.json({ success: false, error: "Pharmacy not found" }, { status: 404 })
    }

    // Get all referrals for this pharmacy
    const referrals = await Referral.find({ pharmacyId: pharmacy._id })
      .populate("doctorId", "specialization")
      .populate("patientId", "fullName email phone")
      .populate("appointmentId")
      .populate("prescriptionId")
      .sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      data: referrals,
      count: referrals.length,
    })
  } catch (error) {
    console.error("Fetch pharmacy referrals error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch referrals" }, { status: 500 })
  }
}
