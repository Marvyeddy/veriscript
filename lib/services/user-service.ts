import { connectDB } from "@/lib/db"
import { User } from "@/lib/models/user"
import type { IUser } from "@/lib/models/user"

export async function getUserById(userId: string) {
  await connectDB()
  return User.findById(userId).select("-password")
}

export async function getUserByEmail(email: string) {
  await connectDB()
  return User.findOne({ email }).select("-password")
}

export async function updateUser(userId: string, updates: Partial<IUser>) {
  await connectDB()
  return User.findByIdAndUpdate(userId, updates, { new: true }).select("-password")
}

export async function deleteUser(userId: string) {
  await connectDB()
  return User.findByIdAndDelete(userId)
}
