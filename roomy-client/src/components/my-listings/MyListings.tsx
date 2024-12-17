"use client";
import { useGetMyPostsQuery, useGetPostsQuery } from "@/store/services/post-service";
import { PopUpConfirmation, PropertyCard } from "../all-listings/PropertyCard";
import { useEffect } from "react";

const PropertyCardSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-xl p-4">
    <div className="h-32 bg-gray-300 mb-4"></div>
    <div className="h-6 bg-gray-300 mb-2"></div>
    <div className="h-6 bg-gray-300 w-3/4"></div>
  </div>
);
const ErrorComponent = ({ message }: { message: string }) => <div className="text-red-500">{message}</div>;

export function MyListings() {
  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
  } = useGetMyPostsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    console.log("posts from MyListings", posts);
  }, [posts]);
  if (postsLoading && !posts) {
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
        {[...Array(6)].map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (postsError) {
    return <ErrorComponent message="Error fetching data. Please try again later." />;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
      {posts?.map((property) => (
        <>
          <PropertyCard
            key={property._id}
            propertyId={property._id}
            title={property.title}
            description={`${property.bedCount || 0} bedrooms, ${property.bathCount || 0} baths`}
            price={`$${property.price || 0} per month`}
            bedCount={property.bedCount}
            bathCount={property.bathCount}
            movindate={property.startDateRange}
            imageSrc={property.photos[0]?.url || "/next.svg"}
            isTag={"true"}
            isApproved={property.approved}
          />
          {/* <PopupComponent></PopupComponent> */}
          <PopUpConfirmation></PopUpConfirmation>
        </>
      ))}
    </section>
  );
}
