import mongoose, { Schema, type Document } from "mongoose"

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId
  appointmentId: mongoose.Types.ObjectId
  amount: number
  paymentMethod: "card" | "wallet" | "upi"
  transactionId: string
  status: "pending" | "completed" | "failed"
  createdAt: Date
  updatedAt: Date
}

const paymentSchema = new Schema<IPayment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "wallet", "upi"],
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true },
)

export const Payment = mongoose.models.Payment || mongoose.model<IPayment>("Payment", paymentSchema)
