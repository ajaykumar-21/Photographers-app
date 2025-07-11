"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import data from "../../data/photographers.json";

export default function PhotographerProfilePage() {
  const { id } = useParams();
  //   console.log(typeof(parseInt(id)))
  const [photographer, setPhotographer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInquiry, setShowInquiry] = useState(false);

  //   useEffect(() => {
  //     const fetchPhotographer = async () => {
  //       try {
  //         const res = await fetch(
  //           `http://localhost:3001/photographers/${parseInt(id)}`
  //         );
  //         // console.log(res);
  //         if (!res.ok) throw new Error("Photographer not found");
  //         const data = await res.json();
  //         setPhotographer(data);
  //         setLoading(false);
  //       } catch (err) {
  //         console.error("Failed to load photographer:", err);
  //         setLoading(false);
  //       }
  //     };

  //     if (id) {
  //       fetchPhotographer();
  //     }
  //   }, [id]);

  useEffect(() => {
    // Function to simulate fetching a single photographer by ID
    const fetchPhotographer = async () => {
      // Find the photographer whose ID matches the dynamic route param
      const found = data.photographers.find((p) => p.id === parseInt(id));
      if (found) {
        // Set the found photographer in state
        setPhotographer(found);
      } else {
        // If no match, set to null (used to show "not found" UI)
        setPhotographer(null);
      }
      setLoading(false);
    };

    if (id) fetchPhotographer(); // Only run fetch if ID param is available
  }, [id]);

  if (loading) return <div className="p-8">Loading profile...</div>;

  if (!photographer)
    return <div className="p-8 text-red-600">Photographer not found</div>;

  const { name, bio, price, styles, tags, portfolio, reviews } = photographer;
  console.log(portfolio);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <p className="text-gray-600 mb-4">{bio}</p>

      <div className="mb-4">
        <p className="font-semibold">Price: ₹{price}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {styles.map((style, idx) => (
          <span
            key={idx}
            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
          >
            {style}
          </span>
        ))}
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Portfolio</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {portfolio.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt={`portfolio-${idx}`}
            width={300}
            height={200}
            className="w-full h-40 object-cover rounded"
          />
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">Reviews</h2>
      <div className="space-y-4 mb-6">
        {reviews.map((review, idx) => (
          <div key={idx} className="border-b pb-2">
            <p className="text-sm font-semibold">
              {review.name} • {review.rating}⭐
            </p>
            <p className="text-sm text-gray-600">{review.comment}</p>
            <p className="text-xs text-gray-400">{review.date}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowInquiry(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Send Inquiry
      </button>

      {/* Simple modal */}
      {showInquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
              onClick={() => setShowInquiry(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-900">
              Send Inquiry
            </h3>
            <input
              type="text"
              placeholder="Your name"
              className="w-full border text-gray-900 border-gray-300 px-4 py-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Your message"
              className="w-full border border-gray-300 text-gray-900 px-4 py-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
            ></textarea>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200">
              Submit
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
