"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./css/SearchBar.css";
import { useLazyGetAddressQuery } from "@/store/services/address-service";

export const SearchBar = ({ setResults }: { setResults: any }) => {
  const [input, setInput] = useState("");
  const [getAddress] = useLazyGetAddressQuery();

  const fetchData = async (value: string) => {
    const response = await getAddress(value);
    const { data, error, isSuccess } = response;
    if (isSuccess) {
      setResults(data);
    } else {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (value: any) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch color="#5c4cda" id="search-icon" />
      <input
        placeholder="Enter an address, city, or ZIP code"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
