import mongoose, { Schema, type Document } from "mongoose"

export interface IPharmacy extends Document {
  userId: mongoose.Types.ObjectId
  pharmacyName: string
  licenseNumber: string
  address: string
  location: {
    latitude: number
    longitude: number
  }
  phone: string
  operatingHours: {
    day: string
    open: string
    close: string
  }[]
  isVerified: boolean
  verificationStatus: "pending" | "verified" | "rejected"
  rating: number
  totalReviews: number
  createdAt: Date
  updatedAt: Date
}

const pharmacySchema = new Schema<IPharmacy>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pharmacyName: {
      type: String,
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    phone: {
      type: String,
      required: true,
    },
    operatingHours: [
      {
        day: String,
        open: String,
        close: String,
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

export const Pharmacy = mongoose.models.Pharmacy || mongoose.model<IPharmacy>("Pharmacy", pharmacySchema)
