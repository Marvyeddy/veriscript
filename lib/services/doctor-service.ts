import { connectDB } from "@/lib/db"
import { Doctor } from "@/lib/models/doctor"
import type { IDoctor } from "@/lib/models/doctor"

export async function createDoctor(doctorData: Partial<IDoctor>) {
  await connectDB()
  const doctor = new Doctor(doctorData)
  return doctor.save()
}

export async function getDoctorById(doctorId: string) {
  await connectDB()
  return Doctor.findById(doctorId).populate("userId", "fullName email avatar")
}

export async function getDoctorsBySpecialty(specialty: string) {
  await connectDB()
  return Doctor.find({ specialization: { $regex: specialty, $options: "i" } }).populate(
    "userId",
    "fullName email avatar",
  )
}

export async function updateDoctor(doctorId: string, updates: Partial<IDoctor>) {
  await connectDB()
  return Doctor.findByIdAndUpdate(doctorId, updates, { new: true }).populate("userId")
}

export async function getDoctorsByUserId(userId: string) {
  await connectDB()
  return Doctor.findOne({ userId }).populate("userId")
}
