"use client"
import Card from "@/components/common/Card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import PrescriptionTable from "@/components/common/Table"
import { LocationPermissionBanner } from "@/components/common/LocationPermissionBanner"
import { useCurrentUser } from "@/hooks/use-auth"

const TableLink = [
  { text: "All", href: "/dashboard" },
  { text: "Recent", href: "/recent" },
  { text: "Active", href: "/active" },
  { text: "Pending", href: "/pending" },
]

const Dashboard = () => {
  const pathname = usePathname()
  const active = "text-[#03B156] border-b-2 border-[#03B156]"
  const { data: user } = useCurrentUser()

  return (
    <div className="px-4 sm:px-6  py-4 sm:py-6 lg:py-[31px] h-full border">
      {/* Scrollable area (adjust 100px to match your header height) */}
      <div className="font-jakarta overflow-y-auto pb-10">
        <LocationPermissionBanner />

        {/* Greeting + Card Section */}
        <div className="mb-6 sm:mb-[24px]">
          <div className="mb-4 sm:mb-[14px]">
            <h2 className="text-lg sm:text-xl lg:text-[20px] font-semibold">Hey {user?.fullName || "there"}</h2>
            <p className="text-sm sm:text-base lg:text-[16px] text-gray-600">How are you doing today</p>
          </div>

          <Card />
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
            <PrescriptionTable userId={user?.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
