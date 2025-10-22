"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import TabBar from "@/components/common/TabBar";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";
import Map from "@/public/assets/MapPin.svg";
import pharmacist_hero from "@/public/assets/pharmacy.svg";
export default function Pharmacy() {
  const [activeTab, setActiveTab] = useState<string>("All");

  // doctor data state so we can update bookings
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
      name: "Pharmacist Benjamin Okoli",
      type: "Paediatrician",
      doctorId: "00113456",

      rating: 4.7,
      distance: "2 metres Away",
      isBooked: false,
    },
    {
      id: 3,
      image: pharmacist_hero,
      name: "Pharmacist Benjamin Okoli",
      type: "Paediatrician",
      doctorId: "00113456",

      rating: 4.7,
      distance: "2 metres Away",
      isBooked: false,
    },
  ]);

  // handle booking (toggle booked state)
  const handleBookPharmacist = (id: number) => {
    setPharmacist((prev) =>
      prev.map((pharmacy) =>
        pharmacy.id === id
          ? { ...pharmacy, isBooked: !pharmacy.isBooked }
          : pharmacy
      )
    );
  };

  // filter pharmacist based on tab
  const filteredPharmacist =
    activeTab === "All"
      ? pharmacist
      : activeTab === "Booked"
      ? pharmacist.filter((pharmacy) => pharmacy.isBooked)
      : pharmacist.filter((pharmacy) => !pharmacy.isBooked); // "Recents" shows unbooked

  return (
    <div className=" px-4 sm:px-6 lg:px-[32px] py-4 sm:py-6 lg:py-[31px]">
      <div className="w-full flex justify-between items-center py-[8px] ">
        <h1 className="font-jakarta font-semibold leading-snug ">Pharmacist</h1>
        <Button
          variants="default"
          className="w-fit flex items-center justify-between gap-2"
        >
          <Search size={15} />
          <h2 className="font-bold text-sm font-jakarta">Find pharmacist</h2>
        </Button>
      </div>
      {/* tabar */}
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {filteredPharmacist.map((item) => (
        <div
          key={item.id}
          onClick={() => handleBookPharmacist(item.id)}
          className=" relative w-full flex md:flex-row flex-col items-center  justify-start  md:justify-between border-b border-gray-100 last:border-none pb-3 bg-white px-4 py-5 md:py-2 gap-4 md:gap-0"
        >
          <div className="flex  md:flex-1 items-center lg:gap-7 lg:w-1/2 w-full gap-2 px-2 ">
            <div>
              <Image
                src={item.image}
                alt="pharmacist"
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col lg:gap-2.5 gap-0">
              <h1 className="font-semibold text-[#4D4D4D]">{item.name}</h1>

              <h2 className="font-bold text-sm font-jakarta leading-tight">
                Paediatrician Doctor ID:{" "}
                <span className="font-medium text-[#808080]"></span>
              </h2>

              <div className="flex items-center gap-2">
                <Image src={Map} alt="map" width={16} height={16} />
                <span>{item.distance}</span>
              </div>
            </div>
          </div>
          <div className=" w-1/2 md:w-fit flex items-center ">
            <div className="text-white py-1 px-2 rounded-xl bg-[#03B156] w-[58px] flex items-center  gap-2 ">
              <Star size={14} /> {item.rating}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
