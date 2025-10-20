"use client";

import Image from "next/image";
import Map from "@/public/assets/MapPin.svg";
import Down from "@/public/assets/CaretDown_black.svg";
import Img from "@/public/assets/face.svg";
import Ring from "@/public/assets/Bell.svg";
import React from "react";
import Card from "@/components/common/Card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TableLink = [
  {
    text: "All",
    href: "/dashboard",
  },
  {
    text: "Recent",
    href: "/recent",
  },
  {
    text: "Active",
    href: "/active",
  },
  {
    text: "Pending",
    href: "/pending",
  },
];

const Dashboard = () => {
  const pathname = usePathname();

  const active = "text-[#03B156] border-b-2 border-[#03B156]";
  return (
    <section className="relative flex-1">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-[32px]">
          <button className="flex items-center gap-2 py-[12px] px-[14px] rounded-[10px] bg-[#F5F5F5] my-[23px] cursor-pointer">
            <Image src={Map} alt="map_pin" loading="lazy" />
            <h3 className="font-jakarta text-[18px] max-lg:text-sm text-[#4D4D4D] font-medium">
              28 Admin Rd Ikeja Lagos{" "}
            </h3>
            <Image src={Down} alt="down_arrow" loading="lazy" />
          </button>

          <div className="flex items-center gap-2">
            <Image src={Img} alt="face_img" loading="lazy" />
            <h2 className="font-jakarta text-[#1A1A1A] text-[18px] max-lg:text-sm">
              Okuwdi Goodness
            </h2>
            <Image src={Ring} alt="bell" loading="lazy" />
          </div>
        </div>

        <div className="bg-[#F5F5F5] flex-1 px-[32px] py-[31px]">
          {/* card */}
          <div className="mb-[24px]">
            <div className="font-jakarta mb-[14px]">
              <h2 className="text-[20px] font-semibold max-lg:text-lg">
                Hey Goodness
              </h2>
              <p className="max-lg:text-sm">How are you doing today</p>
            </div>

            {/* card */}
            <div>
              <Card />
            </div>
          </div>

          {/* table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-[20px] font-jakarta font-semibold text-[#4D4D4D] max-lg:text-sm">
                Recent Activity
              </h1>

              <div className="relative">
                <Input
                  className="bg-white w-[300px] max-lg:w-auto pl-[34px]"
                  placeholder="Search..."
                />
                <Search className="absolute  size-[20px] text-[#525866] top-2 ml-2" />
              </div>
            </div>

            {/* header table */}
            <div className="bg-white rounded-[8px] px-6 flex justify-between items-center">
              {TableLink.map((link, idx) => (
                <Link
                  href={link.href}
                  key={idx}
                  className={` px-[20px] py-[7px] font-sans ${
                    pathname === link.href ? active : "text-[#808080]"
                  }`}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
