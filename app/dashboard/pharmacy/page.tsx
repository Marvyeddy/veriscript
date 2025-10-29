"use client";
import { Search, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import TabBar from "@/components/common/TabBar";
import Button from "@/components/ui/Button";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useToast } from "@/hooks/use-toast";
import { PharmacyCardWithDistance } from "@/components/pharmacy/pharmacy-card-with-distance";
import { LoadingState } from "@/components/common/LoadingState";
import { ErrorState } from "@/components/common/ErrorState";

interface Pharmacy {
  _id: string;
  pharmacyName: string;
  address: string;
  phone: string;
  distance: number;
  rating: number;
  totalReviews: number;
  location: {
    latitude: number;
    longitude: number;
  };
}

export default function PharmacyPage() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    coordinates,
    error: geoError,
    isLoading: geoLoading,
    requestLocation,
  } = useGeolocation();
  const { toast } = useToast();

  useEffect(() => {
    if (!coordinates) {
      if (geoError) {
        setError(geoError);
      }
      setLoading(false);
      return;
    }

    fetchNearbyPharmacies();
  }, [coordinates]);

  const fetchNearbyPharmacies = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
        throw new Error("Location data is not available");
      }

      const response = await fetch("/api/pharmacy/nearby", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          maxDistance: 50,
        }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid response format from server");
      }

      setPharmacies(data);

      if (data.length === 0) {
        toast({
          title: "No pharmacies found",
          description: "No pharmacies available in your area",
          variant: "default",
        });
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load pharmacies";
      console.error("[v0] Pharmacy fetch error:", message);
      setError(message);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredPharmacies =
    activeTab === "All"
      ? pharmacies
      : activeTab === "Nearest"
      ? pharmacies.slice(0, 5)
      : pharmacies;

  if (loading) return <LoadingState />;
  if (error && pharmacies.length === 0)
    return <ErrorState message={error} onRetry={fetchNearbyPharmacies} />;

  return (
    <div className="px-4 sm:px-6 lg:px-[32px] py-4 sm:py-6 lg:py-[31px]">
      {/* Header */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 py-2 sm:py-[8px]">
        <h1 className="font-jakarta font-semibold leading-snug text-lg">
          Pharmacies
        </h1>
        <Button
          variants="default"
          className="w-full sm:w-fit flex items-center justify-center sm:justify-between gap-2"
          onClick={fetchNearbyPharmacies}
          disabled={loading}
        >
          <Search size={15} />
          <h2 className="font-bold text-sm font-jakarta">
            {loading ? "Loading..." : "Refresh"}
          </h2>
        </Button>
      </div>

      {/* Tab Bar */}
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Pharmacies List */}
      <div className="space-y-4 mt-4">
        {filteredPharmacies.length > 0 ? (
          filteredPharmacies.map((pharmacy) => (
            <PharmacyCardWithDistance key={pharmacy._id} pharmacy={pharmacy} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No pharmacies found nearby</p>
          </div>
        )}
      </div>
    </div>
  );
}
