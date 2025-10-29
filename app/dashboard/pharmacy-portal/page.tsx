"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@/hooks/use-auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Package, CheckCircle, XCircle, Clock, User, FileText } from "lucide-react"
import { toast } from "sonner"

interface Referral {
  _id: string
  doctorId: {
    _id: string
    userId: {
      fullName: string
    }
    specialization: string
  }
  patientId: {
    _id: string
    fullName: string
    email: string
  }
  diagnosis: string
  referralMessage: string
  notes?: string
  status: string
  createdAt: string
  prescriptionId?: {
    medications: {
      name: string
      dosage: string
      frequency: string
      duration: string
    }[]
  }
}

export default function PharmacyPortalPage() {
  const { user } = useAuth()
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null)
  const [detailsDialog, setDetailsDialog] = useState(false)

  // Fetch pharmacy referrals
  const {
    data: referrals = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pharmacy-referrals"],
    queryFn: async () => {
      const res = await fetch("/api/referrals/pharmacy")
      if (!res.ok) throw new Error("Failed to fetch referrals")
      return res.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const handleUpdateStatus = async (referralId: string, status: "accepted" | "rejected" | "completed") => {
    try {
      const res = await fetch(`/api/referrals/${referralId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (!res.ok) throw new Error("Failed to update status")

      toast.success(`Referral ${status}`)
      refetch()
      setDetailsDialog(false)
    } catch (error) {
      toast.error("Failed to update referral status")
      console.error(error)
    }
  }

  const pendingReferrals = referrals.filter((r: Referral) => r.status === "pending")
  const acceptedReferrals = referrals.filter((r: Referral) => r.status === "accepted")
  const completedReferrals = referrals.filter((r: Referral) => r.status === "completed")

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pharmacy Portal</h1>
          <p className="text-muted-foreground">Manage referrals and prescriptions</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{referrals.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReferrals.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{acceptedReferrals.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedReferrals.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingReferrals.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">No pending referrals</p>
              </CardContent>
            </Card>
          ) : (
            pendingReferrals.map((referral: Referral) => (
              <Card key={referral._id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="font-semibold">{referral.patientId.fullName}</span>
                        <Badge>{referral.status}</Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <p className="text-muted-foreground">
                          <span className="font-medium">Doctor:</span> {referral.doctorId.userId.fullName} (
                          {referral.doctorId.specialization})
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium">Diagnosis:</span> {referral.diagnosis}
                        </p>
                        <p className="text-muted-foreground">
                          <span className="font-medium">Message:</span> {referral.referralMessage}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Received: {new Date(referral.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedReferral(referral)
                          setDetailsDialog(true)
                        }}
                      >
                        View Details
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(referral._id, "accepted")}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleUpdateStatus(referral._id, "rejected")}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          {acceptedReferrals.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">No accepted referrals</p>
              </CardContent>
            </Card>
          ) : (
            acceptedReferrals.map((referral: Referral) => (
              <Card key={referral._id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="font-semibold">{referral.patientId.fullName}</span>
                        <Badge variant="secondary">{referral.status}</Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <p className="text-muted-foreground">
                          <span className="font-medium">Diagnosis:</span> {referral.diagnosis}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleUpdateStatus(referral._id, "completed")}>
                      Mark Complete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedReferrals.length === 0 ? (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">No completed referrals</p>
              </CardContent>
            </Card>
          ) : (
            completedReferrals.map((referral: Referral) => (
              <Card key={referral._id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="font-semibold">{referral.patientId.fullName}</span>
                        <Badge variant="outline">{referral.status}</Badge>
                      </div>
                      <div className="text-sm space-y-1">
                        <p className="text-muted-foreground">
                          <span className="font-medium">Diagnosis:</span> {referral.diagnosis}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={detailsDialog} onOpenChange={setDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Referral Details</DialogTitle>
          </DialogHeader>
          {selectedReferral && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Patient Information</h3>
                <p className="text-sm">Name: {selectedReferral.patientId.fullName}</p>
                <p className="text-sm">Email: {selectedReferral.patientId.email}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Doctor Information</h3>
                <p className="text-sm">Name: {selectedReferral.doctorId.userId.fullName}</p>
                <p className="text-sm">Specialization: {selectedReferral.doctorId.specialization}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Diagnosis</h3>
                <p className="text-sm">{selectedReferral.diagnosis}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Referral Message</h3>
                <p className="text-sm">{selectedReferral.referralMessage}</p>
              </div>
              {selectedReferral.notes && (
                <div>
                  <h3 className="font-semibold mb-2">Additional Notes</h3>
                  <p className="text-sm">{selectedReferral.notes}</p>
                </div>
              )}
              {selectedReferral.prescriptionId && (
                <div>
                  <h3 className="font-semibold mb-2">Prescription</h3>
                  <div className="space-y-2">
                    {selectedReferral.prescriptionId.medications.map((med, idx) => (
                      <div key={idx} className="text-sm border-l-2 pl-3">
                        <p className="font-medium">{med.name}</p>
                        <p className="text-muted-foreground">
                          {med.dosage} - {med.frequency} for {med.duration}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
