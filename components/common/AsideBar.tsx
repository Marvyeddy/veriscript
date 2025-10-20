"use client";

import Image from "next/image";
import React from "react";
import Logo from "@/public/assets/logo.svg";
import {
  BriefcaseMedical,
  HeartPlus,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  StethoscopeIcon,
  UserCircle2,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavlinkProps = {
  text: string;
  href: string;
  img: LucideIcon;
};

const Navlinks: NavlinkProps[] = [
  {
    text: "Dashboard",
    href: "/dashboard",
    img: LayoutDashboard,
  },
  {
    text: "Doctor",
    href: "/dashboard/doctor",
    img: StethoscopeIcon,
  },
  {
    text: "Patient",
    href: "/dashboard/patient",
    img: HeartPlus,
  },
  {
    text: "Wallet",
    href: "/dashboard/wallet",
    img: Wallet,
  },
  {
    text: "Profile",
    href: "/dashboard/profile",
    img: UserCircle2,
  },
];

const AsideBar = () => {
  const pathname = usePathname();
  const active = `bg-[#03B156] drop-shadow-2xs shadow-[#375DFB14] rounded-[10px] text-white`;

  return (
    <div className="flex flex-col justify-between py-[54px] px-[23px] min-h-screen">
      <div className="space-y-[31px]">
        <Image src={Logo} alt="logo" loading="lazy" />

        <ul className="flex flex-col gap-3">
          {Navlinks.map((link, idx) => {
            const Icon = link.img;
            return (
              <Link
                href={link.href}
                key={idx}
                className={`flex items-center gap-2 py-[10px] px-[24px] ${
                  pathname === link.href ? active : ""
                }`}
              >
                <Icon size={20} />
                <h3 className="font-sans">{link.text}</h3>
              </Link>
            );
          })}
        </ul>
      </div>

      <Link href={"/"} className="flex items-center gap-1 py-[10px] px-[24px]">
        <LogOut /> Logout
      </Link>
    </div>
  );
};

export default AsideBar;
