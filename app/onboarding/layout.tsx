import Image from "next/image";
import React, { ReactNode } from "react";
import DashImg from "@/public/images/dashboard_img.png";

const OnboardingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center py-[28px] pl-[30px] gap-[109px]">
      <div
        style={{
          maxHeight: "100vh",
          height: "100vh",
          overflow: "hidden",
        }}
        className="max-lg:hidden"
      >
        <Image
          src={DashImg}
          alt="dash_img"
          className="object-contain w-full h-full" // Use Tailwind classes
          style={{
            objectFit: "contain", // CSS fallback
          }}
          width={521}
          height={777}
        />
      </div>

      <main>{children}</main>
    </div>
  );
};

export default OnboardingLayout;
