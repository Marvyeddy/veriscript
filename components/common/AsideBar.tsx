"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Logo from "@/public/assets/logo.svg"
import {
  LayoutDashboard,
  StethoscopeIcon,
  HeartPulse,
  Wallet,
  UserCircle2,
  LogOut,
  ShieldCheck,
  Pill,
  Users,
} from "lucide-react"
import { useLogout, useAuth } from "@/hooks/use-auth"

const PatientNavlinks = [
  { text: "Dashboard", href: "/dashboard", img: LayoutDashboard },
  { text: "Find Doctor", href: "/dashboard/doctor", img: StethoscopeIcon },
  { text: "Find Pharmacy", href: "/dashboard/pharmacy", img: HeartPulse },
  { text: "Wallet", href: "/dashboard/wallet", img: Wallet },
  { text: "Profile", href: "/dashboard/profile", img: UserCircle2 },
]

const DoctorNavlinks = [
  { text: "Doctor Portal", href: "/dashboard/doctor-portal", img: StethoscopeIcon },
  { text: "Profile", href: "/dashboard/profile", img: UserCircle2 },
  { text: "Wallet", href: "/dashboard/wallet", img: Wallet },
]

const PharmacistNavlinks = [
  { text: "Pharmacy Portal", href: "/dashboard/pharmacy-portal", img: Pill },
  { text: "Profile", href: "/dashboard/profile", img: UserCircle2 },
  { text: "Wallet", href: "/dashboard/wallet", img: Wallet },
]

const AdminNavlinks = [
  { text: "Admin Dashboard", href: "/dashboard/admin", img: ShieldCheck },
  { text: "Users", href: "/dashboard/admin/users", img: Users },
  { text: "Profile", href: "/dashboard/profile", img: UserCircle2 },
]

const AsideBar = ({ onNavigate }: { onNavigate?: () => void }) => {
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const logout = useLogout()
  const { user } = useAuth()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const handleLogout = async () => {
    await logout()
    router.push("/onboarding/signin")
  }

  const getNavLinks = () => {
    switch (user?.userType) {
      case "doctor":
        return DoctorNavlinks
      case "pharmacist":
        return PharmacistNavlinks
      case "admin":
        return AdminNavlinks
      default:
        return PatientNavlinks
    }
  }

  const Navlinks = getNavLinks()

  const active = "bg-[#03B156] drop-shadow-2xs shadow-[#375DFB14] rounded-[10px] text-white"

  return (
    <div className="flex flex-col py-[54px] px-[23px] h-full justify-between">
      <div className="space-y-[31px]">
        <Image src={Logo || "/placeholder.svg"} alt="logo" loading="lazy" />
        <ul className="flex flex-col gap-3">
          {Navlinks.map((link, idx) => {
            const Icon = link.img
            const isActive =
              pathname === link.href || (pathname.startsWith(link.href + "/") && link.href !== "/dashboard")

            return (
              <Link
                href={link.href}
                onClick={onNavigate}
                key={idx}
                className={`flex items-center gap-2 py-[10px] px-[24px] ${isActive ? active : ""}`}
              >
                <Icon size={20} />
                <h3 className="font-sans">{link.text}</h3>
              </Link>
            )
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
  )
}

export default AsideBar
