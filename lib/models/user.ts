import mongoose, { Schema, type Document } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
  email: string
  password: string
  fullName: string
  userType: "patient" | "doctor" | "pharmacist" | "admin"
  phone?: string
  avatar?: string
  profilePicture?: string
  isVerified?: boolean
  verificationReason?: string
  location?: {
    latitude: number
    longitude: number
  }
  lastOnline?: Date
  isOnline?: boolean
  createdAt: Date
  updatedAt: Date
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    fullName: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ["patient", "doctor", "pharmacist", "admin"],
      default: "patient",
    },
    phone: String,
    avatar: String,
    profilePicture: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationReason: String,
    location: {
      latitude: Number,
      longitude: Number,
    },
    lastOnline: {
      type: Date,
      default: Date.now,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error as Error)
  }
})

// Method to compare passwords
userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password)
}

export const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema)
