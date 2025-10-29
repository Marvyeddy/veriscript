import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Referral } from "@/lib/models/referral"
import { Appointment } from "@/lib/models/appointment"
import { Pharmacy } from "@/lib/models/pharmacy"
import { verifyAuth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user || user.userType !== "doctor") {
      return NextResponse.json({ success: false, error: "Only doctors can create referrals" }, { status: 401 })
    }

    await connectDB()
    const body = await request.json()
    const { pharmacyId, patientId, appointmentId, prescriptionId, diagnosis, notes, referralMessage } = body

    if (!pharmacyId || !patientId || !appointmentId || !diagnosis || !referralMessage) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Verify appointment exists and belongs to the patient
    const appointment = await Appointment.findById(appointmentId)
    if (!appointment || appointment.patientId.toString() !== patientId) {
      return NextResponse.json({ success: false, error: "Invalid appointment" }, { status: 404 })
    }

    // Verify pharmacy exists
    const pharmacy = await Pharmacy.findById(pharmacyId)
    if (!pharmacy) {
      return NextResponse.json({ success: false, error: "Pharmacy not found" }, { status: 404 })
    }

    // Create referral
    const newReferral = new Referral({
      doctorId: user.userId,
      pharmacyId,
      patientId,
      appointmentId,
      prescriptionId,
      diagnosis,
      notes,
      referralMessage,
      status: "pending",
    })

    await newReferral.save()
    await newReferral.populate("doctorId").populate("pharmacyId").populate("patientId")

    return NextResponse.json(
      {
        success: true,
        data: newReferral,
        message: "Referral sent to pharmacy successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create referral error:", error)
    return NextResponse.json({ success: false, error: "Failed to create referral" }, { status: 500 })
  }
}
