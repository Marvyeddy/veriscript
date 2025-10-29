import Image from "next/image"
import type { ReactNode } from "react"
import DashImg from "@/public/images/dashboard_img.png"

const OnboardingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6 lg:gap-[109px] py-6 sm:py-[28px] px-4 sm:px-6 lg:pl-[30px] min-h-screen lg:min-h-auto">
      <div
        style={{
          maxHeight: "100vh",
          height: "100vh",
          overflow: "hidden",
        }}
        className="hidden lg:block w-full lg:w-auto"
      >
        <Image
          src={DashImg || "/placeholder.svg"}
          alt="dash_img"
          className="object-contain w-full h-full"
          style={{
            objectFit: "contain",
          }}
          width={521}
          height={777}
        />
      </div>

      <main className="w-full lg:w-auto">{children}</main>
    </div>
  )
}

export default OnboardingLayout
