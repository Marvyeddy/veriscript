import mongoose, { Schema, type Document } from "mongoose"

export interface IPrescription extends Document {
  patientId: mongoose.Types.ObjectId
  doctorId: mongoose.Types.ObjectId
  appointmentId: mongoose.Types.ObjectId
  medications: {
    name: string
    dosage: string
    frequency: string
    duration: string
  }[]
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const prescriptionSchema = new Schema<IPrescription>(
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
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    medications: [
      {
        name: String,
        dosage: String,
        frequency: String,
        duration: String,
      },
    ],
    notes: String,
  },
  { timestamps: true },
)

export const Prescription =
  mongoose.models.Prescription || mongoose.model<IPrescription>("Prescription", prescriptionSchema)
