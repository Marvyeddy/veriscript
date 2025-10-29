import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Appointment } from "@/lib/models/appointment"
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
    if (status) {
      query.status = status
    }

    const appointments = await Appointment.find(query)
      .populate("doctorId")
      .populate("patientId", "fullName email")
      .sort({ appointmentDate: -1 })

    return NextResponse.json({
      success: true,
      data: appointments,
      count: appointments.length,
    })
  } catch (error) {
    console.error("Fetch appointments error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch appointments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const body = await request.json()
    const { doctorId, appointmentDate, timeSlot, notes, consultationFee } = body

    if (!doctorId || !appointmentDate || !timeSlot) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const newAppointment = new Appointment({
      patientId: user.userId,
      doctorId,
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      notes,
      consultationFee,
      status: "scheduled",
      paymentStatus: "pending",
    })

    await newAppointment.save()
    await newAppointment.populate("doctorId")

    return NextResponse.json(
      {
        success: true,
        data: newAppointment,
        message: "Appointment created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create appointment error:", error)
    return NextResponse.json({ success: false, error: "Failed to create appointment" }, { status: 500 })
  }
}
