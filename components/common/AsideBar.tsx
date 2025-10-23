"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/logo.svg";
import {
  LayoutDashboard,
  StethoscopeIcon,
  HeartPlus,
  Wallet,
  UserCircle2,
  LogOut,
} from "lucide-react";

const Navlinks = [
  { text: "Dashboard", href: "/dashboard", img: LayoutDashboard },
  { text: "Doctor", href: "/dashboard/doctor", img: StethoscopeIcon },
  { text: "Pharmacist", href: "/dashboard/pharmacy", img: HeartPlus },
  { text: "Wallet", href: "/dashboard/wallet", img: Wallet },
  { text: "Profile", href: "/dashboard/profile", img: UserCircle2 },
];

const AsideBar = ({ onNavigate }: { onNavigate?: () => void }) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // 👈 prevents SSR mismatch

  const active =
    "bg-[#03B156] drop-shadow-2xs shadow-[#375DFB14] rounded-[10px] text-white";

  return (
    <div className="flex flex-col py-[54px] px-[23px] h-full justify-between">
      <div className="space-y-[31px]">
        <Image src={Logo} alt="logo" loading="lazy" />
        <ul className="flex flex-col gap-3">
          {Navlinks.map((link, idx) => {
            const Icon = link.img;
            const isActive =
              pathname === link.href ||
              (pathname.startsWith(link.href + "/") &&
                link.href !== "/dashboard");

            return (
              <Link
                href={link.href}
                onClick={onNavigate}
                key={idx}
                className={`flex items-center gap-2 py-[10px] px-[24px] ${
                  isActive ? active : ""
                }`}
              >
                <Icon size={20} />
                <h3 className="font-sans">{link.text}</h3>
              </Link>
            );
          })}
        </ul>
      </div>

      <Link href="/" className="flex items-center gap-1 py-[10px] px-[24px]">
        <LogOut /> Logout
      </Link>
    </div>
  );
};

export default AsideBar;
