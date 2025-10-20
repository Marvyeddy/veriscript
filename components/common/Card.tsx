import React from "react";
import Wallet from "@/public/assets/Wallet.svg";
import Aid from "@/public/assets/FirstAidKit.svg";
import Pharm from "@/public/assets/Prescription.svg";
import Hbar from "@/public/assets/hbar_white.svg";
import V1 from "@/public/assets/Vector-1.svg";
import V2 from "@/public/assets/Vector.svg";
import Image from "next/image";

const Card = () => {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <div className="w-[321px] py-[23px] px-[21px] rounded-[12px] flex flex-col gap-[38px] bg-gradient-to-tl from-[#004B24] via-[#00B155] to-[#00B155] relative overflow-hidden">
        <div className="flex items-center gap-1">
          <Image src={Wallet} alt="wallet" loading="lazy" />
          <h2 className="font-jarkata text-white">Wallet</h2>
        </div>

        <div className="flex gap-1 items-center">
          <Image src={Hbar} alt="hbar" loading="lazy" />
          <h2 className="text-white uppercase text-[32px] font-semibold font-jakarta tracking-tighter leading-[107%] max-md:text-3xl">
            10,000.00HBAR
          </h2>
        </div>

        <div className="absolute -right-40">
          <Image src={V1} alt="v1" loading="lazy" />
          <Image src={V2} alt="v2" loading="lazy" className="absolute top-15" />
        </div>
      </div>

      {/* patient */}
      <div className="w-[321px] py-[23px] px-[21px] rounded-[12px] flex flex-col gap-[38px] bg-white">
        <div className="flex items-center gap-1">
          <Image src={Aid} alt="aid" loading="lazy" />
          <h2 className="font-jarkata text-black font-semibold">Doctors</h2>
        </div>

        <div className="flex gap-1 items-center tracking-tighter">
          <h2 className="text-[32px] font-jakarta">25</h2>
          <sub className="font-semibold font-jakarta">Avaiable</sub>
        </div>
      </div>

      {/* pharm */}
      <div className="w-[321px] py-[23px] px-[21px] rounded-[12px] flex flex-col gap-[38px] bg-white">
        <div className="flex items-center gap-1">
          <Image src={Pharm} alt="pharm" loading="lazy" />
          <h2 className="font-jarkata text-black font-semibold">Pharmacy</h2>
        </div>

        <div className="flex gap-1 items-center tracking-tighter">
          <h2 className="text-[32px] font-jakarta">200</h2>
          <sub className="font-semibold font-jakarta">In your area</sub>
        </div>
      </div>
    </div>
  );
};

export default Card;
