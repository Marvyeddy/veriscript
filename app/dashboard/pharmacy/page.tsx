"use client"
import { Search, MapPin } from "lucide-react"
import { useState, useEffect } from "react"
import TabBar from "@/components/common/TabBar"
import Button from "@/components/ui/Button"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useToast } from "@/hooks/use-toast"
import { PharmacyCardWithDistance } from "@/components/pharmacy/pharmacy-card-with-distance"
import { LoadingState } from "@/components/common/LoadingState"
import { ErrorState } from "@/components/common/ErrorState"

interface Pharmacy {
  _id: string
  pharmacyName: string
  address: string
  phone: string
  distance: number
  rating: number
  totalReviews: number
  location: {
    latitude: number
    longitude: number
  }
}

export default function Pharmacy() {
  const [activeTab, setActiveTab] = useState<string>("All")
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { latitude, longitude } = useGeolocation()
  const { toast } = useToast()

  useEffect(() => {
    if (!latitude || !longitude) {
      setLoading(false)
      return
    }

    fetchNearbyPharmacies()
  }, [latitude, longitude])

  const fetchNearbyPharmacies = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/pharmacy/nearby", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          latitude,
          longitude,
          maxDistance: 50,
        }),
      })

      if (!response.ok) throw new Error("Failed to fetch pharmacies")

      const data = await response.json()
      setPharmacies(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load pharmacies"
      setError(message)
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredPharmacies =
    activeTab === "All" ? pharmacies : activeTab === "Nearest" ? pharmacies.slice(0, 5) : pharmacies

  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} onRetry={fetchNearbyPharmacies} />

  return (
    <div className="px-4 sm:px-6 lg:px-[32px] py-4 sm:py-6 lg:py-[31px]">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 py-2 sm:py-[8px]">
        <h1 className="font-jakarta font-semibold leading-snug text-lg">Pharmacies</h1>
        <Button
          variants="default"
          className="w-full sm:w-fit flex items-center justify-center sm:justify-between gap-2"
          onClick={fetchNearbyPharmacies}
        >
          <Search size={15} />
          <h2 className="font-bold text-sm font-jakarta">Refresh</h2>
        </Button>
      </div>

      {/* Tab Bar */}
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Pharmacies List */}
      <div className="space-y-4 mt-4">
        {filteredPharmacies.length > 0 ? (
          filteredPharmacies.map((pharmacy) => <PharmacyCardWithDistance key={pharmacy._id} pharmacy={pharmacy} />)
        ) : (
          <div className="text-center py-8 text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No pharmacies found nearby</p>
          </div>
        )}
      </div>
    </div>
  )
}
