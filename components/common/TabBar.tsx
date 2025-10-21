"use client";
import React, { useState } from "react";

export default function TabBar() {
  const [activeTab, setActTab] = useState<string>("All");

  const active = "text-[#03B156] border-b-2 border-[#03B156]";
  const TableLink = [
    {
      text: "All",
      href: "data",
    },
    {
      text: "Recents",
      href: "/recent",
    },

    {
      text: "Booked",
      href: "/book",
    },
  ];
  return (
    <div className="bg-white rounded-[8px] px-2 sm:px-4 lg:px-6 py-2 flex flex-wrap justify-center sm:justify-between items-center gap-1 sm:gap-2 mb-3 sm:mb-2 overflow-x-auto mt-2">
      {TableLink.map((tab, idx) => (
        <button
          key={idx}
          onClick={() => setActTab(tab.text)}
          className={`px-3 sm:px-[20px] py-2 sm:py-[7px] font-sans text-xs sm:text-sm whitespace-nowrap ${
            activeTab === tab.text ? active : "text-[#808080]"
          }`}
        >
          {tab.text}
        </button>
      ))}
    </div>
  );
}
