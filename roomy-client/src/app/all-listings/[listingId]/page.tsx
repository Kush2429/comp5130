import PropertyInfo from "@/components/all-listings/PropertyInfo";

interface Params {
  listingId: string;
}

export default function PropertyPage({ params }: { params: Params }) {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <PropertyInfo propertyId={params.listingId.toString()}></PropertyInfo>
    </div>
  );
}
