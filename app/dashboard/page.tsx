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

import PrescriptionTable from "@/components/common/Table";

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
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 lg:px-[32px] gap-3 sm:gap-0">
          <button className="flex items-center justify-center sm:justify-start gap-2 py-3 px-4 sm:py-[12px] sm:px-[14px] rounded-[10px] bg-[#F5F5F5] my-4 sm:my-[23px] cursor-pointer w-full sm:w-auto">
            <Image
              src={Map}
              alt="map_pin"
              loading="lazy"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <h3 className="font-jakarta text-sm sm:text-[16px] lg:text-[18px] text-[#4D4D4D] font-medium truncate">
              28 Admin Rd Ikeja Lagos
            </h3>
            <Image
              src={Down}
              alt="down_arrow"
              loading="lazy"
              className="w-3 h-3 sm:w-4 sm:h-4"
            />
          </button>

          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 mb-4 sm:mb-0">
            <div className="flex items-center gap-2 sm:gap-3 order-2 sm:order-1">
              <Image
                src={Img}
                alt="face_img"
                loading="lazy"
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
              <h2 className="font-jakarta text-[#1A1A1A] text-sm sm:text-[16px] lg:text-[18px] hidden sm:block">
                Okuwdi Goodness
              </h2>
            </div>
            <div className="order-1 sm:order-2">
              <Image
                src={Ring}
                alt="bell"
                loading="lazy"
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-[#F5F5F5] flex-1 px-4 sm:px-6 lg:px-[32px] py-4 sm:py-6 lg:py-[31px]">
          {/* Welcome Section */}
          <div className="mb-6 sm:mb-[24px]">
            <div className="font-jakarta mb-4 sm:mb-[14px]">
              <h2 className="text-lg sm:text-xl lg:text-[20px] font-semibold">
                Hey Goodness
              </h2>
              <p className="text-sm sm:text-base lg:text-[16px] text-gray-600">
                How are you doing today
              </p>
            </div>

            {/* Card */}
            <div>
              <Card />
            </div>
          </div>

          {/* Table Section */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-3">
              <h1 className="text-lg sm:text-xl lg:text-[20px] font-jakarta font-semibold text-[#4D4D4D]">
                Recent Activity
              </h1>

              <div className="relative w-full sm:w-auto">
                <Input
                  className="bg-white w-full sm:w-[250px] lg:w-[300px] pl-10 pr-4 py-2 text-sm sm:text-base"
                  placeholder="Search..."
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 sm:size-5 text-[#525866]" />
              </div>
            </div>

            {/* Table Navigation */}
            <div className="bg-white rounded-[8px] px-2 sm:px-4 lg:px-6 py-2 flex flex-wrap justify-center sm:justify-between items-center gap-1 sm:gap-2 mb-3 sm:mb-2 overflow-x-auto">
              {TableLink.map((link, idx) => (
                <Link
                  href={link.href}
                  key={idx}
                  className={`px-3 sm:px-[20px] py-2 sm:py-[7px] font-sans text-xs sm:text-sm whitespace-nowrap ${
                    pathname === link.href ? active : "text-[#808080]"
                  }`}
                >
                  {link.text}
                </Link>
              ))}
            </div>

            {/* Table Component */}
            <div className="overflow-x-auto">
              <PrescriptionTable />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
