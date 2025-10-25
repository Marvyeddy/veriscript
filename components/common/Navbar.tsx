"use client";

import Image from "next/image";
import React from "react";
import Logo from "@/public/assets/logo.svg";
import Down from "@/public/assets/CaretDown.svg";
import Link from "next/link";
import Button from "../ui/Button";
import { useMobile } from "@/hooks/useMobile";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const isMobile = useMobile();
  const router = useRouter();
  return (
    <nav className="flex items-center justify-between max-w-[1146px] mx-auto border-2 border-[#E6F7EE] py-[29px] min-md:px-[32px] px-4 min-md:mt-[41px] mt-6 rounded-xl">
      <div>
        <Image src={Logo} alt="logo" loading="lazy" />
      </div>

      {isMobile ? (
        <Menu />
      ) : (
        <ul className="font-sans flex items-center gap-[30px] max-md:hidden">
          <li>
            <Link href={"/"}>How it works</Link>
          </li>
          <li className="flex items-center gap-1">
            <Link href={"/"}>Industries</Link>
            <Image src={Down} alt="drop-down" loading="lazy" />
          </li>
          <li>
            <Link href={"/"}>Pricing</Link>
          </li>

          <Button variants="default" onClick={() => router.push("/onboarding")}>
            Get started
          </Button>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
