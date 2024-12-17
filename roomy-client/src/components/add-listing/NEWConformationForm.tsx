"use client"

import { resetSlice, setStep } from "@/store/slices/addListing-slice";
import { useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Post, useCreatePostMutation } from "@/store/services/post-service";
import { createFormData } from "@/utils/create-formdata";
import { base64ToFile } from "@/utils/file-base64";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function NEWConformationForm() {
  const { basicInfo, photosInfo, roomDetails } = useAppSelector((state) => state.addListingSlice);
  const completeDetails = useAppSelector((state) => state.addListingSlice);
  console.log(completeDetails, "completeDetails");
  const [
    createPost,
    { data: post, error: postError, isLoading: postLoading, isError: isPostError, isSuccess: isPostSuccess },
  ] = useCreatePostMutation();
  const router = useRouter();

  useEffect(() => {
    if (isPostError) {
      toast.error("Error creating post");
    }
    if (isPostSuccess) {
      toast.success("Post created successfully");
      dispatch(resetSlice());
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  }, [isPostError, postLoading]);

  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const photosFileListPromises = photosInfo.photos.map(async (base64String, index) => {
      const fileName = `image${index + 1}.png`;
      try {
        const file = await base64ToFile(base64String, fileName);
        console.log("File converted:", file); // Log the converted file
        return file;
      } catch (error) {
        console.error("Error converting base64 to file:", error);
        return null;
      }
    });

    const photosFileList = await Promise.all(photosFileListPromises);
    console.log("Photos File List:", photosFileList); // Log the photosFileList array

    const filteredPhotosFileList = photosFileList.filter((file) => file !== null) as File[];
    console.log("Filtered Photos File List:", filteredPhotosFileList);

    // Now photosFileList is an array of File objects, you can proceed with creating the FormData
    const dataToPost: Post = {
      title: completeDetails.basicInfo.title,
      phoneNumber: completeDetails.basicInfo.phoneNumber,
      streetAddress: completeDetails.basicInfo.streetAddress.streetAddress,
      unitNo: completeDetails.basicInfo.streetAddress.unitNo,
      city: completeDetails.basicInfo.streetAddress.city,
      stateCode: completeDetails.basicInfo.streetAddress.stateCode,
      zipCode: completeDetails.basicInfo.streetAddress.zipCode,
      latitude: completeDetails.basicInfo.streetAddress.latitude,
      longitude: completeDetails.basicInfo.streetAddress.longitude,
      startDateRange: new Date(completeDetails.basicInfo.moveInDate),
      price: completeDetails.roomDetails.rent,
      bedCount: completeDetails.roomDetails.bed,
      bathCount: completeDetails.roomDetails.bath,
    };

    const formDataToPost = createFormData(dataToPost);
    const utilities = completeDetails.roomDetails.facilities;
    utilities.forEach((utility) => {
      formDataToPost.append("utilities[]", utility);
    });
    filteredPhotosFileList.forEach((file) => {
      formDataToPost.append("photos", file);
    });
    console.log("FormData to Post:", formDataToPost.getAll("photos[]")); // Log the formDataToPost
    await createPost(formDataToPost);
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(setStep(2));
  };
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex-1 min-w-0 mt-8 lg:mt-0">
        <div
          className="bg-white rounded-3xl shadow-lg p-8 max-w-md mx-auto lg:mx-0"
          style={{ height: "600px", overflowY: "auto" }}
        >
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-semibold">Basic Information</h2>
            <div>
              <div>Title: {basicInfo.title}</div>
              <div>Phone Number: {basicInfo.phoneNumber}</div>
              <div>Street Address: {basicInfo.streetAddress.streetAddress}</div>
              <div>Unit No: {basicInfo.streetAddress.unitNo}</div>
              <div>City: {basicInfo.streetAddress.city}</div>
              <div>State Code: {basicInfo.streetAddress.stateCode}</div>
              <div>Zip Code: {basicInfo.streetAddress.zipCode}</div>
              <div>Move In Date: {basicInfo.moveInDate}</div>
            </div>
            <h2 className="text-xl font-semibold">Photos Information</h2>
            <div className="grid grid-cols-2 gap-4">
              {photosInfo.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width={200}
                  height={200}
                />
              ))}
            </div>
            <h2 className="text-xl font-semibold">Room Details</h2>
            <div className="overflow-y-auto max-h-36">
              <div>Rent: {roomDetails.rent}</div>
              <div>Bath: {roomDetails.bath}</div>
              <div>Bed: {roomDetails.bed}</div>
              <div>Facilities: {roomDetails.facilities.join(", ")}</div>
            </div>
            <div>
              <div style={{ height: "30px" }}></div>
            </div>
            <Button onClick={handleSubmit}>Publish</Button>
            <Button onClick={handleBack} variant="ghost">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
