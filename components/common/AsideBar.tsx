"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/logo.svg";
import {
  LayoutDashboard,
  StethoscopeIcon,
  HeartPulse,
  Wallet,
  UserCircle2,
  LogOut,
} from "lucide-react";
import { useLogout } from "@/hooks/use-auth";

const Navlinks = [
  { text: "Dashboard", href: "/dashboard", img: LayoutDashboard },
  { text: "Doctor", href: "/dashboard/doctor", img: StethoscopeIcon },
  { text: "Pharmacist", href: "/dashboard/pharmacy", img: HeartPulse },
  { text: "Wallet", href: "/dashboard/wallet", img: Wallet },
  { text: "Profile", href: "/dashboard/profile", img: UserCircle2 },
];

const AsideBar = ({ onNavigate }: { onNavigate?: () => void }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const logout = useLogout();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // 👈 prevents SSR mismatch

  const handleLogout = async () => {
    await logout();
    router.push("/onboarding/signin");
  };

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

      <button
        onClick={handleLogout}
        className="flex items-center gap-1 py-[10px] px-[24px] hover:opacity-80 transition-opacity w-full text-left"
      >
        <LogOut size={20} /> <h3 className="font-sans">Logout</h3>
      </button>
    </div>
  );
};

export default AsideBar;
