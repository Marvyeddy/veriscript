import React from "react";
import Navbar from "../common/Navbar";
import Heart from "@/public/assets/Heartbeat.svg";
import Hero_Img from "@/public/images/Rectangle.png";
import Image from "next/image";
import Button from "../ui/Button";

const Hero = () => {
  return (
    <section className="relative max-lg:px-4">
      <div className="min-lg:px-6 ">
        <Navbar />
      </div>

      <div className="flex items-center">
        <div className="flex-1 flex flex-col gap-[25px] lg:ml-[72px] md:mt-[115px] max-md:mt-[32px] max-lg:items-center max-lg:justify-center max-w-[600px] mx-auto w-fit">
          {/* badge */}
          <div className="flex items-center gap-2.5 bg-[#E6F7EE] w-fit rounded-full py-[10px] px-[15px]">
            <Image src={Heart} alt="heart" loading="lazy" />
            <h2 className="text-[#03B156] font-semibold font-jakarta">
              Secure Prescriptions
            </h2>
          </div>

          <h1 className="font-jakarta text-[48px] leading-[107%] font-bold max-lg:text-center">
            Get digital prescriptions from certified doctors and trusted
            pharmacies.
          </h1>

          <p className="text-[18px] font-semibold font-jakarta leading-[107%] max-lg:text-center">
            Connect with certified medical professionals anytime, get
            personalized digital prescriptions, and access a network of trusted
            pharmacies for your medication needs.
          </p>

          <Button variants="default" className="w-[216px]">
            Get started
          </Button>
        </div>

        {/* image */}
        <div className="flex-1 relative max-lg:hidden">
          <Image
            src={Hero_Img}
            alt="hero_img"
            priority
            className="object-fit"
          />

          <div
            className="absolute bottom-0 right-0 w-3/5 h-3/5 pointer-events-none rounded-full blur-3xl"
            style={{
              background:
                "linear-gradient(10deg, #03B156 0%, #03B156 60%, #ffffff 100%)",
              opacity: 0.2,
              zIndex: -1,
              filter: "blur(60px)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
