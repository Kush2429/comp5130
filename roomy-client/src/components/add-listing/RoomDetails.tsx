"use client"

import { setRoomDetails, setStep } from "@/store/slices/addListing-slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store/store";
import { use, useEffect } from "react";
import { Button } from "../ui/button";

export default function RoomDetailsForm() {
  const dispatch = useDispatch();
  const roomDetails = useAppSelector((state) => state.addListingSlice.roomDetails);
  const { rent } = roomDetails;

  useEffect(() => {
    handleRentChange({ target: { value: rent } });
  }, []);

  const handleRentChange = (e: any) => {
    const { value } = e.target;
    dispatch(setRoomDetails({ ...roomDetails, rent: Number(value) }));
  };
  const handleBathChange = (e: any) => {
    const { value } = e.target;
    dispatch(setRoomDetails({ ...roomDetails, bath: Number(value) }));
  };
  const handleBedChange = (e: any) => {
    const { value } = e.target;
    dispatch(setRoomDetails({ ...roomDetails, bed: Number(value) }));
  };
  const handleUtilitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    const updatedFacilities = checked
      ? [...roomDetails.facilities, id]
      : roomDetails.facilities.filter((facility) => facility !== id);
    console.log(updatedFacilities, "updatedFacilities");
    dispatch(setRoomDetails({ ...roomDetails, facilities: updatedFacilities }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setStep(3));
  };
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setStep(1));
  };

  return (
    <div className="flex-1 min-w-0 mt-8 lg:mt-0">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md mx-auto lg:mx-0" style={{ width: "500px" }}>
        <div className="flex flex-col space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rent">
                Rent (in dollars)
              </label>
              <input
                className="shadow ml-0 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="rent"
                name="rent"
                value={roomDetails.rent}
                onChange={handleRentChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bath">
                Bath
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="bath"
                name="bath"
                value={roomDetails.bath.toString()}
                onChange={handleBathChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bed">
                Bed
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="bed"
                name="bed"
                value={roomDetails.bed}
                onChange={handleBedChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Utilities</label>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="heat"
                    type="checkbox"
                    defaultValue=""
                    checked={roomDetails.facilities.includes("heat")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onChange={handleUtilitiesChange}
                  />
                  <label
                    htmlFor="heat"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Heat
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="water"
                    type="checkbox"
                    defaultValue=""
                    checked={roomDetails.facilities.includes("water")}
                    onChange={handleUtilitiesChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="water"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Water
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="electricity"
                    type="checkbox"
                    defaultValue=""
                    checked={roomDetails.facilities.includes("electricity")}
                    onChange={handleUtilitiesChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="electricity"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Power
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="gas"
                    type="checkbox"
                    defaultValue=""
                    checked={roomDetails.facilities.includes("gas")}
                    onChange={handleUtilitiesChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="gas"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Gas
                  </label>
                </div>
              </li>
              <li className="w-full dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="laundry"
                    type="checkbox"
                    defaultValue=""
                    checked={roomDetails.facilities.includes("laundry")}
                    onChange={handleUtilitiesChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="laundry"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Dry
                  </label>
                </div>
              </li>
            </ul>
            <button onClick={handleBack} className="bg-marine-blue text-white px-4 py-2 rounded-lg">
              Back
            </button>
            <button type="submit" className="bg-marine-blue text-white px-4 py-2 rounded-lg">
              Next Step
            </button>
          </form>
          <div className="flex justify-between mt-96">
            <Button onClick={handleBack} variant="ghost">
              Go Back
            </Button>
            <Button onClick={handleSubmit}>Next Step</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
