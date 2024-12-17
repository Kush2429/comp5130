"use client";
import { useGetPostsQuery } from "@/store/services/post-service";
import { PropertyCard } from "./PropertyCard";
import { useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { FilterInitialState } from "@/store/slices/postFilter-slice";
import { useSearchParams } from "next/navigation";

const PropertyCardSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-xl p-4">
    <div className="h-32 bg-gray-300 mb-4"></div>
    <div className="h-6 bg-gray-300 mb-2"></div>
    <div className="h-6 bg-gray-300 w-3/4"></div>
  </div>
);
const ErrorComponent = ({ message }: { message: string }) => (
  <div className="text-red-500 text-center">{message}</div>
);

export function PropertyCardList() {
  const searchParams = useSearchParams();
  const cityNameQuery = searchParams.get("city");
  console.log(
    cityNameQuery,
    "cityNameQuery InitialState from PropertyCardList"
  );
  const bedCount = useAppSelector((state) => state.postFilterSlice.bedCount);
  const bathCount = useAppSelector((state) => state.postFilterSlice.bathCount);
  const city = useAppSelector((state) => state.postFilterSlice.city);
  const priceMax = useAppSelector((state) => state.postFilterSlice.priceMax);
  const priceMin = useAppSelector((state) => state.postFilterSlice.priceMin);
  const startDateRange = useAppSelector(
    (state) => state.postFilterSlice.startDateRange
  );
  const filterDetails: FilterInitialState = {
    bedCount,
    bathCount,
    city: cityNameQuery || "",
    priceMax,
    priceMin,
    startDateRange,
  };
  const {
    data: posts,
    isLoading: postsLoading,
    error: postsError,
    refetch,
  } = useGetPostsQuery(filterDetails, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    console.log(cityNameQuery, "UseEffect cityNameQuery from PropertyCardList");
    // refetch();
  }, [cityNameQuery]);

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
    return (
      <ErrorComponent message="Error fetching data. Please try again later." />
    );
  }

  if (!posts || posts?.length === 0) {
    return <ErrorComponent message="No properties found for this search." />;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
      {posts?.map((property) => (
        <PropertyCard
          key={property._id}
          propertyId={property._id}
          title={property.title}
          description={`${property.bedCount || 0} bedrooms, ${
            property.bathCount || 0
          } baths`}
          price={`$${property.price || 0} per month`}
          imageSrc={property.photos[0]?.url || "/next.svg"}
        />
      ))}
    </section>
  );
}
