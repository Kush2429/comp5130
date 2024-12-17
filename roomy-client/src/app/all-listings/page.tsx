import TomTomMap from "@/components/all-listings/TomTomMap";
import FilterListings from "@/components/all-listings/FilterListings";
import { PropertyCardList } from "@/components/all-listings/PropertyCardList";

export default function PropertiesList() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <div className="flex flex-col md:flex-row">
        <TomTomMap></TomTomMap>
        <main className="flex-1 md:max-h-[100dvh] md:overflow-y-auto">
          <FilterListings />
          <PropertyCardList></PropertyCardList>
        </main>
      </div>
    </div>
  );
}
