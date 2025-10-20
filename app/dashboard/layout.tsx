"use client";

import AsideBar from "@/components/common/AsideBar";
import React, { ReactNode, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Map from "@/public/assets/MapPin.svg";
import Down from "@/public/assets/CaretDown_black.svg";
import Img from "@/public/assets/face.svg";
import Ring from "@/public/assets/Bell.svg";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-white bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-40
        transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
      `}
      >
        <AsideBar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-0 w-full min-h-screen flex flex-col">
        {/* Fixed Header */}
        <header className="flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 lg:px-[32px] gap-3 sm:gap-0 bg-white">
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
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-auto bg-[#F5F5F5] h-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
