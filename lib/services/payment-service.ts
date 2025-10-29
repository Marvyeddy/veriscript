import { connectDB } from "@/lib/db"
import { Payment } from "@/lib/models/payment"
import type { IPayment } from "@/lib/models/payment"

export async function createPayment(paymentData: Partial<IPayment>) {
  await connectDB()
  const payment = new Payment(paymentData)
  return payment.save()
}

export async function getPaymentById(paymentId: string) {
  await connectDB()
  return Payment.findById(paymentId).populate("userId").populate("appointmentId")
}

export async function getUserPayments(userId: string) {
  await connectDB()
  return Payment.find({ userId }).populate("appointmentId").sort({ createdAt: -1 })
}

export async function getPaymentByTransactionId(transactionId: string) {
  await connectDB()
  return Payment.findOne({ transactionId })
}

export async function updatePaymentStatus(paymentId: string, status: "pending" | "completed" | "failed") {
  await connectDB()
  return Payment.findByIdAndUpdate(paymentId, { status }, { new: true })
}
