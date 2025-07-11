"use client";

import { usePhotographerContext } from "@/context/PhotographerContext";
import PhotographerCard from "@/components/PhotographerCard";
import SearchBar from "@/components/SearchBar";
import FiltersSidebar from "@/components/FiltersSidebar";
import SortDropdown from "@/components/SortDropdown";

export default function Home() {
  const {
    filteredPhotographers,
    loading,
    photographers,
    paginationPage,
    setPaginationPage,
  } = usePhotographerContext();

  const hasMore = filteredPhotographers.length < photographers.length;

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Photographers</h1>
      <SearchBar />

      <div className="flex flex-col sm:flex-row gap-6">
        <FiltersSidebar />

        <div className="flex-1">
          <SortDropdown />

          {loading ? (
            <p>Loading...</p>
          ) : filteredPhotographers.length === 0 ? (
            <p>No photographers found.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredPhotographers.map((photographer) => (
                  <PhotographerCard
                    key={photographer.id}
                    photographer={photographer}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="text-center mt-6">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => setPaginationPage(paginationPage + 1)}
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
