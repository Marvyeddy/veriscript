"use client";
import { Star, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import TabBar from "@/components/common/TabBar";
import Button from "@/components/ui/Button";
import Map from "@/public/assets/MapPin.svg";
import pharmacist_hero from "@/public/assets/pharmacy.svg";

export default function Pharmacy() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const [pharmacist, setPharmacist] = useState([
    {
      id: 1,
      image: pharmacist_hero,
      name: "Pharmacist Benjamin Okoli",
      type: "Paediatrician",
      doctorId: "00113456",
      rating: 4.7,
      distance: "2 metres Away",
      isBooked: false,
    },
    {
      id: 2,
      image: pharmacist_hero,
      name: "Pharmacist Adaeze Chukwu",
      type: "Dermatologist",
      doctorId: "00124567",
      rating: 4.8,
      distance: "5 metres Away",
      isBooked: false,
    },
    {
      id: 3,
      image: pharmacist_hero,
      name: "Pharmacist Tunde Adebayo",
      type: "Cardiologist",
      doctorId: "00133489",
      rating: 4.6,
      distance: "10 metres Away",
      isBooked: false,
    },
  ]);

  // Toggle booking
  const handleBookPharmacist = (id: number) => {
    setPharmacist((prev) =>
      prev.map((pharmacy) =>
        pharmacy.id === id
          ? { ...pharmacy, isBooked: !pharmacy.isBooked }
          : pharmacy
      )
    );
  };

  // Filter based on tab
  const filteredPharmacist =
    activeTab === "All"
      ? pharmacist
      : activeTab === "Booked"
      ? pharmacist.filter((p) => p.isBooked)
      : pharmacist.filter((p) => !p.isBooked);

  return (
    <div className="px-4 sm:px-6 lg:px-[32px] py-4 sm:py-6 lg:py-[31px]">
      {/* Header */}
      <div className="w-full flex justify-between items-center py-[8px]">
        <h1 className="font-jakarta font-semibold leading-snug text-lg">
          Pharmacist
        </h1>
        <Button
          variants="default"
          className="w-fit flex items-center justify-between gap-2"
        >
          <Search size={15} />
          <h2 className="font-bold text-sm font-jakarta">Find pharmacist</h2>
        </Button>
      </div>

      {/* Tab Bar */}
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Pharmacist List */}
      <div className="space-y-4 mt-4">
        {filteredPharmacist.map((item) => (
          <div
            key={item.id}
            onClick={() => handleBookPharmacist(item.id)}
            className="flex items-center justify-between w-full bg-white border-b border-gray-100 py-4 px-4 rounded-md hover:shadow-sm transition cursor-pointer"
          >
            {/* Left: Info */}
            <div className="flex items-center gap-4">
              <Image
                src={item.image}
                alt="pharmacist"
                width={64}
                height={64}
                className="object-contain rounded-full"
              />
              <div className="flex flex-col">
                <h1 className="font-semibold text-[#4D4D4D]">{item.name}</h1>
                <h2 className="font-bold text-sm font-jakarta leading-tight">
                  {item.type} • ID:{" "}
                  <span className="font-medium text-[#808080]">
                    {item.doctorId}
                  </span>
                </h2>
                <div className="flex items-center gap-2 text-sm text-[#808080]">
                  <Image src={Map} alt="map" width={16} height={16} />
                  <span>{item.distance}</span>
                </div>
              </div>
            </div>

            {/* Right: Rating */}
            <div className="flex items-center">
              <div className="text-white py-1 px-2 rounded-xl bg-[#03B156] w-[58px] flex items-center gap-2 justify-center">
                <Star size={14} /> {item.rating}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
