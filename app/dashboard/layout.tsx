// app/dashboard/layout.tsx
"use client";

import AsideBar from "@/components/common/AsideBar";
import { type ReactNode, useState } from "react";
import { Menu, X, MapPin } from "lucide-react";
import Image from "next/image";
import Down from "@/public/assets/CaretDown_black.svg";
import Ring from "@/public/assets/Bell.svg";
import { useAuth } from "@/hooks/use-auth";
import { useUserLocation } from "@/hooks/use-user-location";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { displayName, isLoading: authLoading } = useAuth();
  const { location, isLoading: locationLoading } = useUserLocation();

  const handleNavigate = () => {
    if (window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const showAuthLoading = typeof window !== "undefined" && authLoading;
  const showLocationLoading = typeof window !== "undefined" && locationLoading;

  return (
    <div className="flex min-h-screen">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-white bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
        `}
      >
        <AsideBar onNavigate={handleNavigate} />
      </div>

      <div className="flex-1 lg:ml-0 w-full min-h-screen flex flex-col">
        <header className="flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 lg:px-[32px] gap-3 sm:gap-0 bg-white">
            <button className="flex items-center justify-center sm:justify-start gap-2 py-3 px-4 sm:py-[12px] sm:px-[14px] rounded-[10px] bg-[#F5F5F5] my-4 sm:my-[23px] cursor-pointer w-full sm:w-auto hover:bg-[#EEEEEE] transition-colors">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#4D4D4D] flex-shrink-0" />
              <h3 className="truncate text-sm sm:text-base lg:text-lg font-medium text-[#4D4D4D]">
                {showLocationLoading
                  ? "Finding your location..."
                  : location?.address || "Location unavailable"}
              </h3>
              <Image
                src={Down || "/placeholder.svg"}
                alt="down arrow"
                loading="lazy"
                className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
              />
            </button>

            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 mb-4 sm:mb-0">
              <div className="flex items-center gap-2 sm:gap-3 order-2 sm:order-1">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#03B156] to-[#02854a] flex items-center justify-center text-white font-bold text-sm">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <h2 className="font-jakarta text-[#1A1A1A] text-sm sm:text-[16px] lg:text-[18px] hidden sm:block truncate">
                  {authLoading ? "Loading..." : displayName}
                </h2>
              </div>
              <div className="order-1 sm:order-2">
                <Image
                  src={Ring || "/placeholder.svg"}
                  alt="bell"
                  loading="lazy"
                  className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:opacity-80 transition-opacity"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-[#F5F5F5] h-full">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;