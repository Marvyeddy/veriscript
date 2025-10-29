"use client"

import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { type FormEvent, useState } from "react"
import Logo from "@/public/assets/logo.svg"
import Profile from "@/public/assets/profile.svg"
import Calendar from "@/public/assets/calendar.svg"
import Location from "@/public/assets/location.svg"
import Email from "@/public/assets/mail.svg"
import info_dis from "@/public/assets/info_dis.svg"
import info from "@/public/assets/info.svg"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { Input } from "../ui/input"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import Button from "../ui/Button"
import { useRouter } from "next/navigation"
import { useRegister } from "@/hooks/use-auth"
import { Spinner } from "@/components/ui/spinner"
import { useToast } from "@/hooks/use-toast"

const RegisterForm = () => {
  const router = useRouter()
  const registerMutation = useRegister()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    location: "",
    gender: "",
  })
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await registerMutation.mutateAsync({
        ...formData,
        password: "temp-password",
        userType: "patient",
      })
      router.push("/dashboard/profile")
      toast({
        title: "Success",
        description: "Account created! Please upload a profile picture.",
      })
    } catch (err: any) {
      const errorMessage = err?.message || "Registration failed. Please try again."
      setError(errorMessage)
      console.error("[v0] Registration error:", err)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <section className="relative ">
      <div className="lg:pr-12 ">
        {/* Back Button */}
        <button className="flex items-center gap-2 cursor-pointer mb-6" onClick={() => router.back()}>
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Logo */}
        <Image src={Logo || "/placeholder.svg"} alt="logo" loading="lazy" />

        {/* Header */}
        <div className="mt-[31px] mb-[24px] font-jakarta">
          <h1 className="text-[32px] font-semibold leading-[107%]">Create account</h1>
          <p className="font-semibold text-[16px] text-[#808080] mt-3">Please fill in the required data to proceed</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">{error}</div>
        )}

        {/* ==================== FORM ==================== */}
        <form className="space-y-6" onSubmit={onSubmit}>
          {/* FULL NAME */}
          <div>
            <label htmlFor="full_name" className="text-[#0A0D14] font-medium">
              Full Name <span className="font-normal text-[#525866]">(Optional)</span>
              <Image src={info_dis || "/placeholder.svg"} alt="info-dis" loading="lazy" className="inline-block ml-1" />
            </label>
            <div className="relative flex items-center lg:w-[528px] mt-[4px]">
              <Image
                src={Profile || "/placeholder.svg"}
                alt="profile"
                loading="lazy"
                className="absolute left-3 top-1/2 -translate-y-1/2"
              />
              <Input
                id="full_name"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleInputChange}
                className="flex-1 pl-[38px] pr-[38px] border border-[#E2E4E9] rounded-md"
              />
              <Image
                src={info || "/placeholder.svg"}
                alt="info"
                loading="lazy"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          {/* DATE OF BIRTH */}
          <div>
            <label htmlFor="dob" className="text-[#0A0D14] font-medium">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center lg:w-[528px] mt-[4px]">
              <Image
                src={Calendar || "/placeholder.svg"}
                alt="calendar"
                loading="lazy"
                className="absolute left-3 top-1/2 -translate-y-1/2"
              />
              <Input
                required
                id="dob"
                name="dateOfBirth"
                type="date"
                placeholder="DD/MM/YYYY"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="flex-1 pl-[38px] pr-[38px] border border-[#E2E4E9] rounded-md"
              />
              <Image
                src={info || "/placeholder.svg"}
                alt="info"
                loading="lazy"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="text-[#0A0D14] font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center lg:w-[528px] mt-[4px]">
              <Image
                src={Email || "/placeholder.svg"}
                alt="email"
                loading="lazy"
                className="absolute left-3 top-1/2 -translate-y-1/2"
              />
              <Input
                required
                id="email"
                name="email"
                type="email"
                placeholder="name@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                className="flex-1 pl-[38px] pr-[38px] border border-[#E2E4E9] rounded-md"
              />
              <Image
                src={info || "/placeholder.svg"}
                alt="info"
                loading="lazy"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          {/* LOCATION */}
          <div>
            <label htmlFor="location" className="text-[#0A0D14] font-medium">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center lg:w-[528px] mt-[4px]">
              <Image
                src={Location || "/placeholder.svg"}
                alt="location"
                loading="lazy"
                className="absolute left-3 top-1/2 -translate-y-1/2"
              />
              <Input
                required
                id="location"
                name="location"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleInputChange}
                className="flex-1 pl-[38px] pr-[38px] border border-[#E2E4E9] rounded-md"
              />
              <Image
                src={info || "/placeholder.svg"}
                alt="info"
                loading="lazy"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          {/* GENDER */}
          <div>
            <label htmlFor="gender" className="text-[#0A0D14] font-medium">
              Gender <span className="text-red-500">*</span>
            </label>
            <RadioGroup
              required
              name="gender"
              value={formData.gender}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
              className="flex gap-6 font-sans mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="male"
                  id="male"
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <h2>Male</h2>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="female"
                  id="female"
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <h2>Female</h2>
              </div>
            </RadioGroup>
          </div>

          {/* SUBMIT BUTTON */}
          <Button
            variants="default"
            className="w-full flex gap-2 items-center justify-center"
            type="submit"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? (
              <>
                <Spinner />
                Registering...
              </>
            ) : (
              <>
                Continue
                <ChevronRight size={20} />
              </>
            )}
          </Button>
        </form>

        {/* FOOTER */}
        <p className="text-[#35C178] mt-[31px]">
          Already have an account?{" "}
          <Link href="/" className="text-purple-500 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  )
}

export default RegisterForm
