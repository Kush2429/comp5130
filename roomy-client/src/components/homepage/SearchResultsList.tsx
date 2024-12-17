"use client";

import { use, useEffect, useState } from "react";
import { SearchResult } from "./SearchResult";
import { Address } from "@/store/services/address-service";

export const SearchResultsList = ({ results }: { results: Address[] }) => {
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (results.length > 0) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [results]);

  return (
    <div className="relative">
      <div
        style={{
          borderWidth: "2px",
          marginTop: "10px",
          borderRadius: "10px",
        }}
        className={`results-list w-50 bg-white z-50 overflow-y-auto border rounded-md shadow-md p-0 absolute top-full left-0 ${
          showResults ? "" : "hidden"
        }`}
      >
        {results.map((result, index) => (
          <SearchResult result={result} key={index} showResults={setShowResults} />
        ))}
      </div>
    </div>
  );
};
