"use client";

interface TabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
export default function TabBar({ activeTab, setActiveTab }: TabBarProps) {
  const active = "text-[#03B156] border-b-2 border-[#03B156]";
  const TableLink = ["All", "Recents", "Booked"];
  return (
    <div className="bg-white rounded-[8px] px-2 sm:px-4 lg:px-6 py-2 flex flex-wrap justify-between items-center gap-1 sm:gap-2 mb-3 sm:mb-2 overflow-x-auto mt-2">
      {TableLink.map((tab, idx) => (
        <button
          key={idx}
          onClick={() => setActiveTab(tab)}
          className={`px-3 sm:px-[20px] py-2 sm:py-[7px] font-sans text-xs sm:text-sm whitespace-nowrap ${
            activeTab === tab ? active : "text-[#808080]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
