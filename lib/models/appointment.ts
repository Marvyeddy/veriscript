import mongoose, { Schema, type Document } from "mongoose"

export interface IAppointment extends Document {
  patientId: mongoose.Types.ObjectId
  doctorId: mongoose.Types.ObjectId
  appointmentDate: Date
  timeSlot: string
  status: "scheduled" | "completed" | "cancelled"
  notes?: string
  consultationFee: number
  paymentStatus: "pending" | "completed" | "failed"
  createdAt: Date
  updatedAt: Date
}

const appointmentSchema = new Schema<IAppointment>(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    notes: String,
    consultationFee: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true },
)

export const Appointment = mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", appointmentSchema)
