"use client"

import Image from "next/image"
import { type FormEvent, useState } from "react"
import Logo from "@/public/assets/logo.svg"
import Patient from "@/public/assets/patient.svg"
import Pharmacist from "@/public/assets/pharmacist.svg"
import Doctor from "@/public/assets/pharmacist.svg"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Button from "@/components/ui/Button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const profile = [
  {
    id: "patient",
    text: "Patient",
    img: Patient,
  },
  {
    id: "pharmacist",
    text: "Pharmacist",
    img: Pharmacist,
  },
  {
    id: "doctor",
    text: "Doctor",
    img: Doctor,
  },
]

const Onboarding = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedProfile, setSelectedProfile] = useState<string>("")

  function onSubmit(e: FormEvent) {
    e.preventDefault()

    if (!selectedProfile) {
      toast({
        title: "Profile Required",
        description: "Please select a profile type before continuing.",
        variant: "destructive",
      })
      return
    }

    switch (selectedProfile) {
      case "patient":
        router.push("/onboarding/register")
        break
      case "doctor":
        router.push("/onboarding/doctorRegister")
        break
      case "pharmacist":
        router.push("/onboarding/pharmacistRegister")
        break
      default:
        router.push("/onboarding")
        break
    }
  }

  return (
    <section className="relative w-full">
      <div className="w-full">
        <Image src={Logo || "/placeholder.svg"} alt="logo" loading="lazy" className="w-auto h-auto" />

        <div className="mt-6 sm:mt-[31px] mb-4 sm:mb-[24px] font-jakarta">
          <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold leading-[107%]">
            Hello ✨ <br /> Welcome to Veriscript
          </h1>

          <p className="font-semibold text-sm sm:text-base text-[#808080] mt-2">
            Which of these perfectly describes you.
          </p>
        </div>

        <form onSubmit={onSubmit}>
          <RadioGroup
            name="profile"
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            value={selectedProfile}
            onValueChange={(val) => setSelectedProfile(val)}
            required
          >
            {profile.map((item) => (
              <label
                key={item.id}
                htmlFor={item.id}
                className={`flex gap-3 cursor-pointer border-2 w-full sm:w-[168px] py-2 sm:py-[9px] px-3 sm:px-[10px] rounded-[13px] transition-all ${
                  selectedProfile === item.id ? "border-[#00B155] bg-green-50" : "border-gray-200"
                }`}
              >
                <RadioGroupItem
                  id={item.id}
                  value={item.id}
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 rounded-full"
                />
                <div className="text-center w-fit">
                  <Image src={item.img || "/placeholder.svg"} alt={item.id} loading="lazy" />
                  <p className="text-xs font-jakarta text-[#808080] font-semibold">{item.text}</p>
                </div>
              </label>
            ))}
          </RadioGroup>

          <Button
            variants="default"
            className="flex w-full sm:w-fit items-center justify-center sm:justify-start mt-6 sm:mt-8"
            type="submit"
          >
            <span className="text-xs">Continue</span>
            <ChevronRight size={15} />
          </Button>
        </form>

        <p className="text-[#35C178] mt-6 sm:mt-[31px] text-center sm:text-left">
          Already have an account?{" "}
          <Link href="/onboarding/signin" className="text-purple-500 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Onboarding
