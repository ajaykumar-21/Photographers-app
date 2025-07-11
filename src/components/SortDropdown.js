"use client";

import { usePhotographerContext } from "../context/PhotographerContext";

const SortDropdown = () => {
  const { sort, setSort } = usePhotographerContext();

  return (
    <div className="mb-6 text-right">
      <label className="text-sm font-medium mr-2">Sort by:</label>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border rounded px-2 py-1 text-sm text-gray-400"
      >
        <option value="recent">Recently Added</option>
        <option value="priceLowToHigh">Price: Low to High</option>
        <option value="ratingHighToLow">Rating: High to Low</option>
      </select>
    </div>
  );
};

export default SortDropdown;
