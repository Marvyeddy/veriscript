import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Referral } from "@/lib/models/referral"
import { Pharmacy } from "@/lib/models/pharmacy"
import { verifyAuth } from "@/lib/auth"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await verifyAuth(request)
    if (!user || user.userType !== "pharmacist") {
      return NextResponse.json(
        { success: false, error: "Only pharmacists can update referral status" },
        { status: 401 },
      )
    }

    await connectDB()
    const { status } = await request.json()

    if (!["accepted", "rejected", "completed"].includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 })
    }

    // Verify pharmacy ownership
    const pharmacy = await Pharmacy.findOne({ userId: user.userId })
    const referral = await Referral.findById(params.id)

    if (!referral || referral.pharmacyId.toString() !== pharmacy?._id.toString()) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 })
    }

    referral.status = status
    await referral.save()
    await referral.populate("doctorId").populate("patientId")

    return NextResponse.json({
      success: true,
      data: referral,
      message: `Referral ${status} successfully`,
    })
  } catch (error) {
    console.error("Update referral status error:", error)
    return NextResponse.json({ success: false, error: "Failed to update referral status" }, { status: 500 })
  }
}
