"use client"

import { Search } from "lucide-react"
import TabBar from "@/components/common/TabBar"
import { useState } from "react"
import Image from "next/image"
import Map from "@/public/assets/MapPin.svg"
import hbar_bar from "@/public/assets/hbar_dark.svg"
import Button from "@/components/ui/Button"
import { MoveDownRight } from "lucide-react"
import { Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { useDoctors } from "@/hooks/use-doctors"
import { LoadingState } from "@/components/common/LoadingState"
import { ErrorState } from "@/components/common/ErrorState"
import { EmptyState } from "@/components/common/EmptyState"

const DoctorPage = () => {
  const [activeTab, setActiveTab] = useState<string>("All")
  const router = useRouter()

  const { data: doctors = [], isLoading, error, refetch } = useDoctors()
  const [bookedDoctors, setBookedDoctors] = useState<Set<number>>(new Set())

  const handleBookDoctor = (id: number) => {
    setBookedDoctors((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const filteredDoctors =
    activeTab === "All"
      ? doctors
      : activeTab === "Booked"
        ? doctors.filter((doc) => bookedDoctors.has(doc.id))
        : doctors.filter((doc) => !bookedDoctors.has(doc.id))

  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-[32px] py-4 sm:py-6 lg:py-[31px]">
        <LoadingState message="Loading doctors..." fullHeight />
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 sm:px-6 lg:px-[32px] py-4 sm:py-6 lg:py-[31px]">
        <ErrorState
          title="Failed to Load Doctors"
          message="Unable to fetch doctors. Please check your connection and try again."
          onRetry={() => refetch()}
          fullHeight
        />
      </div>
    )
  }

  return (
    <div className=" px-4 sm:px-6 lg:px-[32px] py-4 sm:py-6 lg:py-[31px]">
      <div className="w-full flex justify-between items-center py-[8px] ">
        <h1 className="font-jakarta font-semibold leading-snug ">Doctors</h1>
        <Button variants="default" className="w-fit flex items-center justify-between gap-2">
          <Search size={15} />
          <h2 className="font-bold text-sm font-jakarta">Find Doctors</h2>
        </Button>
      </div>

      {/* tabar */}
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* doctors online  */}
      <div className="min-h-screen lg:py-5 px-3.5 rounded-lg w-full flex flex-col gap-4 ">
        {filteredDoctors.length === 0 ? (
          <EmptyState
            title="No Doctors Available"
            message="No doctors are currently available. Please try again later."
          />
        ) : (
          filteredDoctors.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                handleBookDoctor(item.id)
                router.push(`/dashboard/doctor/${item.doctorId}`)
              }}
              className=" relative w-full flex md:flex-row flex-col items-center justify-between border-b border-gray-100 last:border-none pb-3  bg-white px-3 py-5 md:py-2 gap-4 md:gap-0 cursor-pointer hover:scale-105 duration-200 transition-all ease-in-out"
            >
              {/* Left side: Doctor info */}
              <div className="flex items-center lg:gap-7 lg:w-1/2 w-full gap-2 ">
                <div>
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} width={64} height={64} />
                </div>

                <div className="flex flex-col lg:gap-2.5 gap-0">
                  <h1 className="font-semibold text-[#4D4D4D]">{item.name}</h1>

                  <h2 className="font-bold text-sm font-jakarta leading-tight">
                    {item.type} Doctor ID: <span className="font-medium text-[#808080]">{item.doctorId}</span>
                  </h2>

                  <div className="flex items-center gap-2">
                    <Image src={Map || "/placeholder.svg"} alt="map" width={16} height={16} />
                    <span>{item.distance}</span>
                  </div>
                </div>
              </div>

              {/* Right side: Fee & Rating */}
              <div className="w-1/2 flex flex-col gap-0  md:gap-2.5 items-start">
                <h1 className="text-[#808080] font-medium font-jakarta">Fee:</h1>

                <div className="flex items-center gap-1">
                  <Image src={hbar_bar || "/placeholder.svg"} alt="hbar_bar" width={20} height={20} />
                  <h2 className="font-jakarta font-bold">
                    {item.fee} {item.currency}
                  </h2>
                </div>

                <div className="text-white py-1 px-2 rounded-xl bg-[#03B156] w-fit flex items-center gap-2">
                  <Star size={14} /> {item.rating}
                </div>
              </div>
              {/* doctor is booked for an appointment  */}

              {bookedDoctors.has(item.id) && (
                <div>
                  <div className="absolute top-1/2  right-8 text-black border-2 border-[#03B156] ">
                    <MoveDownRight size={25} />
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default DoctorPage
