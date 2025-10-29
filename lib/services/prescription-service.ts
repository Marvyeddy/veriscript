import { connectDB } from "@/lib/db"
import { Prescription } from "@/lib/models/prescription"
import type { IPrescription } from "@/lib/models/prescription"

export async function createPrescription(prescriptionData: Partial<IPrescription>) {
  await connectDB()
  const prescription = new Prescription(prescriptionData)
  return prescription.save()
}

export async function getPrescriptionById(prescriptionId: string) {
  await connectDB()
  return Prescription.findById(prescriptionId).populate("patientId").populate("doctorId")
}

export async function getPatientPrescriptions(patientId: string) {
  await connectDB()
  return Prescription.find({ patientId }).populate("doctorId").sort({ createdAt: -1 })
}

export async function getDoctorPrescriptions(doctorId: string) {
  await connectDB()
  return Prescription.find({ doctorId }).populate("patientId").sort({ createdAt: -1 })
}

export async function updatePrescription(prescriptionId: string, updates: Partial<IPrescription>) {
  await connectDB()
  return Prescription.findByIdAndUpdate(prescriptionId, updates, { new: true })
    .populate("patientId")
    .populate("doctorId")
}
