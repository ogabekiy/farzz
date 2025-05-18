'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import apartments from '@/data/apartments.json';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { MapPin } from 'lucide-react';

export default function Exclusive() {
  const locale = useLocale();

  const localized = apartments.map(item => ({
    id: item.id,
    ...item.language_versions[locale],
  })).slice(0, 3); 

  return (
    <section className="py-12 px-4 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">🏡 Eksklyuziv Kvartiralar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {localized.map((apartment, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative">
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className="rounded-t-2xl"
              >
                {(apartment.images || []).map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <Image
                      width={800}
                      height={400}
                      src={img}
                      alt={`Apartment ${apartment.id}`}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute top-2 left-2 bg-white px-3 py-1 text-xs font-semibold rounded-xl shadow text-gray-700">
                {apartment.status}
              </div>
            </div>

            <div className="p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPin size={16} />
                <span>{apartment.district}, {apartment.region}</span>
              </div>

              <p className="text-gray-800 text-base leading-relaxed">
                {apartment.price}
              </p>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">🏗️ Rejalar:</h4>
                <ul className="flex flex-wrap gap-2 text-xs">
                  {(apartment.plans || []).map((plan, i) => (
                    <li
                      key={i}
                      className="px-3 py-1 bg-gray-100 rounded-full text-gray-600"
                    >
                      {plan}
                    </li>
                  ))}
                </ul>
              </div>

            

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">💰 To'lov:</h4>
                <p className="text-sm text-gray-600">
                  Boshlang'ich to'lov: {apartment.payment?.initial_payment},
                  muddat: {apartment.payment?.installment}
                </p>
              </div>

           
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
