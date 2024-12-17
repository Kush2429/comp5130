"use client";
import React, { useState } from "react";
import SearchBox from "./SearchBox";
import { SearchBar } from "./SearchBar";
import { SearchResultsList } from "./SearchResultsList";
import { Address } from "@/store/services/address-service";

export default function AddressSearch() {
  const [results, setResults] = useState<Address[] | null>(null);

  return (
    <div>
      <div className="App">
        <div className="search-bar-container">
          <SearchBar setResults={setResults} />
          {results && results.length > 0 && <SearchResultsList results={results} />}
        </div>
      </div>
    </div>
  );
}
