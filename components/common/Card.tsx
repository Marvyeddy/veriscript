"use client";

import { useEffect, useState } from "react";
import Wallet from "@/public/assets/Wallet.svg";
import Aid from "@/public/assets/FirstAidKit.svg";
import Pharm from "@/public/assets/Prescription.svg";
import Hbar from "@/public/assets/hbar_white.svg";
import V1 from "@/public/assets/Vector-1.svg";
import V2 from "@/public/assets/Vector.svg";
import Image from "next/image";

interface DashboardStats {
  walletBalance: string;
  doctorCount: number;
  pharmacyCount: number;
}

const Card = () => {
  const [stats, setStats] = useState<DashboardStats>({
    walletBalance: "0.00",
    doctorCount: 0,
    pharmacyCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/dashboard/stats");

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();

      if (!data.success || !data.data) {
        throw new Error(data.error || "Invalid response format");
      }

      setStats(data.data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load dashboard data";
      console.error("[v0] Dashboard stats error:", message);
      setError(message);
      // Set default values on error so UI doesn't break
      setStats({
        walletBalance: "0.00",
        doctorCount: 0,
        pharmacyCount: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center flex-wrap gap-[16px]">
      {/* Wallet Card */}
      <div className="w-full md:w-[321px] py-[23px] px-[21px] rounded-[12px] flex flex-col gap-[38px] bg-gradient-to-tl from-[#004B24] via-[#00B155] to-[#00B155] relative overflow-hidden">
        <div className="flex items-center gap-1">
          <Image
            src={Wallet || "/placeholder.svg"}
            alt="wallet"
            loading="lazy"
          />
          <h2 className="font-jakarta text-white">Wallet</h2>
        </div>

        <div className="flex gap-1 items-center">
          <Image src={Hbar || "/placeholder.svg"} alt="hbar" loading="lazy" />
          <h2 className="text-white uppercase text-[32px] font-semibold font-jakarta tracking-tighter leading-[107%] max-md:text-3xl">
            {loading ? "..." : `${stats.walletBalance}HBAR`}
          </h2>
        </div>

        <div className="absolute -right-40">
          <Image src={V1 || "/placeholder.svg"} alt="v1" loading="lazy" />
          <Image
            src={V2 || "/placeholder.svg"}
            alt="v2"
            loading="lazy"
            className="absolute top-15"
          />
        </div>
      </div>

      {/* Doctors Card */}
      <div className="w-full md:w-[321px] py-[23px] px-[21px] rounded-[12px] flex flex-col gap-[38px] bg-white">
        <div className="flex items-center gap-1">
          <Image src={Aid || "/placeholder.svg"} alt="aid" loading="lazy" />
          <h2 className="font-jakarta text-black font-semibold">Doctors</h2>
        </div>

        <div className="flex gap-1 items-center tracking-tighter">
          <h2 className="text-[32px] font-jakarta">
            {loading ? "..." : stats.doctorCount}
          </h2>
          <sub className="font-semibold font-jakarta">Available</sub>
        </div>
      </div>

      {/* Pharmacy Card */}
      <div className="w-full md:w-[321px] py-[23px] px-[21px] rounded-[12px] flex flex-col gap-[38px] bg-white">
        <div className="flex items-center gap-1">
          <Image src={Pharm || "/placeholder.svg"} alt="pharm" loading="lazy" />
          <h2 className="font-jakarta text-black font-semibold">Pharmacy</h2>
        </div>

        <div className="flex gap-1 items-center tracking-tighter">
          <h2 className="text-[32px] font-jakarta">
            {loading ? "..." : stats.pharmacyCount}
          </h2>
          <sub className="font-semibold font-jakarta">In your area</sub>
        </div>
      </div>
    </div>
  );
};

export default Card;
