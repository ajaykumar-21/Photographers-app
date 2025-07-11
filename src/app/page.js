"use client";

import { usePhotographerContext } from "@/context/PhotographerContext";
import PhotographerCard from "@/components/PhotographerCard";

export default function Home() {
  const { filteredPhotographers, loading } = usePhotographerContext();
  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Photographers</h1>

      {loading ? (
        <p>Loading...</p>
      ) : filteredPhotographers.length === 0 ? (
        <p>No photographers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPhotographers.map((photographer) => (
            <PhotographerCard
              key={photographer.id}
              photographer={photographer}
            />
          ))}
        </div>
      )}
    </main>
  );
}
