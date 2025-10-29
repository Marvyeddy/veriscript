"use client"

import { AlertCircle, MapPin, X } from "lucide-react"
import { useState } from "react"
import { useGeolocation } from "@/hooks/use-geolocation"

export function LocationPermissionBanner() {
  const { coordinates, error, isLoading, requestLocation } = useGeolocation()
  const [dismissed, setDismissed] = useState(false)

  if (coordinates || dismissed) {
    return null
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3 mb-4">
      <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
      <div className="flex-1">
        <h3 className="font-semibold text-yellow-900 mb-1">Enable Location Services</h3>
        <p className="text-sm text-yellow-800 mb-3">
          Allow access to your location to find doctors near you and get accurate distance information.
        </p>
        <div className="flex gap-2">
          <button
            onClick={requestLocation}
            disabled={isLoading}
            className="flex items-center gap-2 px-3 py-1.5 bg-yellow-600 text-white rounded text-sm font-medium hover:bg-yellow-700 disabled:opacity-50"
          >
            <MapPin size={16} />
            {isLoading ? "Detecting..." : "Enable Location"}
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="px-3 py-1.5 text-yellow-700 hover:bg-yellow-100 rounded text-sm font-medium"
          >
            Dismiss
          </button>
        </div>
        {error && <p className="text-xs text-yellow-700 mt-2">{error}</p>}
      </div>
      <button onClick={() => setDismissed(true)} className="text-yellow-600 hover:text-yellow-700">
        <X size={18} />
      </button>
    </div>
  )
}
