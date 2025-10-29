import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Prescription } from "@/lib/models/prescription"
import { verifyAuth } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status")

    const query: any = { patientId: user.userId }

    const prescriptions = await Prescription.find(query)
      .populate("doctorId", "specialization")
      .populate("patientId", "fullName")
      .sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      data: prescriptions,
      count: prescriptions.length,
    })
  } catch (error) {
    console.error("Fetch prescriptions error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch prescriptions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user || user.userType !== "doctor") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const body = await request.json()
    const { patientId, appointmentId, medications, notes } = body

    if (!patientId || !appointmentId || !medications) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const newPrescription = new Prescription({
      patientId,
      doctorId: user.userId,
      appointmentId,
      medications,
      notes,
    })

    await newPrescription.save()
    await newPrescription.populate("doctorId").populate("patientId")

    return NextResponse.json(
      {
        success: true,
        data: newPrescription,
        message: "Prescription created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create prescription error:", error)
    return NextResponse.json({ success: false, error: "Failed to create prescription" }, { status: 500 })
  }
}
