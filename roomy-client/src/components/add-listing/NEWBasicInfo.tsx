"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/store";
import { Address } from "@/store/services/address-service";
import { setBasicInfo, setStep } from "@/store/slices/addListing-slice";
import { useDispatch } from "react-redux";
import AddressSearch from "../homepage/AddressSearch";

export default function NEWBasicInfo() {
  const basicInfo = useAppSelector((state) => state.addListingSlice.basicInfo);
  const addressData: Address = basicInfo.streetAddress;

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("streetAddress.")) {
      const nestedField = name.split(".")[1];
      dispatch(
        setBasicInfo({
          ...basicInfo,
          streetAddress: {
            ...basicInfo.streetAddress,
            [nestedField]: value,
          },
        })
      );
    } else {
      console.log(name ? name : "no name", value, "name and value");
      console.log({ ...basicInfo, [name]: value });
      dispatch(setBasicInfo({ ...basicInfo, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setStep(1));
  };
  return (
    <>
      <div className="flex-1 min-w-0 mt-8 lg:mt-0">
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md mx-auto lg:mx-0">
          <div className="flex flex-col space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <div>
                <Input
                  style={{ border: "0.5px solid #ccc" }}
                  onChange={handleChange}
                  value={basicInfo.title}
                  id="title"
                  placeholder="New Title"
                  name="title"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                style={{ border: "0.5px solid #ccc" }}
                onChange={handleChange}
                value={basicInfo.phoneNumber}
                id="phone"
                placeholder="+1 123 456 7890"
                name="phoneNumber"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="addresssearch">Search Location</Label>
                <div
                  style={{
                    width: "280px",
                    marginLeft: "20px",
                  }}
                >
                  <AddressSearch></AddressSearch>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="address">Street Address</Label>
                <Input
                  style={{ border: "0.5px solid #ccc" }}
                  onChange={handleChange}
                  value={addressData.streetAddress}
                  id="address"
                  placeholder="75th Street, Newport New"
                  name="streetAddress.streetAddress"
                />
              </div>
              <div>
                <Label htmlFor="unit">Unit No.</Label>
                <Input
                  style={{ border: "0.5px solid #ccc" }}
                  name="streetAddress.unitNo"
                  value={addressData.unitNo}
                  onChange={handleChange}
                  id="unit"
                  placeholder="112"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  style={{ border: "0.5px solid #ccc" }}
                  name="streetAddress.city"
                  value={addressData.city}
                  onChange={handleChange}
                  id="city"
                  placeholder="Newport News"
                />
              </div>
              <div>
                <Label htmlFor="state">State Code</Label>
                <Input
                  style={{ border: "0.5px solid #ccc" }}
                  name="streetAddress.stateCode"
                  value={addressData.stateCode}
                  onChange={handleChange}
                  id="state"
                  placeholder="VA"
                />
              </div>
              <div>
                <Label htmlFor="zip">Zip Code</Label>
                <Input
                  style={{ border: "0.5px solid #ccc" }}
                  name="streetAddress.zipCode"
                  value={addressData.zipCode}
                  onChange={handleChange}
                  id="zip"
                  placeholder="23607"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="move-in">Move-in Date</Label>
              <Input
                style={{ border: "0.5px solid #ccc" }}
                name="moveInDate"
                value={basicInfo.moveInDate}
                onChange={handleChange}
                defaultValue="2024-12-04"
                id="move-in"
                placeholder="12/04/2024"
                type="date"
              />
            </div>
            <Button onClick={handleSubmit} className="mt-4">
              Next Step
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
