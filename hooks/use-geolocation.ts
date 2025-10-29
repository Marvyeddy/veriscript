"use client"

import { useEffect, useState } from "react"

interface GeolocationCoordinates {
  latitude: number
  longitude: number
  accuracy: number
}

interface UseGeolocationReturn {
  coordinates: GeolocationCoordinates | null
  error: string | null
  isLoading: boolean
  requestLocation: () => void
}

export function useGeolocation(): UseGeolocationReturn {
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      return
    }

    setIsLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        })
        setIsLoading(false)
      },
      (err) => {
        let errorMessage = "Unable to retrieve your location"
        if (err.code === err.PERMISSION_DENIED) {
          errorMessage = "Location permission denied. Please enable location access in your browser settings."
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          errorMessage = "Location information is unavailable."
        } else if (err.code === err.TIMEOUT) {
          errorMessage = "The request to get user location timed out."
        }
        setError(errorMessage)
        setIsLoading(false)
      },
    )
  }

  // Auto-request location on mount
  useEffect(() => {
    requestLocation()
  }, [])

  return { coordinates, error, isLoading, requestLocation }
}
