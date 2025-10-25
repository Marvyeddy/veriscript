import MedicalCard from "@/components/common/MedicalCard";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Send from "@/public/assets/send.svg";
import React from "react";
import Locator from "@/public/assets/locator2.svg";
import { Separator } from "@/components/ui/separator";
import { CircleAlert } from "lucide-react";
import Search from "@/public/assets/search.svg";
import Cash from "@/public/assets/cash.svg";

const ConsultPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const paid = true;
  return (
    <section className="relative h-full">
      {/* Scrollable container */}
      <div className="px-4 sm:px-[30px] pt-4 sm:pt-[22px] font-jakarta max-h-[calc(100vh-100px)] overflow-y-auto pb-6 sm:pb-10 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4 sm:mb-[20px]">
            <h2 className="text-[#4D4D4D] font-semibold text-lg sm:text-[18px] ">
              {paid ? "Prescription" : "Doctors"}
            </h2>

            <Button variants="default">
              <Image src={Search} alt="search" loading="lazy" />
              <span className="text-sm font-medium ">Find doctors</span>
            </Button>
          </div>

          <MedicalCard id={id} />

          {paid ? (
            <div className="mt-4 sm:mt-6">
              <div>
                <article className="bg-white rounded-[12px] rounded-tr-none pt-4 px-4 sm:pt-[16px] sm:px-[20px] max-w-full sm:max-w-[480px] pb-2 ml-auto">
                  <h3 className="text-xs font-medium text-[#808080] leading-[145%]">
                    Hi there! I&apos;m reaching out because I&apos;m dealing
                    with high blood pressure and anxiety. Right now, I&apos;m on
                    Lisinopril for my blood pressure and Sertraline for my
                    anxiety. I would really appreciate any advice or if you
                    could help me with a prescription. Thank you!
                  </h3>

                  <Separator className="mt-3 sm:mt-[15px] mb-2 sm:mb-[8px]" />

                  <h2 className="text-[#808080] text-xs text-right">2:00 PM</h2>
                </article>
              </div>

              <div className="mt-4 sm:mt-[24px] mb-16 sm:mb-[72px]">
                <article className="bg-[#E6F7EE] rounded-[12px] rounded-tl-none pt-4 px-4 sm:pt-[16px] sm:px-[20px] max-w-full sm:max-w-[480px] pb-2">
                  <h3 className="text-xs font-medium text-[#808080] leading-[145%]">
                    Hello! Thank you for reaching out. It&apos;s important to
                    manage both high blood pressure and anxiety effectively. I
                    have sent your diagnosis and prescription to the pharmacist
                    closest to you. let me know if you have more requests
                  </h3>

                  <Button
                    variants="default"
                    className="mt-3 sm:mt-[15px] w-full sm:w-auto"
                  >
                    <h2 className="text-sm">Pharm C. obiekwe</h2>

                    <span className="flex items-center text-xs gap-1">
                      <Image src={Locator} alt="locator" loading="lazy" />2
                      metres Away
                    </span>
                  </Button>

                  <Separator className="mt-3 sm:mt-[15px] mb-2 sm:mb-[8px]" />

                  <h2 className="text-[#808080] text-xs text-right">2:00 PM</h2>
                </article>
              </div>
            </div>
          ) : (
            <div className="mt-[91px] w-fit mx-auto">
              <h2 className="font-semibold text-[20px] max-md:text-[16px] text-[#4D4D4D] text-center">
                Please proceed with payment to start consultation
              </h2>

              <div className="bg-[#FCE6E6] border border-[#F18A8A] w-fit py-3 px-[19px] rounded-[7px] mx-auto mt-4">
                <div className="flex items-center gap-2 text-[#E10000]">
                  <CircleAlert className="size-[20px] max-md:size-[16px]" />
                  <span className="font-semibold text-[18px] max-sm:text-[16px]">
                    Note
                  </span>
                </div>

                <h2 className="text-[#808080] text-sm font-medium max-md:text-xs">
                  Payment would be deducted from your wallet balance
                </h2>
              </div>

              <Button variants="default" className="mx-auto mt-8">
                <Image src={Cash} alt="cash" loading="lazy" />
                <p className="text-sm font-medium">Make payment</p>
              </Button>
            </div>
          )}
        </div>

        {paid && (
          <form className="sticky bottom-0 pt-4 pb-2 sm:pb-0 sm:pt-0 sm:bg-transparent">
            <div className="flex items-center gap-x-3 sm:gap-x-5">
              <Input
                className="flex-1 bg-white rounded-full py-4 px-4 sm:py-[20px] sm:px-[20px] placeholder:text-[#4D4D4D] placeholder:font-semibold text-sm sm:text-base"
                placeholder="Type your message here"
              />
              <Button
                variants="default"
                className="py-3 px-4 sm:py-[12px] sm:px-[20px] rounded-full shrink-0"
              >
                <h2 className="text-sm hidden sm:block">Send</h2>
                <Image
                  src={Send}
                  alt="send"
                  loading="lazy"
                  className="w-5 h-5 sm:w-auto sm:h-auto"
                />
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ConsultPage;
