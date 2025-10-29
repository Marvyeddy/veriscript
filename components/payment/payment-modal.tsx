"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useProcessPayment } from "@/hooks/use-payments"
import { Spinner } from "@/components/ui/spinner"
import { AlertCircle, CheckCircle } from "lucide-react"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  appointmentId: string | number
  amount: number
  doctorName: string
  currency?: string
}

export function PaymentModal({
  isOpen,
  onClose,
  appointmentId,
  amount,
  doctorName,
  currency = "HBAR",
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "card">("wallet")
  const [cardData, setCardData] = useState({ cardNumber: "", expiryDate: "", cvv: "" })
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const processPaymentMutation = useProcessPayment()

  const handlePayment = async () => {
    try {
      setPaymentStatus("processing")
      setErrorMessage("")

      await processPaymentMutation.mutateAsync({
        appointmentId,
        amount,
        currency,
        paymentMethod,
      })

      setPaymentStatus("success")
      setTimeout(() => {
        onClose()
        setPaymentStatus("idle")
      }, 2000)
    } catch (error) {
      setPaymentStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Payment failed. Please try again.")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Doctor:</span>
              <span className="font-semibold">{doctorName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-semibold">
                {amount} {currency}
              </span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Payment Method</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="wallet"
                  checked={paymentMethod === "wallet"}
                  onChange={(e) => setPaymentMethod(e.target.value as "wallet" | "card")}
                  className="w-4 h-4"
                />
                <span className="font-medium">Wallet</span>
              </label>
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value as "wallet" | "card")}
                  className="w-4 h-4"
                />
                <span className="font-medium">Card</span>
              </label>
            </div>
          </div>

          {/* Card Details (if card selected) */}
          {paymentMethod === "card" && (
            <div className="space-y-3">
              <Input
                placeholder="Card Number"
                value={cardData.cardNumber}
                onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                maxLength={19}
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  placeholder="MM/YY"
                  value={cardData.expiryDate}
                  onChange={(e) => setCardData({ ...cardData, expiryDate: e.target.value })}
                  maxLength={5}
                />
                <Input
                  placeholder="CVV"
                  value={cardData.cvv}
                  onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                  maxLength={3}
                  type="password"
                />
              </div>
            </div>
          )}

          {/* Status Messages */}
          {paymentStatus === "success" && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
              <CheckCircle size={20} />
              <span>Payment successful!</span>
            </div>
          )}

          {paymentStatus === "error" && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <span className="text-sm">{errorMessage}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} disabled={paymentStatus === "processing"}>
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={paymentStatus === "processing" || paymentStatus === "success"}
              className="flex-1 flex items-center justify-center gap-2"
            >
              {paymentStatus === "processing" && <Spinner />}
              {paymentStatus === "processing" ? "Processing..." : "Pay Now"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
