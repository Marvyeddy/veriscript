"use client"

import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api-client"

interface Doctor {
  id: number
  name: string
  type: string
  doctorId: string
  fee: number
  currency: string
  rating: number
  distance: string
  latitude: number
  longitude: number
  image: string
  isAvailable: boolean
}

interface UseDoctorsOptions {
  specialty?: string
  latitude?: number
  longitude?: number
  enabled?: boolean
}

export function useDoctors(options: UseDoctorsOptions = {}) {
  const { specialty, latitude, longitude, enabled = true } = options

  return useQuery({
    queryKey: ["doctors", { specialty, latitude, longitude }],
    queryFn: async () => {
      const params: Record<string, string | number | boolean> = {}
      if (specialty) params.specialty = specialty
      if (latitude) params.latitude = latitude
      if (longitude) params.longitude = longitude

      const response = await apiClient("/doctors", { params })
      return response.data as Doctor[]
    },
    enabled,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

export function useDoctorDetail(doctorId: string | number) {
  return useQuery({
    queryKey: ["doctor", doctorId],
    queryFn: async () => {
      const response = await apiClient(`/doctors/${doctorId}`)
      return response.data
    },
    enabled: !!doctorId,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}
