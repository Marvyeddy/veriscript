"use client"

import type React from "react"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, FileText, Send } from "lucide-react"
import { toast } from "sonner"

interface Appointment {
  _id: string
  patientId: {
    _id: string
    fullName: string
    email: string
  }
  appointmentDate: string
  timeSlot: string
  status: string
  consultationFee: number
  notes?: string
}

export default function DoctorPortalPage() {
  const { user } = useAuth()
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [prescriptionDialog, setPrescriptionDialog] = useState(false)
  const [referralDialog, setReferralDialog] = useState(false)

  // Fetch doctor's appointments
  const {
    data: appointments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctor-appointments"],
    queryFn: async () => {
      const res = await fetch("/api/appointments?role=doctor")
      if (!res.ok) throw new Error("Failed to fetch appointments")
      return res.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  // Fetch nearby pharmacies for referrals
  const { data: pharmacies = [] } = useQuery({
    queryKey: ["nearby-pharmacies"],
    queryFn: async () => {
      const res = await fetch("/api/pharmacy/nearby")
      if (!res.ok) throw new Error("Failed to fetch pharmacies")
      return res.json()
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  })

  const handleCreatePrescription = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const medications = []
    let i = 0
    while (formData.get(`medication-${i}`)) {
      medications.push({
        name: formData.get(`medication-${i}`) as string,
        dosage: formData.get(`dosage-${i}`) as string,
        frequency: formData.get(`frequency-${i}`) as string,
        duration: formData.get(`duration-${i}`) as string,
      })
      i++
    }

    try {
      const res = await fetch("/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: selectedAppointment?._id,
          patientId: selectedAppointment?.patientId._id,
          medications,
          notes: formData.get("notes"),
        }),
      })

      if (!res.ok) throw new Error("Failed to create prescription")

      toast.success("Prescription created successfully")
      setPrescriptionDialog(false)
      refetch()
    } catch (error) {
      toast.error("Failed to create prescription")
      console.error(error)
    }
  }

  const handleSendReferral = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      const res = await fetch("/api/referrals/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: selectedAppointment?._id,
          patientId: selectedAppointment?.patientId._id,
          pharmacyId: formData.get("pharmacyId"),
          diagnosis: formData.get("diagnosis"),
          referralMessage: formData.get("referralMessage"),
          notes: formData.get("notes"),
        }),
      })

      if (!res.ok) throw new Error("Failed to send referral")

      toast.success("Referral sent to pharmacy")
      setReferralDialog(false)
      refetch()
    } catch (error) {
      toast.error("Failed to send referral")
      console.error(error)
    }
  }

  const scheduledAppointments = appointments.filter((a: Appointment) => a.status === "scheduled")
  const completedAppointments = appointments.filter((a: Appointment) => a.status === "completed")

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Doctor Portal</h1>
          <p className="text-muted-foreground">Manage your appointments and patients</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledAppointments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedAppointments.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="scheduled" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="scheduled" className="space-y-4">
          {scheduledAppointments.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">No scheduled appointments</p>
              </CardContent>
            </Card>
          ) : (
            scheduledAppointments.map((appointment: Appointment) => (
              <Card key={appointment._id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="font-semibold">{appointment.patientId.fullName}</span>
                        <Badge>{appointment.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(appointment.appointmentDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {appointment.timeSlot}
                        </div>
                      </div>
                      {appointment.notes && <p className="text-sm text-muted-foreground">{appointment.notes}</p>}
                    </div>
                    <div className="flex gap-2">
                      <Dialog open={prescriptionDialog} onOpenChange={setPrescriptionDialog}>
                        <DialogTrigger asChild>
                          <Button size="sm" onClick={() => setSelectedAppointment(appointment)}>
                            <FileText className="h-4 w-4 mr-2" />
                            Prescribe
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Create Prescription</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleCreatePrescription} className="space-y-4">
                            <div className="space-y-4">
                              <div className="grid grid-cols-4 gap-2">
                                <Label className="col-span-4">Medication 1</Label>
                                <Input name="medication-0" placeholder="Name" required />
                                <Input name="dosage-0" placeholder="Dosage" required />
                                <Input name="frequency-0" placeholder="Frequency" required />
                                <Input name="duration-0" placeholder="Duration" required />
                              </div>
                              <div className="space-y-2">
                                <Label>Notes</Label>
                                <Textarea name="notes" placeholder="Additional notes..." />
                              </div>
                            </div>
                            <Button type="submit" className="w-full">
                              Create Prescription
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={referralDialog} onOpenChange={setReferralDialog}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" onClick={() => setSelectedAppointment(appointment)}>
                            <Send className="h-4 w-4 mr-2" />
                            Refer
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Send Referral to Pharmacy</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleSendReferral} className="space-y-4">
                            <div className="space-y-2">
                              <Label>Select Pharmacy</Label>
                              <Select name="pharmacyId" required>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose pharmacy" />
                                </SelectTrigger>
                                <SelectContent>
                                  {pharmacies.map((pharmacy: any) => (
                                    <SelectItem key={pharmacy._id} value={pharmacy._id}>
                                      {pharmacy.pharmacyName} - {pharmacy.distance}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Diagnosis</Label>
                              <Input name="diagnosis" placeholder="Patient diagnosis" required />
                            </div>
                            <div className="space-y-2">
                              <Label>Referral Message</Label>
                              <Textarea name="referralMessage" placeholder="Message to pharmacy..." required />
                            </div>
                            <div className="space-y-2">
                              <Label>Additional Notes</Label>
                              <Textarea name="notes" placeholder="Optional notes..." />
                            </div>
                            <Button type="submit" className="w-full">
                              Send Referral
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedAppointments.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">No completed appointments</p>
              </CardContent>
            </Card>
          ) : (
            completedAppointments.map((appointment: Appointment) => (
              <Card key={appointment._id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="font-semibold">{appointment.patientId.fullName}</span>
                        <Badge variant="secondary">{appointment.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(appointment.appointmentDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {appointment.timeSlot}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
