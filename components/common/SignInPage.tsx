"use client";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-jakarta">
      <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
        {/* Back Button */}
        <div className="text-left mb-6">
          <button
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm"
            onClick={() => router.back}
          >
            <span className="text-lg">←</span> Back
          </button>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-start justify-start  mb-6">
          <Image
            src="/assets/logo.svg"
            alt="Veriscript"
            width={50}
            height={50}
          />
          <h1 className="text-xl font-semibold mt-2 text-gray-800">
            Veriscript
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome back Goodness
        </h2>
        <p className="text-gray-500 text-sm mt-1 mb-6">
          Please fill in the required data to proceed
        </p>

        {/* Email Input */}
        <div className="mb-4 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@alignui.com"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-6 text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <a
              href="#"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-green-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
        </div>

        {/* Continue Button */}
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition-colors">
          Continue →
        </button>
      </div>
    </div>
  );
}
