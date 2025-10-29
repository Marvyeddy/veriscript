"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { AlertCircle, MapPin } from "lucide-react"

interface Referral {
  _id: string
  doctorId: {
    specialization: string
  }
  pharmacyId: {
    pharmacyName: string
    address: string
    phone: string
    location: {
      latitude: number
      longitude: number
    }
  }
  diagnosis: string
  status: "pending" | "accepted" | "rejected" | "completed"
  createdAt: string
}

export function ReferralStatus() {
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchReferrals()
  }, [])

  const fetchReferrals = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/referrals/patient")
      if (!response.ok) throw new Error("Failed to fetch referrals")

      const data = await response.json()
      setReferrals(data.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load referrals")
    } finally {
      setLoading(false)
    }
  }

  const openGoogleMaps = (latitude: number, longitude: number, pharmacyName: string) => {
    const url = `https://www.google.com/maps/search/${encodeURIComponent(pharmacyName)}/@${latitude},${longitude},15z`
    window.open(url, "_blank")
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
          <p>No pharmacy referrals yet</p>
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
                <CardTitle className="text-lg">{referral.pharmacyId.pharmacyName}</CardTitle>
                <CardDescription>
                  Referred by Dr. {referral.doctorId.specialization} •{" "}
                  {new Date(referral.createdAt).toLocaleDateString()}
                </CardDescription>
              </div>
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
                {referral.status === "pending"
                  ? "Awaiting Confirmation"
                  : referral.status === "accepted"
                    ? "Confirmed"
                    : referral.status === "rejected"
                      ? "Rejected"
                      : "Completed"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Diagnosis */}
            <div>
              <p className="text-sm font-medium mb-1">Your Diagnosis</p>
              <p className="text-sm text-gray-700">{referral.diagnosis}</p>
            </div>

            {/* Pharmacy Info */}
            <div className="bg-gray-50 p-3 rounded-lg space-y-2">
              <p className="text-sm">
                <span className="font-medium">Address:</span> {referral.pharmacyId.address}
              </p>
              <p className="text-sm">
                <span className="font-medium">Phone:</span> {referral.pharmacyId.phone}
              </p>
            </div>

            {/* Status Message */}
            {referral.status === "pending" && (
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm text-yellow-700">
                The pharmacy is reviewing your referral. You'll be notified once they confirm.
              </div>
            )}

            {referral.status === "accepted" && (
              <div className="bg-green-50 border border-green-200 p-3 rounded-lg text-sm text-green-700">
                The pharmacy has confirmed your referral. You can now visit them with your prescription.
              </div>
            )}

            {referral.status === "rejected" && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg text-sm text-red-700">
                The pharmacy has declined this referral. Please contact them or ask your doctor for an alternative.
              </div>
            )}

            {/* Google Maps Button */}
            {referral.status === "accepted" && (
              <button
                onClick={() =>
                  openGoogleMaps(
                    referral.pharmacyId.location.latitude,
                    referral.pharmacyId.location.longitude,
                    referral.pharmacyId.pharmacyName,
                  )
                }
                className="w-full flex items-center justify-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <MapPin size={16} />
                View on Google Maps
              </button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
