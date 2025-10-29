"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/logo.svg";
import Profile from "@/public/assets/profile.svg";
import Calendar from "@/public/assets/calendar.svg";
import Location from "@/public/assets/location.svg";
import Email from "@/public/assets/mail.svg";
import info_dis from "@/public/assets/info_dis.svg";
import info from "@/public/assets/info.svg";
import { ArrowLeft, ChevronRight, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useRegister } from "@/hooks/use-auth";
import { Spinner } from "@/components/ui/spinner";

const DoctorRegisterForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const registerMutation = useRegister();

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    location: "",
    gender: "",
    specialization: "",
    license: null as File | null,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.password || formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      await registerMutation.mutateAsync({
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth,
        email: formData.email,
        location: formData.location,
        gender: formData.gender,
        password: formData.password,
        userType: "doctor",
      });

      toast({
        title: "Registration Successful",
        description:
          "Your account will be verified soon. Please check back later.",
        variant: "default",
      });
      router.push("/onboarding/signin");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "Registration failed",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="relative">
      <div className="lg:pr-12">
        {/* Back Button */}
        <button
          className="flex items-center gap-2 cursor-pointer mb-6"
          onClick={() => router.back()}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Logo */}
        <Image src={Logo || "/placeholder.svg"} alt="logo" loading="lazy" />

        {/* Header */}
        <div className="mt-[31px] mb-[24px] font-jakarta">
          <h1 className="text-[32px] font-semibold leading-[107%]">
            Doctor Registration
          </h1>
          <p className="font-semibold text-[16px] text-[#808080] mt-3">
            Please fill in your personal and professional details
          </p>
        </div>

        {/* ==================== FORM ==================== */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* FULL NAME */}
          <div>
            <label htmlFor="fullName" className="text-[#0A0D14] font-medium">
              Full Name{" "}
              <Image
                src={info_dis || "/placeholder.svg"}
                alt="info-dis"
                loading="lazy"
                className="inline-block ml-1"
              />
            </label>
            <div className="relative flex items-center lg:w-[528px] mt-[4px]">
              <Image
                src={Profile || "/placeholder.svg"}
                alt="profile"
                className="absolute left-3 top-1/2 -translate-y-1/2"
              />
              <Input
                id="fullName"
                name="fullName"
                placeholder="Dr. John Doe"
                value={formData.fullName}
                onChange={handleChange}
                className="flex-1 pl-[38px] pr-[38px] border border-[#E2E4E9] rounded-md"
              />
              <Image
                src={info || "/placeholder.svg"}
                alt="info"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          {/* DATE OF BIRTH */}
          <div>
            <label htmlFor="dateOfBirth" className="text-[#0A0D14] font-medium">
              Date of Birth <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center lg:w-[528px] mt-[4px]">
              <Image
                src={Calendar || "/placeholder.svg"}
                alt="calendar"
                className="absolute left-3 top-1/2 -translate-y-1/2"
              />
              <Input
                required
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="flex-1 pl-[38px] pr-[38px] border border-[#E2E4E9] rounded-md"
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
                className="absolute left-3 top-1/2 -translate-y-1/2"
              />
              <Input
                required
                id="email"
                name="email"
                type="email"
                placeholder="doctor@example.com"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 pl-[38px] pr-[38px] border border-[#E2E4E9] rounded-md"
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
                className="absolute left-3 top-1/2 -translate-y-1/2"
              />
              <Input
                required
                id="location"
                name="location"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleChange}
                className="flex-1 pl-[38px] pr-[38px] border border-[#E2E4E9] rounded-md"
              />
            </div>
          </div>

          {/* GENDER */}
          <div>
            <label htmlFor="gender" className="text-[#0A0D14] font-medium">
              Gender <span className="text-red-500">*</span>
            </label>
            <RadioGroup
              name="gender"
              className="flex gap-6 font-sans mt-2"
              value={formData.gender}
              onValueChange={(val) => setFormData({ ...formData, gender: val })}
            >
              <div className="flex items-center space-x-2 cursor-pointer">
                <RadioGroupItem
                  value="male"
                  id="male"
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <h2>Male</h2>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <RadioGroupItem
                  value="female"
                  id="female"
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                />
                <h2>Female</h2>
              </div>
            </RadioGroup>
          </div>

          {/* SPECIALIZATION */}
          <div>
            <label
              htmlFor="specialization"
              className="text-[#0A0D14] font-medium"
            >
              Specialization <span className="text-red-500">*</span>
            </label>
            <Input
              required
              id="specialization"
              name="specialization"
              placeholder="e.g. Cardiologist, Pediatrician"
              value={formData.specialization}
              onChange={handleChange}
              className="lg:w-[528px] border border-[#E2E4E9] rounded-md"
            />
          </div>

          {/* LICENSE UPLOAD */}
          <div>
            <label htmlFor="license" className="text-[#0A0D14] font-medium">
              Upload License <span className="text-red-500">*</span>
            </label>
            <div className="mt-2 flex flex-col lg:w-[528px]">
              <label
                htmlFor="license"
                className="border border-dashed border-[#00B155] rounded-md py-4 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload size={20} />
                <span>
                  {formData.license
                    ? formData.license.name
                    : "Click to upload license"}
                </span>
              </label>
              <input
                type="file"
                id="license"
                name="license"
                accept=".pdf,.jpg,.png"
                onChange={handleChange}
                className="hidden"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label htmlFor="password" className="text-[#0A0D14] font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <Input
              required
              id="password"
              name="password"
              type="password"
              placeholder="Enter a secure password"
              value={formData.password}
              onChange={handleChange}
              className="lg:w-[528px] border border-[#E2E4E9] rounded-md"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="text-[#0A0D14] font-medium"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <Input
              required
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="lg:w-[528px] border border-[#E2E4E9] rounded-md"
            />
          </div>

          {/* REGISTER BUTTON */}
          <Button
            variants="default"
            type="submit"
            className="w-full flex gap-2 items-center justify-center"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? (
              <>
                <Spinner />
                Registering...
              </>
            ) : (
              <>
                Register
                <ChevronRight size={20} />
              </>
            )}
          </Button>
        </form>

        {/* FOOTER */}
        <p className="text-[#35C178] mt-[31px]">
          Already have an account?{" "}
          <Link
            href={"/onboarding/signin"}
            className="text-purple-500 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default DoctorRegisterForm;
