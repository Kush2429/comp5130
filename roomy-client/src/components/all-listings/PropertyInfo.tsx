"use client";

import { useGetPostByIdQuery } from "@/store/services/post-service";
import { useEffect, useState } from "react";
import PropertyCarousel, { CarouselProps } from "./PropertyCarousel";
import PropertyBasicInfo, { PropertyInfoProps } from "./PropertyBasicInfo";
import PropertyMap, { PropertyMapProps } from "./PropertyMap";

export default function PropertyInfo({ propertyId }: { propertyId: string }) {
  console.log(propertyId);
  const testPropertyId = propertyId;
  const {
    data: post,
    isLoading: postsLoading,
    error: postsError,
  } = useGetPostByIdQuery(testPropertyId, {
    // refetchOnMountOrArgChange: true,
  });
  const [carouselData, setCarouselData] = useState<CarouselProps>();
  const [propertyData, setPropertyData] = useState<PropertyInfoProps>();
  const [mapData, setMapData] = useState<PropertyMapProps>();

  useEffect(() => {
    if (post) {
      console.log(post, "posts form property info");
      setCarouselData({ photos: post.photos.map((photo) => photo.url) });
      setPropertyData({
        postId: post._id,
        title: post.title,
        description: `${post.bedCount || 0} bedrooms, ${post.bathCount || 0} baths`,
        streetAddress: post.streetAddress,
        unitNo: post.unitNo,
        city: post.city,
        stateCode: post.stateCode,
        zipCode: post.zipCode,
        startDateRange: post.startDateRange,
        price: post.price,
        bedCount: post.bedCount,
        bathCount: post.bathCount,
        utilities: post.utilities || [],
        phoneNumber: post.phoneNumber,
      });
      setMapData({ latitute: post.latitude, longitude: post.longitude, price: post.price });
    }
  }, [post]);

  if (postsLoading) {
    return <SkeletonLoader />;
  }
  if (postsError) {
    return <div>Error fetching data. Please try again later.</div>;
  }
  return (
    <>
      <main className="flex-1">
        <PropertyCarousel photos={carouselData?.photos || []}></PropertyCarousel>
        <PropertyBasicInfo
          basicInfo={
            propertyData || {
              postId: "",
              title: "",
              description: "",
              streetAddress: "",
              unitNo: "",
              city: "",
              stateCode: "",
              zipCode: "",
              startDateRange: new Date(),
              price: 0,
              bedCount: 0,
              bathCount: 0,
              utilities: [],
              phoneNumber: "",
            }
          }
        ></PropertyBasicInfo>
        <PropertyMap
          mapsInfo={
            mapData || {
              latitute: 0,
              longitude: 0,
              price: 1000,
            }
          }
        />
      </main>
    </>
  );
}

function SkeletonLoader() {
  return (
    <main className="flex-1">
      <section className="w-full px-4 md:px-6 mt-4">
        <div className="animate-pulse">
          <div className="w-full max-h-[500px] rounded-lg bg-gray-200" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 md:p-6">
            <div className="w-full border-2 rounded-lg bg-gray-200">
              <div className="p-4">
                <div className="h-4 w-1/4 bg-gray-300 mb-4 rounded" />
                <div className="h-4 w-full bg-gray-300 rounded" />
                <div className="h-4 w-full mt-4 bg-gray-300 rounded" />
                <div className="h-4 w-full mt-4 bg-gray-300 rounded" />
                <div className="h-4 w-full mt-4 bg-gray-300 rounded" />
              </div>
            </div>
            <div className="w-full border-2 rounded-lg bg-gray-200">
              <div className="p-4">
                <div className="h-4 w-full bg-gray-300 mb-4 rounded" />
                <div className="h-4 w-full mt-4 bg-gray-300 rounded" />
                <div className="h-4 w-full mt-4 bg-gray-300 rounded" />
                <div className="h-4 w-full mt-4 bg-gray-300 rounded" />
                <div className="h-4 w-full mt-4 bg-gray-300 rounded" />
              </div>
            </div>
          </div>
          <div className="border-2 p-4 md:p-6 ml-6 mr-6 bg-gray-200">
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <div className="w-full md:w-1/2 rounded bg-gray-300 h-12" />
              <div className="flex gap-2">
                <div className="w-1/3 md:w-auto rounded bg-gray-300 h-12" />
                <div className="w-1/3 md:w-auto rounded bg-gray-300 h-12" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
