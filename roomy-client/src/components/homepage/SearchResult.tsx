"use client";

import { Address } from "@/store/services/address-service";
import "./css/SearchResult.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setAddress, setCityName } from "@/store/slices/addListing-slice";
import { Dispatch, SetStateAction } from "react";
import { usePathname, useRouter } from "next/navigation";

interface SearchResultProps {
  result: Address;
  showResults: Dispatch<SetStateAction<boolean>>;
}

export const SearchResult = ({ result, showResults }: SearchResultProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div
      style={{ borderBottom: "1.5px solid #ececec", textAlign: "left" }}
      className="search-result"
      onClick={() => {
        console.log(result, "result");
        dispatch(setAddress(result));
        dispatch(setCityName(result.city));
        showResults(false);
        if (pathname === "/" || pathname === "/homepage" || pathname === "/all-listings") {
          router.push(`/all-listings?city=${result.city}`);
        }
      }}
    >
      {`${result.streetAddress}`}
    </div>
  );
};
