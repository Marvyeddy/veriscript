"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useCreateAppointment } from "@/hooks/use-appointments"
import { PaymentModal } from "./payment-modal"
import { Spinner } from "@/components/ui/spinner"
import { AlertCircle, CheckCircle } from "lucide-react"

interface AppointmentBookingProps {
  doctorId: string
  doctorName: string
  fee: number
  currency: string
  availableSlots: Array<{ date: string; time: string }>
}

export function AppointmentBooking({ doctorId, doctorName, fee, currency, availableSlots }: AppointmentBookingProps) {
  const [selectedSlot, setSelectedSlot] = useState<{ date: string; time: string } | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [appointmentId, setAppointmentId] = useState<string | number | null>(null)
  const [bookingStatus, setBookingStatus] = useState<"idle" | "booking" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const createAppointmentMutation = useCreateAppointment()

  const handleBookAppointment = async () => {
    if (!selectedSlot) return

    try {
      setBookingStatus("booking")
      setErrorMessage("")

      const result = await createAppointmentMutation.mutateAsync({
        doctorId,
        date: selectedSlot.date,
        time: selectedSlot.time,
        type: "consultation",
      })

      setAppointmentId(result.id)
      setBookingStatus("success")
      setShowPaymentModal(true)
    } catch (error) {
      setBookingStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Failed to book appointment")
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Book Appointment</CardTitle>
          <CardDescription>Select a time slot and complete payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Available Slots */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Available Time Slots</label>
            <div className="grid grid-cols-2 gap-2">
              {availableSlots.map((slot, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    selectedSlot?.date === slot.date && selectedSlot?.time === slot.time
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-sm font-medium">{slot.date}</div>
                  <div className="text-xs text-gray-600">{slot.time}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Fee Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Consultation Fee:</span>
              <span className="font-semibold">
                {fee} {currency}
              </span>
            </div>
          </div>

          {/* Status Messages */}
          {bookingStatus === "success" && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
              <CheckCircle size={20} />
              <span>Appointment booked! Proceed to payment.</span>
            </div>
          )}

          {bookingStatus === "error" && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <span className="text-sm">{errorMessage}</span>
            </div>
          )}

          {/* Action Button */}
          <Button
            onClick={handleBookAppointment}
            disabled={!selectedSlot || bookingStatus === "booking"}
            className="w-full flex items-center justify-center gap-2"
          >
            {bookingStatus === "booking" && <Spinner />}
            {bookingStatus === "booking" ? "Booking..." : "Book & Pay"}
          </Button>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      {appointmentId && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          appointmentId={appointmentId}
          amount={fee}
          doctorName={doctorName}
          currency={currency}
        />
      )}
    </>
  )
}
