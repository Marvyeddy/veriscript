import React from "react";
import DocImg from "@/public/assets/doctorPictor.svg";
import Hbar from "@/public/assets/hbar_dark.svg";
import Image from "next/image";
import Locator from "@/public/assets/MapPin2.svg";
import Star from "@/public/assets/Star.svg";
import Button from "../ui/Button";

const MedicalCard = ({
  id,
  reverse = false,
}: {
  id: string;
  reverse?: boolean;
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-2.5 bg-white w-full py-4 px-3 sm:py-[20px] sm:px-[14px] rounded-[8px]">
      <div className="flex-1 flex gap-3">
        <Image
          src={DocImg}
          alt="doctor_img"
          loading="lazy"
          className="w-12 h-12 sm:w-auto sm:h-auto"
        />

        <div className="space-y-1 sm:space-y-2 flex-1">
          <h2 className="text-[#4D4D4D] font-semibold text-lg sm:text-[20px] leading-tight">
            Doctor Benjamin Okoli
          </h2>

          <div className="flex flex-col sm:flex-row sm:space-x-3 gap-1 sm:gap-0">
            <h3 className="font-semibold text-sm text-[#1A1A1A]">
              Paedetrician
            </h3>

            <h3 className="font-semibold text-sm text-[#1A1A1A]">
              Doctor ID:{" "}
              <span className="font-medium text-[#808080] text-sm leading-[145%]">
                {id}
              </span>
            </h3>
          </div>

          <div className="flex gap-x-1 items-center">
            <Image
              src={Locator}
              alt="location"
              loading="lazy"
              className="w-4 h-4"
            />{" "}
            <span className="text-xs font-medium">2 metres away</span>
          </div>
        </div>
      </div>

      <div
        className={`flex-1 flex flex-row  justify-between items-center sm:items-start sm:space-y-1.5 gap-2 sm:gap-0 ${
          reverse ? "sm:flex-col-reverse sm:gap-1" : "sm:flex-col"
        }`}
      >
        <div className="flex sm:block flex-col ">
          <h2 className="text-[#808080] text-sm font-medium">Fee:</h2>

          <div className="flex items-center gap-x-2">
            <Image
              src={Hbar}
              alt="hbar"
              loading="lazy"
              className="w-6 h-6 sm:w-auto sm:h-auto"
            />
            <h2 className="font-semibold text-lg sm:text-[20px]">200HBAR</h2>
          </div>
        </div>

        <Button
          variants="default"
          className="flex items-center gap-1 py-2 px-3 sm:py-[4px] sm:px-[8px]"
        >
          <Image src={Star} alt="star" loading="lazy" className="w-4 h-4" />
          <h2 className="font-semibold text-sm">4.7</h2>
        </Button>
      </div>
    </div>
  );
};

export default MedicalCard;
