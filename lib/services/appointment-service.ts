import { connectDB } from "@/lib/db"
import { Appointment } from "@/lib/models/appointment"
import type { IAppointment } from "@/lib/models/appointment"

export async function createAppointment(appointmentData: Partial<IAppointment>) {
  await connectDB()
  const appointment = new Appointment(appointmentData)
  return appointment.save()
}

export async function getAppointmentById(appointmentId: string) {
  await connectDB()
  return Appointment.findById(appointmentId).populate("patientId").populate("doctorId")
}

export async function getPatientAppointments(patientId: string, status?: string) {
  await connectDB()
  const query: any = { patientId }
  if (status) query.status = status
  return Appointment.find(query).populate("doctorId").sort({ appointmentDate: -1 })
}

export async function getDoctorAppointments(doctorId: string, status?: string) {
  await connectDB()
  const query: any = { doctorId }
  if (status) query.status = status
  return Appointment.find(query).populate("patientId").sort({ appointmentDate: -1 })
}

export async function updateAppointment(appointmentId: string, updates: Partial<IAppointment>) {
  await connectDB()
  return Appointment.findByIdAndUpdate(appointmentId, updates, { new: true }).populate("patientId").populate("doctorId")
}

export async function cancelAppointment(appointmentId: string) {
  await connectDB()
  return Appointment.findByIdAndUpdate(appointmentId, { status: "cancelled" }, { new: true })
}
