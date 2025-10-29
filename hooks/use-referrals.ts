"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient, type APIError } from "@/lib/api-client"

interface CreateReferralInput {
  pharmacyId: string
  patientId: string
  appointmentId: string
  prescriptionId?: string
  diagnosis: string
  referralMessage: string
  notes?: string
}

export function usePharmacyReferrals() {
  return useQuery({
    queryKey: ["pharmacy-referrals"],
    queryFn: async () => {
      const response = await apiClient("/referrals/pharmacy")
      return response.data
    },
    retry: 2,
  })
}

export function usePatientReferrals() {
  return useQuery({
    queryKey: ["patient-referrals"],
    queryFn: async () => {
      const response = await apiClient("/referrals/patient")
      return response.data
    },
    retry: 2,
  })
}

export function useCreateReferral() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: CreateReferralInput) => {
      const response = await apiClient("/referrals/create", {
        method: "POST",
        body: JSON.stringify(input),
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pharmacy-referrals"] })
      queryClient.invalidateQueries({ queryKey: ["patient-referrals"] })
    },
    onError: (error: APIError) => {
      console.error("[v0] Create referral error:", error.message)
    },
  })
}

export function useUpdateReferralStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ referralId, status }: { referralId: string; status: string }) => {
      const response = await apiClient(`/referrals/${referralId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pharmacy-referrals"] })
      queryClient.invalidateQueries({ queryKey: ["patient-referrals"] })
    },
    onError: (error: APIError) => {
      console.error("[v0] Update referral status error:", error.message)
    },
  })
}
