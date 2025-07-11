"use client";

import { useEffect, useState } from "react";
import { usePhotographerContext } from "../context/PhotographerContext";

const stylesList = ["Traditional", "Candid", "Studio", "Outdoor", "Indoor"];
const cities = ["Bengaluru", "Delhi", "Mumbai", "Hyderabad"];

const FiltersSidebar = () => {
  const { filters, setFilters } = usePhotographerContext();
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setFilters(localFilters);
  }, [localFilters]);

  return (
    <aside className="bg-black p-4 rounded shadow w-full sm:w-64 mb-6 sm:mb-0">
      {/* Price Range */}
      <div className="mb-4">
        <h3 className="font-semibold mb-1">Price Range (₹)</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={localFilters.priceRange[0]}
            min={0}
            className="w-20 p-1 border rounded text-sm"
            onChange={(e) =>
              setLocalFilters({
                ...localFilters,
                priceRange: [
                  parseInt(e.target.value),
                  localFilters.priceRange[1],
                ],
              })
            }
          />
          <span>—</span>
          <input
            type="number"
            value={localFilters.priceRange[1]}
            className="w-20 p-1 border rounded text-sm"
            onChange={(e) =>
              setLocalFilters({
                ...localFilters,
                priceRange: [
                  localFilters.priceRange[0],
                  parseInt(e.target.value),
                ],
              })
            }
          />
        </div>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <h3 className="font-semibold mb-1">Minimum Rating</h3>
        <select
          value={localFilters.rating}
          onChange={(e) =>
            setLocalFilters({
              ...localFilters,
              rating: parseFloat(e.target.value),
            })
          }
          className="w-full border rounded p-1 text-sm text-gray-400"
        >
          <option value={0}>All</option>
          <option value={4}>4+</option>
          <option value={3}>3+</option>
        </select>
      </div>

      {/* Styles */}
      <div className="mb-4">
        <h3 className="font-semibold mb-1">Styles</h3>
        <div className="flex flex-wrap gap-2">
          {stylesList.map((style) => (
            <label key={style} className="flex items-center gap-1 text-sm">
              <input
                type="checkbox"
                checked={localFilters.styles.includes(style)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  const updatedStyles = checked
                    ? [...localFilters.styles, style]
                    : localFilters.styles.filter((s) => s !== style);

                  setLocalFilters({ ...localFilters, styles: updatedStyles });
                }}
              />
              {style}
            </label>
          ))}
        </div>
      </div>

      {/* City Dropdown */}
      <div className="mb-4">
        <h3 className="font-semibold mb-1">City</h3>
        <select
          value={localFilters.city}
          onChange={(e) =>
            setLocalFilters({ ...localFilters, city: e.target.value })
          }
          className="w-full border rounded p-1 text-sm text-gray-400"
        >
          <option value="">All</option>
          {cities.map((city) => (
            <option value={city} key={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
