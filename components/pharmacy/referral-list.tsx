"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react"

interface Referral {
  _id: string
  doctorId: {
    specialization: string
  }
  patientId: {
    fullName: string
    email: string
    phone: string
  }
  diagnosis: string
  referralMessage: string
  notes?: string
  status: "pending" | "accepted" | "rejected" | "completed"
  createdAt: string
}

export function ReferralList() {
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    fetchReferrals()
  }, [])

  const fetchReferrals = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/referrals/pharmacy")
      if (!response.ok) throw new Error("Failed to fetch referrals")

      const data = await response.json()
      setReferrals(data.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load referrals")
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (referralId: string, newStatus: "accepted" | "rejected" | "completed") => {
    try {
      setUpdatingId(referralId)

      const response = await fetch(`/api/referrals/${referralId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error("Failed to update status")

      // Update local state
      setReferrals((prev) => prev.map((ref) => (ref._id === referralId ? { ...ref, status: newStatus } : ref)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status")
    } finally {
      setUpdatingId(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "accepted":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-blue-500" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        <AlertCircle className="flex-shrink-0 mt-0.5" />
        <span>{error}</span>
      </div>
    )
  }

  if (referrals.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-gray-500">
          <p>No referrals received yet</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {referrals.map((referral) => (
        <Card key={referral._id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{referral.patientId.fullName}</CardTitle>
                <CardDescription>
                  Referred by Dr. {referral.doctorId.specialization} •{" "}
                  {new Date(referral.createdAt).toLocaleDateString()}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(referral.status)}
                <Badge
                  variant={
                    referral.status === "pending"
                      ? "outline"
                      : referral.status === "accepted"
                        ? "default"
                        : referral.status === "rejected"
                          ? "destructive"
                          : "secondary"
                  }
                >
                  {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Patient Info */}
            <div className="bg-gray-50 p-3 rounded-lg space-y-2">
              <p className="text-sm">
                <span className="font-medium">Email:</span> {referral.patientId.email}
              </p>
              <p className="text-sm">
                <span className="font-medium">Phone:</span> {referral.patientId.phone}
              </p>
            </div>

            {/* Diagnosis */}
            <div>
              <p className="text-sm font-medium mb-1">Diagnosis</p>
              <p className="text-sm text-gray-700">{referral.diagnosis}</p>
            </div>

            {/* Message */}
            <div>
              <p className="text-sm font-medium mb-1">Doctor's Message</p>
              <p className="text-sm text-gray-700">{referral.referralMessage}</p>
            </div>

            {/* Notes */}
            {referral.notes && (
              <div>
                <p className="text-sm font-medium mb-1">Additional Notes</p>
                <p className="text-sm text-gray-700">{referral.notes}</p>
              </div>
            )}

            {/* Action Buttons */}
            {referral.status === "pending" && (
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => handleStatusUpdate(referral._id, "rejected")}
                  disabled={updatingId === referral._id}
                  className="flex-1"
                >
                  {updatingId === referral._id ? <Spinner /> : "Reject"}
                </Button>
                <Button
                  onClick={() => handleStatusUpdate(referral._id, "accepted")}
                  disabled={updatingId === referral._id}
                  className="flex-1"
                >
                  {updatingId === referral._id ? <Spinner /> : "Accept"}
                </Button>
              </div>
            )}

            {referral.status === "accepted" && (
              <Button
                onClick={() => handleStatusUpdate(referral._id, "completed")}
                disabled={updatingId === referral._id}
                className="w-full"
              >
                {updatingId === referral._id ? <Spinner /> : "Mark as Completed"}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
