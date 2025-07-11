import React from "react";
import Image from "next/image";
import Link from "next/link";

const PhotographerCard = ({ photographer }) => {
  const { id, name, location, price, rating, tags, profilePic } = photographer;
  console.log(profilePic);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition">
      <Image
        src={profilePic}
        alt={name}
        width={400}
        height={300}
        className="w-full h-52 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-400">{name}</h2>
        <p className="text-sm text-gray-600">{location}</p>
        <p className="text-sm mt-1 text-gray-400">Starting from ₹{price}</p>
        <p className="text-sm mt-1 text-yellow-600">⭐ {rating}</p>

        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href={`/${id}`}
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default PhotographerCard;
