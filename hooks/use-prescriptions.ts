"use client"

import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"

interface Medication {
  name: string
  dosage: string
  frequency: string
  duration: string
}

interface Prescription {
  id: number
  userId: string
  doctorId: string
  doctorName: string
  medications: Medication[]
  date: string
  status: "active" | "completed" | "expired"
  notes: string
}

export function usePrescriptions(userId?: string, status?: string) {
  return useQuery({
    queryKey: ["prescriptions", { userId, status }],
    queryFn: async () => {
      const params: Record<string, string> = {}
      if (userId) params.userId = userId
      if (status) params.status = status

      const response = await apiClient("/prescriptions", { params })
      return response.data as Prescription[]
    },
    enabled: !!userId,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
