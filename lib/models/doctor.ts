import mongoose, { Schema, type Document } from "mongoose"

export interface IDoctor extends Document {
  userId: mongoose.Types.ObjectId
  specialization: string
  licenseNumber: string
  experience: number
  bio: string
  consultationFee: number
  rating: number
  totalReviews: number
  isVerified: boolean
  verificationStatus: "pending" | "verified" | "rejected"
  availability: {
    day: string
    startTime: string
    endTime: string
  }[]
  createdAt: Date
  updatedAt: Date
}

const doctorSchema = new Schema<IDoctor>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    bio: String,
    consultationFee: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    availability: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    ],
  },
  { timestamps: true },
)

export const Doctor = mongoose.models.Doctor || mongoose.model<IDoctor>("Doctor", doctorSchema)
