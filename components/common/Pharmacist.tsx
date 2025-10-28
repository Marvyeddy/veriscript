"use client";

import React, { useState } from "react";
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

const PharmacistRegisterForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: "",
    dob: "",
    email: "",
    location: "",
    gender: "",
    area_of_expertise: "",
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

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Pharmacist Registration Data:", formData);
    alert("Registration complete!");
    router.push("/dashboard");
  };

  return (
    <section className="relative">
      <div className="font-jakarta absolute right-3 top-[20px] text-[#080808]">
        {step} of 2
      </div>

      <div className="lg:pr-12">
        {/* Back Button */}
        {step === 1 ? (
          <button
            className="flex items-center gap-2 cursor-pointer mb-6"
            onClick={() => router.back()}
          >
            <ArrowLeft size={20} />
            Back
          </button>
        ) : (
          <button
            className="flex items-center gap-2 cursor-pointer mb-6"
            onClick={handleBack}
          >
            <ArrowLeft size={20} />
            Back
          </button>
        )}

        {/* Logo */}
        <Image src={Logo} alt="logo" loading="lazy" />

        {/* Header */}
        <div className="mt-[31px] mb-[24px] font-jakarta">
          <h1 className="text-[32px] font-semibold leading-[107%]">
            Pharmacist Registration
          </h1>
          <p className="font-semibold text-[16px] text-[#808080] mt-3">
            {step === 1
              ? "Please fill in your personal details"
              : "Add your professional details to complete registration"}
          </p>
        </div>

        {/* ==================== FORM ==================== */}
        <form
          className="space-y-6"
          onSubmit={step === 1 ? handleNext : handleSubmit}
        >
          {step === 1 && (
            <>
              {/* FULL NAME */}
              <div>
                <label
                  htmlFor="full_name"
                  className="text-[#0A0D14] font-medium"
                >
                  Full Name{" "}
                  <Image
                    src={info_dis}
                    alt="info-dis"
                    loading="lazy"
                    className="inline-block ml-1"
                  />
                </label>
                <div className="relative flex items-center lg:w-[528px] mt-[4px]">
                  <Image
                    src={Profile}
                    alt="profile"
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                  />
                  <Input
                    id="full_name"
                    name="full_name"
                    placeholder="Pharm. Jane Doe"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="flex-1 pl-[38px] pr-[38px] border border-[#E2E4E9] rounded-md"
                  />
                  <Image
                    src={info}
                    alt="info"
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
                    src={Calendar}
                    alt="calendar"
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                  />
                  <Input
                    required
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
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
                    src={Email}
                    alt="email"
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                  />
                  <Input
                    required
                    id="email"
                    name="email"
                    type="email"
                    placeholder="pharmacist@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="flex-1 pl-[38px] pr-[38px] border border-[#E2E4E9] rounded-md"
                  />
                </div>
              </div>

              {/* LOCATION */}
              <div>
                <label
                  htmlFor="location"
                  className="text-[#0A0D14] font-medium"
                >
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center lg:w-[528px] mt-[4px]">
                  <Image
                    src={Location}
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
                  onValueChange={(val) =>
                    setFormData({ ...formData, gender: val })
                  }
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

              {/* CONTINUE BUTTON */}
              <Button
                variants="default"
                type="submit"
                className="w-full flex gap-2 items-center justify-center"
              >
                Continue
                <ChevronRight size={20} />
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              {/* AREA OF EXPERTISE */}
              <div>
                <label
                  htmlFor="area_of_expertise"
                  className="text-[#0A0D14] font-medium"
                >
                  Area of Expertise <span className="text-red-500">*</span>
                </label>
                <Input
                  required
                  id="area_of_expertise"
                  name="area_of_expertise"
                  placeholder="e.g. Clinical Pharmacology, Community Pharmacy"
                  value={formData.area_of_expertise}
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
                <label
                  htmlFor="password"
                  className="text-[#0A0D14] font-medium"
                >
                  Create Password <span className="text-red-500">*</span>
                </label>
                <Input
                  required
                  type="password"
                  id="password"
                  name="password"
                  placeholder="********"
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
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="lg:w-[528px] border border-[#E2E4E9] rounded-md"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <Button
                variants="default"
                type="submit"
                className="w-full flex gap-2 items-center justify-center"
              >
                Submit
                <ChevronRight size={20} />
              </Button>
            </>
          )}
        </form>

        {/* FOOTER */}
        <p className="text-[#35C178] mt-[31px]">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-purple-500 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default PharmacistRegisterForm;
