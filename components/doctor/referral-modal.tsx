"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { AlertCircle, CheckCircle } from "lucide-react"

interface ReferralModalProps {
  isOpen: boolean
  onClose: () => void
  patientId: string
  appointmentId: string
  prescriptionId?: string
  onSuccess?: () => void
}

interface Pharmacy {
  _id: string
  pharmacyName: string
  address: string
  phone: string
  distance: number
  location: {
    latitude: number
    longitude: number
  }
}

export function ReferralModal({
  isOpen,
  onClose,
  patientId,
  appointmentId,
  prescriptionId,
  onSuccess,
}: ReferralModalProps) {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [selectedPharmacy, setSelectedPharmacy] = useState<string>("")
  const [diagnosis, setDiagnosis] = useState("")
  const [referralMessage, setReferralMessage] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingPharmacies, setLoadingPharmacies] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleLoadPharmacies = async () => {
    try {
      setLoadingPharmacies(true)
      setErrorMessage("")

      // Get user location
      const position = await new Promise<GeolocationCoordinates>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve(pos.coords),
          (err) => reject(err),
        )
      })

      const response = await fetch("/api/pharmacy/nearby", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          latitude: position.latitude,
          longitude: position.longitude,
          maxDistance: 50,
        }),
      })

      if (!response.ok) throw new Error("Failed to load pharmacies")

      const data = await response.json()
      setPharmacies(data)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to load pharmacies")
    } finally {
      setLoadingPharmacies(false)
    }
  }

  const handleSendReferral = async () => {
    if (!selectedPharmacy || !diagnosis || !referralMessage) {
      setErrorMessage("Please fill in all required fields")
      return
    }

    try {
      setLoading(true)
      setErrorMessage("")

      const response = await fetch("/api/referrals/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pharmacyId: selectedPharmacy,
          patientId,
          appointmentId,
          prescriptionId,
          diagnosis,
          referralMessage,
          notes,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to send referral")
      }

      setStatus("success")
      setTimeout(() => {
        onClose()
        onSuccess?.()
        setStatus("idle")
        setDiagnosis("")
        setReferralMessage("")
        setNotes("")
        setSelectedPharmacy("")
      }, 2000)
    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Failed to send referral")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Refer Patient to Pharmacy</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Load Pharmacies Button */}
          <Button
            onClick={handleLoadPharmacies}
            disabled={loadingPharmacies}
            className="w-full flex items-center justify-center gap-2"
          >
            {loadingPharmacies && <Spinner />}
            {loadingPharmacies ? "Loading Pharmacies..." : "Load Nearby Pharmacies"}
          </Button>

          {/* Pharmacy Selection */}
          {pharmacies.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Pharmacy</label>
              <select
                value={selectedPharmacy}
                onChange={(e) => setSelectedPharmacy(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Choose a pharmacy...</option>
                {pharmacies.map((pharmacy) => (
                  <option key={pharmacy._id} value={pharmacy._id}>
                    {pharmacy.pharmacyName} - {pharmacy.distance.toFixed(1)}km away
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Diagnosis */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Diagnosis *</label>
            <Input
              placeholder="Enter patient diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>

          {/* Referral Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Message to Pharmacy *</label>
            <Textarea
              placeholder="Explain why you're referring this patient to this pharmacy..."
              value={referralMessage}
              onChange={(e) => setReferralMessage(e.target.value)}
              rows={3}
            />
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Notes</label>
            <Textarea
              placeholder="Any additional information for the pharmacy..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          {/* Status Messages */}
          {status === "success" && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
              <CheckCircle size={20} />
              <span>Referral sent successfully!</span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <span className="text-sm">{errorMessage}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              onClick={handleSendReferral}
              disabled={loading || !selectedPharmacy}
              className="flex-1 flex items-center justify-center gap-2"
            >
              {loading && <Spinner />}
              {loading ? "Sending..." : "Send Referral"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
