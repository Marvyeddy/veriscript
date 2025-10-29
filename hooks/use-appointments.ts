"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient, type APIError } from "@/lib/api-client"

interface Appointment {
  id: number
  userId: string
  doctorId: string
  doctorName: string
  date: string
  time: string
  status: "confirmed" | "pending" | "cancelled"
  fee: number
  currency: string
  type: string
}

interface CreateAppointmentInput {
  doctorId: string
  date: string
  time: string
  type: string
  notes?: string
}

export function useAppointments(userId?: string, status?: string) {
  return useQuery({
    queryKey: ["appointments", { userId, status }],
    queryFn: async () => {
      const params: Record<string, string> = {}
      if (userId) params.userId = userId
      if (status) params.status = status

      const response = await apiClient("/appointments", { params })
      return response.data as Appointment[]
    },
    enabled: !!userId,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export function useCreateAppointment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: CreateAppointmentInput) => {
      const response = await apiClient("/appointments", {
        method: "POST",
        body: JSON.stringify(input),
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
    },
    onError: (error: APIError) => {
      console.error("[v0] Create appointment error:", error.message)
    },
  })
}

export function useCancelAppointment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (appointmentId: number) => {
      const response = await apiClient(`/appointments/${appointmentId}`, {
        method: "DELETE",
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] })
    },
    onError: (error: APIError) => {
      console.error("[v0] Cancel appointment error:", error.message)
    },
  })
}
