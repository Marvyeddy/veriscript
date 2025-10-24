import Button from "@/components/ui/Button";
import { PenLine } from "lucide-react";
import Image from "next/image";
import Face from "@/public/assets/face.svg";
import Man from "@/public/assets/PersonArmsSpread.svg";
import Phone from "@/public/assets/Phone.svg";
import Pill from "@/public/assets/Pill.svg";
import React from "react";
import { Separator } from "@/components/ui/separator";

const Info = [
  {
    gender: "Male",
    blood_type: "0+ (Positive)",
    genotype: "AA",
    weight: "65kg",
    allergies: ["Milk", "Nuts", "Penicillin"],
    height: "2.1M",
    phone: "08154326712",
    email: "marvelous@gmail.com",
    emergency: "0707050302332",
    symptom: "Malaria",
  },
];

const Diagnosis = [
  {
    prescription: ["septrin", "panadol", "entrim", "thetrim", "paratrim"],
    frequency: ["2x3", "2x4", "2x5", "2x6", "2x7"],
    date: "23 october, 25",
    duration: "2 months",
  },
];

const ProfilePage = () => {
  return (
    <section className="relative h-full">
      {/* Scrollable container */}
      <div className="px-4 sm:px-[30px] pt-4 sm:pt-[22px] font-jakarta max-h-[calc(100vh-100px)] overflow-y-auto pb-10">
        <h2 className="text-[16px] sm:text-[18px] font-semibold text-[#4D4D4D] mb-4 sm:mb-[20px]">
          Profile
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-6 sm:mb-[24px]">
          <div className="flex gap-3">
            <Image
              src={Face}
              alt="face"
              loading="lazy"
              className="size-12 sm:size-[54px]"
            />

            <div>
              <h1 className="font-semibold text-base sm:text-lg">
                Goodness Okuwdi
              </h1>
              <p className="font-semibold text-xs sm:text-sm mt-2">
                Patient ID:{" "}
                <span className="text-[#808080] font-medium">1234567</span>
              </p>
            </div>
          </div>

          <Button
            variants="default"
            className="flex gap-1 items-center text-xs font-semibold w-full sm:w-auto justify-center"
          >
            <PenLine className="size-4 sm:size-[20px]" />
            Edit Profile
          </Button>
        </div>

        {/* cards */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-[24px]">
          {/* card1 */}
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-[#1A1A1A] mb-2">
              Patient Details
            </h2>
            {/* info 1 */}
            <div className="bg-white rounded-[12px] w-full px-4 sm:px-[20px] pb-4 sm:pb-[16px] pt-2 sm:pt-[4px] my-2 sm:my-[10px]">
              <div className="flex items-center gap-2 py-2">
                <Image
                  src={Man}
                  alt="Man"
                  loading="lazy"
                  className="size-5 sm:size-6"
                />
                <h2 className="text-sm text-[#1A1A1A] font-semibold">
                  Personal Information:
                </h2>
              </div>

              <Separator />

              {Info.map((item, idx) => (
                <ul
                  className="mt-4 sm:mt-[18px] flex flex-wrap gap-2 sm:gap-4"
                  key={idx}
                >
                  <li className="font-semibold text-sm text-[#1A1A1A]">
                    Gender:
                    <span className="text-[#808080] font-medium text-sm ml-1">
                      {item.gender}
                    </span>
                  </li>
                  <li className="font-semibold text-sm text-[#1A1A1A]">
                    Blood type:
                    <span className="text-[#808080] font-medium text-sm ml-1">
                      {item.blood_type}
                    </span>
                  </li>
                  <li className="font-semibold text-sm text-[#1A1A1A]">
                    Genotype:
                    <span className="text-[#808080] font-medium text-sm ml-1">
                      {item.genotype}
                    </span>
                  </li>
                  <li className="font-semibold text-sm text-[#1A1A1A]">
                    Weight:
                    <span className="text-[#808080] font-medium text-sm ml-1">
                      {item.weight}
                    </span>
                  </li>
                  <li className="font-semibold text-sm text-[#1A1A1A] col-span-1 xs:col-span-2">
                    Allergies:
                    <span className="text-[#808080] font-medium text-sm ml-1">
                      {item.allergies.join(", ")}
                    </span>
                  </li>
                  <li className="font-semibold text-sm text-[#1A1A1A]">
                    Height:
                    <span className="text-[#808080] font-medium text-sm ml-1">
                      {item.height}
                    </span>
                  </li>
                </ul>
              ))}
            </div>

            {/* info 2 */}
            <div className="bg-white rounded-[12px] w-full px-4 sm:px-[20px] pb-4 sm:pb-[16px] pt-2 sm:pt-[4px] my-2 sm:my-[10px]">
              <div className="flex items-center gap-2 py-2">
                <Image
                  src={Phone}
                  alt="phone"
                  loading="lazy"
                  className="size-5 sm:size-6"
                />
                <h2 className="text-sm text-[#1A1A1A] font-semibold">
                  Contact Information:
                </h2>
              </div>

              <Separator />

              {Info.map((item, idx) => (
                <ul
                  className="mt-4 sm:mt-[18px] space-y-2 sm:space-y-1"
                  key={idx}
                >
                  <li className="font-semibold text-sm text-[#808080]">
                    Phone Number:
                    <span className="text-[#1A1A1A] font-medium text-sm ml-1 block sm:inline">
                      {item.phone}
                    </span>
                  </li>

                  <li className="font-semibold text-sm text-[#808080]">
                    Emergency Contact:
                    <span className="text-[#1A1A1A] font-medium text-sm ml-1 block sm:inline">
                      {item.emergency}
                    </span>
                  </li>

                  <li className="font-semibold text-sm text-[#808080]">
                    Email Address:
                    <span className="text-[#1A1A1A] font-medium text-sm ml-1 block sm:inline">
                      {item.email}
                    </span>
                  </li>
                </ul>
              ))}
            </div>
          </div>

          {/* card 2 */}
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-[#1A1A1A] mb-2">
              Latest Diagnosis
            </h2>

            <div className="bg-white rounded-[12px] w-full px-4 sm:px-[20px] pb-4 sm:pb-[16px] pt-2 sm:pt-[4px] my-2 sm:my-[10px]">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                <div className="flex items-center gap-2 py-2">
                  <Image
                    src={Pill}
                    alt="pill"
                    loading="lazy"
                    className="size-5 sm:size-6"
                  />
                  <h2 className="text-sm text-[#1A1A1A] font-semibold">
                    Diagnosis:
                  </h2>
                </div>

                {Info.map((item, idx) => (
                  <h2 key={idx} className="font-semibold text-sm">
                    {item.symptom}
                  </h2>
                ))}
              </div>

              <Separator />

              <div className="mt-3 overflow-x-auto">
                {/* Header Row */}
                <div className="grid grid-cols-4 min-w-[500px] text-sm font-medium text-[#808080] mb-2 text-start">
                  <h2>Prescriptions</h2>
                  <h2>Frequency</h2>
                  <h2>Date</h2>
                  <h2>Duration</h2>
                </div>

                {Diagnosis.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-4 min-w-[500px] text-sm font-medium"
                  >
                    {/* Prescriptions list */}
                    <div className="flex flex-col space-y-2 sm:space-y-3 items-start">
                      {item.prescription.map((drug, i) => (
                        <h2 key={i} className="text-sm">
                          {drug}
                        </h2>
                      ))}
                    </div>

                    {/* Frequency list */}
                    <div className="flex flex-col space-y-2 sm:space-y-3 items-start">
                      {item.frequency.map((freq, i) => (
                        <h2 key={i} className="text-sm text-[#808080]">
                          {freq}
                        </h2>
                      ))}
                    </div>

                    {/* Date */}
                    <div className="flex items-start">
                      <h2 className="text-sm text-[#808080]">{item.date}</h2>
                    </div>

                    {/* Duration */}
                    <div className="flex items-start">
                      <h2 className="text-sm text-[#808080]">
                        {item.duration}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          <h2 className="font-semibold mb-3 sm:mb-[12px] text-[16px]">
            Doctors Notes
          </h2>

          <div className="px-4 sm:px-[20px] bg-white pt-3 sm:pt-[8px] rounded-[12px]">
            <h2 className="font-semibold mb-3 sm:mb-[12px] text-sm">
              Health Details
            </h2>

            <Separator />

            <p className="text-sm font-medium text-[#808080] mt-4 sm:mt-[15px] pb-4 sm:pb-[15px]">
              To Whom It May Concern,
              <br />
              <br />I am writing to confirm that the individual mentioned is a
              male patient currently under my care. He has been diagnosed with
              hypertension and anxiety. His latest prescription includes
              Lisinopril for blood pressure management and Sertraline for
              anxiety. Should you need more details or have any questions,
              please do not hesitate to reach out to my office. <br />
              <br /> Sincerely,
              <br />
              <br />
              Doctor&apos;s Chillman Issoryt +234 8123 4567 89
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
