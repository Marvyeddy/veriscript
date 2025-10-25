"use client";

import Image from "next/image";
import React, { FormEvent } from "react";
import Logo from "@/public/assets/logo.svg";
import Patient from "@/public/assets/patient.svg";
import Medical from "@/public/assets/pharmacist.svg";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Button from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const profile = [
  {
    id: "patient",
    text: "Patient",
    img: Patient,
  },
  {
    id: "pharmacist",
    text: "Pharmacist",
    img: Medical,
  },
  {
    id: "doctor",
    text: "Doctor",
    img: Medical,
  },
];

const Onboarding = () => {
  const router = useRouter();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    router.push("/onboarding/register");
  }
  return (
    <section className="relative">
      <div>
        <Image src={Logo} alt="logo" loading="lazy" />

        <div className="mt-[31px] mb-[24px] font-jakarta">
          <h1 className="text-[32px] font-semibold leading-[107%] ">
            Hello ✨ <br /> Welcome to Veriscript
          </h1>

          <p className="font-semibold text-[16px] text-[#808080]">
            Which of these perfectly describes you.
          </p>
        </div>

        <form onSubmit={onSubmit}>
          <RadioGroup
            name="profile"
            className="flex gap-4 max-md:flex-col"
            required
          >
            {profile.map((item) => (
              <label
                key={item.id}
                htmlFor={item.id}
                className="flex gap-3 cursor-pointer border-2 w-[168px] py-[9px] px-[10px] rounded-[13px] "
              >
                <RadioGroupItem
                  id={item.id}
                  value={item.id}
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 rounded-full"
                />
                <div className="text-center w-fit">
                  <Image src={item.img} alt={item.id} loading="lazy" />
                  <p className="text-xs font-jakarta text-[#808080] font-semibold">
                    {item.text}
                  </p>
                </div>
              </label>
            ))}
          </RadioGroup>

          <Button
            variants="default"
            className="flex w-fit items-center mt-8"
            type="submit"
          >
            <span className="text-xs">Continue</span>
            <ChevronRight size={15} />
          </Button>
        </form>

        <p className="text-[#35C178] mt-[31px]">
          Already have an account?{" "}
          <Link
            href={"/"}
            className="text-purple-500 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Onboarding;
