"use client"

import { AlertCircle, X, RefreshCw } from "lucide-react"
import { useState } from "react"
import { useUserLocation } from "@/hooks/use-user-location"

export function LocationPermissionBanner() {
  const { coordinates, error, isLoading, hasLocation } = useUserLocation()
  const [dismissed, setDismissed] = useState(false)

  if (hasLocation || dismissed) {
    return null
  }

  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3 mb-4">
      <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
      <div className="flex-1">
        <h3 className="font-semibold text-yellow-900 mb-1">Location Required</h3>
        <p className="text-sm text-yellow-800 mb-3">
          {error ||
            "We need your location to find nearby doctors and pharmacies. Please enable location access in your browser settings."}
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleReload}
            disabled={isLoading}
            className="flex items-center gap-2 px-3 py-1.5 bg-yellow-600 text-white rounded text-sm font-medium hover:bg-yellow-700 disabled:opacity-50"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            {isLoading ? "Detecting..." : "Reload & Enable"}
          </button>
          <button
            onClick={() => setDismissed(true)}
            className="px-3 py-1.5 text-yellow-700 hover:bg-yellow-100 rounded text-sm font-medium"
          >
            Dismiss
          </button>
        </div>
      </div>
      <button onClick={() => setDismissed(true)} className="text-yellow-600 hover:text-yellow-700">
        <X size={18} />
      </button>
    </div>
  )
}
