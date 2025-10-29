import mongoose, { Schema, type Document } from "mongoose"

export interface IReferral extends Document {
  doctorId: mongoose.Types.ObjectId
  pharmacyId: mongoose.Types.ObjectId
  patientId: mongoose.Types.ObjectId
  appointmentId: mongoose.Types.ObjectId
  prescriptionId?: mongoose.Types.ObjectId
  diagnosis: string
  notes?: string
  status: "pending" | "accepted" | "rejected" | "completed"
  referralMessage: string
  createdAt: Date
  updatedAt: Date
}

const referralSchema = new Schema<IReferral>(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    pharmacyId: {
      type: Schema.Types.ObjectId,
      ref: "Pharmacy",
      required: true,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    prescriptionId: {
      type: Schema.Types.ObjectId,
      ref: "Prescription",
    },
    diagnosis: {
      type: String,
      required: true,
    },
    notes: String,
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
    referralMessage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export const Referral = mongoose.models.Referral || mongoose.model<IReferral>("Referral", referralSchema)
