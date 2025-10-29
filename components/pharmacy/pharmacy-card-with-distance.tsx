"use client";

import { MapPin, Star, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

interface PharmacyCardWithDistanceProps {
  pharmacy: Pharmacy;
}

export function PharmacyCardWithDistance({
  pharmacy,
}: PharmacyCardWithDistanceProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col gap-3">
          {/* Header */}
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900">
                {pharmacy.pharmacyName}
              </h3>
              <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{pharmacy.distance.toFixed(1)} km away</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">
                {pharmacy.rating.toFixed(1)}
              </span>
              <span className="text-xs text-gray-600">
                ({pharmacy.totalReviews})
              </span>
            </div>
          </div>

          {/* Address */}
          <p className="text-sm text-gray-600">{pharmacy.address}</p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Phone className="w-4 h-4" />
              <a href={`tel:${pharmacy.phone}`} className="hover:text-blue-600">
                {pharmacy.phone}
              </a>
            </div>
            <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition">
              View Details
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
