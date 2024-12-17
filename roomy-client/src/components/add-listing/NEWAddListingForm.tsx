"use client";

import { useAppSelector } from "@/store/store";
import NEWBasicInfo from "./NEWBasicInfo";
import NEWUploadPhoto from "./NEWUploadPhoto";
import RoomDetailsForm from "./RoomDetails";
import NEWConformationForm from "./NEWConformationForm";

export default function NEWAddListingForm() {
  const step = useAppSelector((state) => state.addListingSlice.step);
  return (
    <div className="flex flex-col lg:flex-row items-stretch justify-center min-h-screen p-4">
      <div className="flex-1 min-w-0">
        <div className="bg-[#4f46e5] rounded-3xl p-8 text-white max-w-xs mx-auto lg:mx-0 h-4/5 flex flex-col justify-between">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center">
              <div
                className={`rounded-full w-10 h-10 flex items-center justify-center border-2 ${
                  step === 0 ? "bg-white text-[#4f46e5]" : "bg-transparent text-white"
                }`}
              >
                1
              </div>
              <span className="ml-4 text-lg font-semibold">YOUR INFO</span>
            </div>
            <div className="flex items-center ml-2.5">
              <div
                className={`rounded-full w-10 h-10 flex items-center justify-center border-2 ${
                  step === 1 ? "bg-white text-[#4f46e5]" : "bg-transparent text-white"
                }`}
              >
                2
              </div>
              <span className={`ml-4 text-lg `}>SELECT PLAN</span>
            </div>
            <div className="flex items-center mr-6">
              <div
                className={`rounded-full w-10 h-10 flex items-center justify-center border-2 ${
                  step === 2 ? "bg-white text-[#4f46e5]" : "bg-transparent text-white"
                }`}
              >
                3
              </div>
              <span className={`ml-4 text-lg `}>ADD-ONS</span>
            </div>
            <div className="flex items-center mr-4">
              <div
                className={`rounded-full w-10 h-10 flex items-center justify-center border-2 ${
                  step === 3 ? "bg-white text-[#4f46e5]" : "bg-transparent text-white"
                }`}
              >
                4
              </div>
              <span className={`ml-4 text-lg `}>SUMMARY</span>
            </div>
          </div>
        </div>
      </div>
      {step === 0 && <NEWBasicInfo></NEWBasicInfo>}
      {step === 1 && <NEWUploadPhoto></NEWUploadPhoto>}
      {step === 2 && <RoomDetailsForm></RoomDetailsForm>}
      {step === 3 && <NEWConformationForm></NEWConformationForm>}
    </div>
  );
}
