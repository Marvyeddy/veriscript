import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import { Payment } from "@/lib/models/payment"
import { Appointment } from "@/lib/models/appointment"
import { verifyAuth } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    await connectDB()
    const body = await request.json()
    const { appointmentId, amount, paymentMethod } = body

    if (!appointmentId || !amount) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const appointment = await Appointment.findById(appointmentId)
    if (!appointment || appointment.patientId.toString() !== user.userId) {
      return NextResponse.json({ success: false, error: "Appointment not found" }, { status: 404 })
    }

    const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const newPayment = new Payment({
      userId: user.userId,
      appointmentId,
      amount,
      paymentMethod: paymentMethod || "card",
      transactionId,
      status: "completed",
    })

    await newPayment.save()

    appointment.paymentStatus = "completed"
    await appointment.save()

    return NextResponse.json(
      {
        success: true,
        data: newPayment,
        message: "Payment processed successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Payment error:", error)
    return NextResponse.json({ success: false, error: "Payment processing failed" }, { status: 500 })
  }
}
