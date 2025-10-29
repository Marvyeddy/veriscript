"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient, type APIError } from "@/lib/api-client"

interface PaymentInput {
  appointmentId: string | number
  amount: number
  currency?: string
  paymentMethod?: string
}

interface Payment {
  id: string
  appointmentId: string | number
  amount: number
  currency: string
  paymentMethod: string
  status: "completed" | "pending" | "failed"
  transactionHash: string
  createdAt: string
}

export function useProcessPayment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: PaymentInput) => {
      const response = await apiClient("/payments", {
        method: "POST",
        body: JSON.stringify(input),
      })
      return response.data as Payment
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
    },
    onError: (error: APIError) => {
      console.error("[v0] Payment error:", error.message)
    },
  })
}
