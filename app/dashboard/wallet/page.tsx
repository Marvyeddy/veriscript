"use client";
import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import haspack from "@/public/images/haspack.webp";
import Image from "next/image";

export default function ConnectWallet() {
  const [show, setShow] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      // Check if HashPack is available
      if (typeof window !== "undefined" && (window as any).hashpack) {
        const hashpack = (window as any).hashpack;
        // Attempt to connect to HashPack wallet
        await hashpack.connect();
        setShow(false);
      } else {
        setError(
          "HashPack wallet not found. Please install the HashPack extension."
        );
      }
    } catch (err) {
      console.error("[v0] Wallet connection error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to connect wallet. Please try again."
      );
    } finally {
      setIsConnecting(false);
    }
  };

  if (!show) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Wallet Connected</h1>
          <p className="text-gray-600">
            Your HashPack wallet is now connected.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/50">
      <div className="relative bg-white w-full max-w-sm sm:max-w-md rounded-lg shadow-lg p-4 sm:p-5 flex flex-col items-center">
        {/* Close button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-black transition"
          disabled={isConnecting}
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-semibold mb-3 text-center">
          Connect wallet
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 text-center mb-4">
          App only supports HashPack wallet. Please create an account with
          HashPack if you don't have one.
        </p>

        {/* Error message */}
        {error && (
          <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Wallet options */}
        <div className="w-full flex flex-col gap-2 mb-4">
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="flex items-center gap-2 border rounded-md py-2 px-3 hover:bg-gray-50 transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Image
              src={haspack || "/placeholder.svg"}
              alt="HashPack"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">HashPack Wallet</span>
          </button>
        </div>

        {/* Connect button */}
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="bg-green-600 text-white w-full py-2 rounded-md hover:bg-green-700 transition cursor-pointer text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isConnecting && <Loader2 size={16} className="animate-spin" />}
          {isConnecting ? "Connecting..." : "Connect"}
        </button>
      </div>
    </div>
  );
}
