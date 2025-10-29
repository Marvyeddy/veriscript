// hooks/use-geolocation.ts
"use client";

import { useEffect, useState, useRef } from "react";

interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number; // in meters
}

interface UseGeolocationReturn {
  coordinates: GeolocationCoordinates | null;
  error: string | null;
  isLoading: boolean;
  requestLocation: () => void;
}

export function useGeolocation(): UseGeolocationReturn {
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasSucceededRef = useRef(false);

  const isBrowser = typeof window !== "undefined";

  const requestLocation = () => {
    if (!isBrowser) return;

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        console.log("Geolocation success:", { latitude, longitude, accuracy });

        // Only accept high accuracy (< 25 meters)
        if (accuracy > 20) {
          console.warn(`Low accuracy (${accuracy}m), retrying...`);
          setError("Getting precise location...");
          // Retry after 2s
          retryTimeoutRef.current = setTimeout(requestLocation, 2000);
          return;
        }

        setCoordinates({ latitude, longitude, accuracy });
        setError(null);
        setIsLoading(false);
        hasSucceededRef.current = true;

        // Clear any pending retry
        if (retryTimeoutRef.current) {
          clearTimeout(retryTimeoutRef.current);
          retryTimeoutRef.current = null;
        }
      },
      (err) => {
        let message = "Location unavailable";
        let shouldRetry = false;

        switch (err.code) {
          case err.PERMISSION_DENIED:
            message = "Location permission denied. Please enable in browser settings.";
            break;
          case err.POSITION_UNAVAILABLE:
            message = "Location information is unavailable.";
            shouldRetry = true;
            break;
          case err.TIMEOUT:
            message = "Location request timed out. Retrying...";
            shouldRetry = true;
            break;
          default:
            message = "An unknown error occurred.";
            shouldRetry = true;
        }

        setError(message);
        setIsLoading(false);

        // Retry only if not denied and not already succeeded
        if (shouldRetry && !hasSucceededRef.current) {
          retryTimeoutRef.current = setTimeout(requestLocation, 3000);
        }
      },
      {
        enableHighAccuracy: true,   // GPS + WiFi + Cell
        timeout: 20000,             // 20 seconds
        maximumAge: 0,              // Force fresh location
      }
    );
  };

  // Auto-start on mount (client only)
  useEffect(() => {
    if (!isBrowser) return;

    requestLocation();

    // Cleanup on unmount
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, [isBrowser]);

  return {
    coordinates,
    error,
    isLoading,
    requestLocation,
  };
}