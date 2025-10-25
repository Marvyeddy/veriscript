"use client";
import { useState } from "react";
import { X } from "lucide-react";
import haspack from "@/public/images/haspack.webp";
import Image from "next/image";
export default function ConnectWallet() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="relative bg-white w-[280px] rounded-lg shadow-lg p-5 flex flex-col items-center">
        {/* Close button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <X size={16} />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold mb-3 text-center">
          Connect wallet
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 text-center mb-4">
          App only support Haspack wallet to use please create an account with
          HashPack
        </p>

        {/* Wallet options */}
        <div className="w-full flex flex-col gap-2 mb-4">
          <button className="flex items-center gap-2 border rounded-md py-2 px-3 hover:bg-gray-50">
            <Image
              src={haspack}
              alt="WalletConnect"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">WalletConnect</span>
          </button>
        </div>

        {/* Connect button */}
        <button className="bg-green-600 text-white w-full py-2 rounded-md hover:bg-green-700 transition cursor-pointer">
          Connect
        </button>
      </div>
    </div>
  );
}
