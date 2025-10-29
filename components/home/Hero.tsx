"use client"
import Navbar from "../common/Navbar"
import Heart from "@/public/assets/Heartbeat.svg"
import Hero_Img from "@/public/images/Rectangle.png"
import Image from "next/image"
import Button from "../ui/Button"
import { useRouter } from "next/navigation"

const Hero = () => {
  const router = useRouter()
  return (
    <section className="relative px-4 sm:px-6 lg:px-0 bg-[url(/images/grid.png)] bg-cover bg-no-repeat bg-center">
      <div className="lg:px-6">
        <Navbar />
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
        <div className="flex-1 flex flex-col gap-4 sm:gap-6 lg:gap-[25px] lg:ml-[72px] lg:mt-[115px] mt-8 sm:mt-12 max-lg:items-center max-lg:justify-center max-w-[600px] mx-auto w-full lg:w-fit">
          {/* badge */}
          <div className="flex items-center gap-2.5 bg-[#E6F7EE] w-fit rounded-full py-2 sm:py-[10px] px-3 sm:px-[15px]">
            <Image src={Heart || "/placeholder.svg"} alt="heart" loading="lazy" />
            <h2 className="text-[#03B156] font-semibold font-jakarta text-sm sm:text-base">Secure Prescriptions</h2>
          </div>

          <h1 className="font-jakarta text-2xl sm:text-3xl lg:text-[48px] leading-[107%] text-[#454861] font-bold text-center lg:text-left">
            Get digital prescriptions from certified doctors and trusted pharmacies.
          </h1>

          <p className="text-base sm:text-lg lg:text-[18px] font-semibold font-jakarta text-[#6F707E] leading-[107%] text-center lg:text-left">
            Connect with certified medical professionals anytime, get personalized digital prescriptions, and access a
            network of trusted pharmacies for your medication needs.
          </p>

          <Button variants="default" className="w-full sm:w-[216px]" onClick={() => router.push("/onboarding")}>
            Get started
          </Button>
        </div>

        {/* image */}
        <div className="flex-1 relative hidden lg:flex justify-center">
          <Image
            src={Hero_Img || "/placeholder.svg"}
            alt="hero_img"
            priority
            className="object-fit w-full h-auto max-w-md"
          />

          <div
            className="absolute bottom-0 right-0 w-3/5 h-3/5 pointer-events-none rounded-full blur-3xl"
            style={{
              background: "linear-gradient(10deg, #03B156 0%, #03B156 60%, #ffffff 100%)",
              opacity: 0.2,
              zIndex: -1,
              filter: "blur(60px)",
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
