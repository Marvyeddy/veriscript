"use client";

import { Search } from "lucide-react";
import TabBar from "@/components/common/TabBar";
import { useState } from "react";
import Image from "next/image";
import doctor_hero from "@/public/assets/doctorPictor.svg";
import Map from "@/public/assets/MapPin.svg";
import hbar_bar from "@/public/assets/hbar_dark.svg";
import Button from "@/components/ui/Button";
import { MoveDownRight } from "lucide-react";

import { Star } from "lucide-react";
const DoctorPage = () => {
  const [activeTab, setActiveTab] = useState<string>("All");

  // doctor data state so we can update bookings
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      image: doctor_hero,
      name: "Doctor Benjamin Okoli",
      type: "Paediatrician",
      doctorId: "00113456",
      fee: "200 HBAR",
      rating: 4.7,
      distance: "2 metres Away",
      isBooked: false,
    },
    {
      id: 2,
      image: doctor_hero,
      name: "Doctor Benjamin Okoli",
      type: "Paediatrician",
      doctorId: "00113456",
      fee: "200 HBAR",
      rating: 4.7,
      distance: "2 metres Away",
      isBooked: false,
    },
    {
      id: 3,
      image: doctor_hero,
      name: "Doctor Benjamin Okoli",
      type: "Paediatrician",
      doctorId: "00113456",
      fee: "200 HBAR",
      rating: 4.7,
      distance: "2 metres Away",
      isBooked: false,
    },
  ]);

  // handle booking (toggle booked state)
  const handleBookDoctor = (id: number) => {
    setDoctors((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, isBooked: !doc.isBooked } : doc
      )
    );
  };

  // filter doctors based on tab
  const filteredDoctors =
    activeTab === "All"
      ? doctors
      : activeTab === "Booked"
      ? doctors.filter((doc) => doc.isBooked)
      : doctors.filter((doc) => !doc.isBooked); // "Recents" shows unbooked

  return (
    <div className=" px-4 sm:px-6 lg:px-[32px] py-4 sm:py-6 lg:py-[31px]">
      <div className="w-full flex justify-between items-center py-[8px] ">
        <h1 className="font-jakarta font-semibold leading-snug ">Doctors</h1>
        <Button
          variants="default"
          className="w-fit flex items-center justify-between gap-2"
        >
          <Search size={15} />
          <h2 className="font-bold text-sm font-jakarta">Find Doctors</h2>
        </Button>
      </div>

      {/* tabar */}
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* doctors online  */}
      <div className="min-h-screen lg:py-5 px-3.5 rounded-lg w-full flex flex-col gap-4 ">
        {filteredDoctors.map((item) => (
          <div
            key={item.id}
            onClick={() => handleBookDoctor(item.id)}
            className=" relative w-full flex md:flex-row flex-col items-center justify-between border-b border-gray-100 last:border-none pb-3  bg-white px-3 py-5 md:py-2 gap-4 md:gap-0"
          >
            {/* Left side: Doctor info */}
            <div className="flex items-center lg:gap-7 lg:w-1/2 w-full gap-2 ">
              <div>
                <Image
                  src={item.image}
                  alt="doctor_hero"
                  width={64}
                  height={64}
                />
              </div>

              <div className="flex flex-col lg:gap-2.5 gap-0">
                <h1 className="font-semibold text-[#4D4D4D]">{item.name}</h1>

                <h2 className="font-bold text-sm font-jakarta leading-tight">
                  Paediatrician Doctor ID:{" "}
                  <span className="font-medium text-[#808080]">
                    {item.doctorId}
                  </span>
                </h2>

                <div className="flex items-center gap-2">
                  <Image src={Map} alt="map" width={16} height={16} />
                  <span>{item.distance}</span>
                </div>
              </div>
            </div>

            {/* Right side: Fee & Rating */}
            <div className="w-1/2 flex flex-col gap-0  md:gap-2.5 items-start">
              <h1 className="text-[#808080] font-medium font-jakarta">Fee:</h1>

              <div className="flex items-center gap-1">
                <Image src={hbar_bar} alt="hbar_bar" width={20} height={20} />
                <h2 className="font-jakarta font-bold">{item.fee}</h2>
              </div>

              <div className="text-white py-1 px-2 rounded-xl bg-[#03B156] w-[58px] flex items-center gap-2">
                <Star size={14} /> 4.7
              </div>
            </div>
            {/* doctor is booked for an appointment  */}

            {item.isBooked && (
              <div>
                <div className="absolute top-1/2  right-8 text-black border-2 border-[#03B156] ">
                  <MoveDownRight size={25} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredDoctors.length === 0 && (
        <div className="text-center">no doctor online</div>
      )}
    </div>
  );
};

export default DoctorPage;
