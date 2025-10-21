import { Search } from "lucide-react";
import TabBar from "@/components/common/TabBar";
import Image from "next/image";
import doctor_hero from "@/public/assets/doctorPictor.svg";
import Map from "@/public/assets/MapPin.svg";
import hbar_bar from "@/public/assets/hbar_dark.svg";
import Button from "@/components/ui/Button";

import { Star } from "lucide-react";
const DoctorPage = () => {
  const data = [
    {
      Image: doctor_hero,
      name: "Goodness Benjamin",
      id: "001113467",
      distance: "2 metres Away ",
      Amount: "200 HBAR",
    },
    {
      Image: doctor_hero,
      name: "Goodness Benjamin",
      id: "0011134768",
      distance: "2 metres Away ",
      Amount: "200 HBAR",
    },
    {
      Image: doctor_hero,
      name: "Goodness Benjamin",
      id: "001113469",
      distance: "2 metres Away ",
      Amount: "200 HBAR",
    },
    {
      Image: doctor_hero,
      name: "Goodness Benjamin",
      id: "001113470",
      distance: "2 metres Away ",
      Amount: "200 HBAR",
    },
  ];

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
      <TabBar />
      {/* doctors online  */}
      <div className="h-[125px] py-5 px-3.5 rounded-lg w-full flex flex-col gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="w-full flex items-center justify-between border-b border-gray-100 last:border-none pb-3  bg-white px-3"
          >
            {/* Left side: Doctor info */}
            <div className="flex items-center gap-7 w-1/2">
              <div>
                <Image
                  src={item.Image}
                  alt="doctor_hero"
                  width={64}
                  height={64}
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <h1 className="font-semibold text-[#4D4D4D]">{item.name}</h1>

                <h2 className="font-bold text-sm font-jakarta leading-tight">
                  Paediatrician Doctor ID:{" "}
                  <span className="font-medium text-[#808080]">{item.id}</span>
                </h2>

                <div className="flex items-center gap-2">
                  <Image src={Map} alt="map" width={16} height={16} />
                  <span>{item.distance}</span>
                </div>
              </div>
            </div>

            {/* Right side: Fee & Rating */}
            <div className="w-1/2 flex flex-col gap-2.5 items-start">
              <h1 className="text-[#808080] font-medium font-jakarta">Fee:</h1>

              <div className="flex items-center gap-1">
                <Image src={hbar_bar} alt="hbar_bar" width={20} height={20} />
                <h2 className="font-jakarta font-bold">{item.Amount}</h2>
              </div>

              <div className="text-white py-1 px-2 rounded-xl bg-[#03B156] w-[58px] flex items-center gap-2">
                <Star size={14} /> 4.7
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorPage;
