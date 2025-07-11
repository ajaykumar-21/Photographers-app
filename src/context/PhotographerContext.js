"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PhotographerContext = createContext();

export const usePhotographerContext = () => {
  const context = useContext(PhotographerContext);
  return context;
};

export const PhotographerProvider = ({ children }) => {
  const [photographers, setPhotographers] = useState([]);
  const [filteredPhotographers, setFilteredPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    priceRange: [0, 20000],
    rating: 0,
    styles: [],
    city: "",
  });

  const [sort, setSort] = useState("recent");
  const [paginationPage, setPaginationPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch data from JSON server
  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const res = await fetch("http://localhost:3001/photographers");
        const data = await res.json();
        // console.log(data);
        setPhotographers(data);
        setFilteredPhotographers(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographers();
  }, []);

  // Apply search, filters, sort
  useEffect(() => {
    let updated = [...photographers];

    // Search by name/location/tags (simple fuzzy)
    if (search.trim()) {
      const term = search.toLowerCase();
      updated = updated.filter((p) =>
        [p.name, p.location, ...(p.tags || [])].some((field) =>
          field.toLowerCase().includes(term)
        )
      );
    }

    // Filter: price
    updated = updated.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filter: rating
    if (filters.rating > 0) {
      updated = updated.filter((p) => p.rating >= filters.rating);
    }

    // Filter: styles
    if (filters.styles.length > 0) {
      updated = updated.filter((p) =>
        filters.styles.every((style) => p.styles.includes(style))
      );
    }

    // Filter: city
    if (filters.city) {
      updated = updated.filter((p) => p.location === filters.city);
    }

    // Sort
    if (sort === "priceLowToHigh") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sort === "ratingHighToLow") {
      updated.sort((a, b) => b.rating - a.rating);
    } else if (sort === "recent") {
      updated.sort((a, b) => b.id - a.id); // assume higher ID = more recent
    }

    // Apply pagination (load more)
    const startIndex = 0;
    const endIndex = paginationPage * itemsPerPage;
    setFilteredPhotographers(updated.slice(startIndex, endIndex));
  }, [photographers, search, filters, sort, paginationPage]);

  return (
    <PhotographerContext.Provider
      value={{
        photographers,
        filteredPhotographers,
        loading,
        search,
        filters,
        sort,
        setSearch,
        setFilters,
        setSort,
        paginationPage,
        setPaginationPage,
      }}
    >
      {children}
    </PhotographerContext.Provider>
  );
};
