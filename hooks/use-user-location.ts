"use client";

import { useQuery } from "@tanstack/react-query";
import { useGeolocation } from "./use-geolocation";

interface LocationData {
  address: string;
  latitude: number;
  longitude: number;
  city?: string;
  country?: string;
}

export function useUserLocation() {
  const isBrowser = typeof window !== "undefined";

  const { coordinates, isLoading: geoLoading, error: geoError } = useGeolocation();

  // --- 1. DB Location (only run on client) ---
  const { data: dbLocation } = useQuery({
    queryKey: ["userLocationDB"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/user/location", {
          credentials: "include", // Important: send cookies
        });
        if (!response.ok) return null;
        const data = await response.json();
        return data.location;
      } catch {
        return null;
      }
    },
    enabled: isBrowser, // Only run on client
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
  });

  // --- 2. Use geolocation OR DB location ---
  const activeCoordinates = coordinates || dbLocation;

  // --- 3. Reverse Geocode (only if coords exist) ---
  const { data: locationData, isLoading: geocodingLoading } = useQuery({
    queryKey: ["userLocation", activeCoordinates?.latitude, activeCoordinates?.longitude],
    queryFn: async () => {
      if (!activeCoordinates?.latitude || !activeCoordinates?.longitude) return null;

      const response = await fetch(
        `/api/location/reverse-geocode?lat=${activeCoordinates.latitude}&lon=${activeCoordinates.longitude}`
      );

      if (!response.ok) throw new Error("Failed to fetch address");
      return response.json() as Promise<LocationData>;
    },
    enabled: isBrowser && !!activeCoordinates?.latitude && !!activeCoordinates?.longitude,
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });

  // --- 4. SSR-safe loading state ---
  const isActuallyLoading = isBrowser && (geoLoading || geocodingLoading);

  return {
    location: locationData,
    coordinates: activeCoordinates,
    isLoading: isActuallyLoading,
    error: geoError,
    hasLocation: !!activeCoordinates?.latitude && !!activeCoordinates?.longitude,
  };
}