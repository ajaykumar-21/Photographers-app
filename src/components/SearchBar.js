"use client";

import { useEffect, useRef, useState } from "react";
import { usePhotographerContext } from "../context/PhotographerContext";

const SearchBar = () => {
  const { setSearch } = usePhotographerContext();
  const [input, setInput] = useState("");
  const timerRef = useRef(null); // persist timer across renders

  // Debounced setter
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setSearch(input);
    }, 500);

    return () => clearTimeout(timerRef.current); // cleanup on unmount or input change
  }, [input]);

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search by name, city or tag..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
