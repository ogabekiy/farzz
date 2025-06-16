'use client';

import React from 'react';
import newApartments from '@/data/newApartments.json';
import Image from 'next/image';

export default function NewApartments() {
  return (
    <section className="py-12 px-4 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">New Apartments</h2>

      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Asia</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newApartments.asia.map((apartment, index) => (
            <ApartmentCard key={`asia-${index}`} apartment={apartment} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Europe</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newApartments.europe.map((apartment, index) => (
            <ApartmentCard key={`europe-${index}`} apartment={apartment} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ApartmentCard({ apartment }) {
  return (
    <div className="bg-white rounded-2xl border shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
      <Image
        src={apartment.img}
        alt={apartment.title}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-sm text-gray-500 font-medium">{apartment.code}</h3>
        <p className="text-base font-semibold text-gray-800">{apartment.title}</p>

        <a
          href={apartment.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm text-center hover:bg-blue-700 transition"
        >
          View
        </a>
      </div>
    </div>
  );
}
