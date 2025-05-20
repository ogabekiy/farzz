'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import apartments from '@/data/apartments.json';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Building2,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AllApartments() {
  const locale = useLocale();
  const t = useTranslations('Exclusive');
  const [visibleCount, setVisibleCount] = useState(6);
  const searchParams = useSearchParams();
  const selectedRegion = searchParams.get('region');

  const localized = apartments
    .filter((item) => {
      if (!selectedRegion) return true;
      return item.region?.toLowerCase() === selectedRegion.toLowerCase();
    })
    .map((item) => ({
      id: item.id,
      region: item.region,
      ...item.language_versions[locale],
    }));

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div>
      <Navbar />
      <section className="py-12 px-4 max-w-screen-xl mx-auto">

        {/* Region Filter */}
        <div className="flex justify-center gap-4 mb-10">
          <Link
            href={`/${locale}/apartments`}
            className={`text-sm px-4 py-2 rounded-full border ${
              !selectedRegion ? 'bg-[#174d99] text-white' : 'hover:bg-gray-100'
            } transition`}
          >
            {t('all')}
          </Link>
          <Link
            href={`/${locale}/apartments?region=anatoliya`}
            className={`text-sm px-4 py-2 rounded-full border ${
              selectedRegion === 'anatoliya'
                ? 'bg-[#174d99] text-white'
                : 'hover:bg-gray-100'
            } transition`}
          >
          {t('anatoly')}
          </Link>
          <Link
            href={`/${locale}/apartments?region=europe`}
            className={`text-sm px-4 py-2 rounded-full border ${
              selectedRegion === 'europe'
                ? 'bg-[#174d99] text-white'
                : 'hover:bg-gray-100'
            } transition`}
          >
            {t('europe')}
          </Link>
        </div>

        {/* Apartments List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {localized.slice(0, visibleCount).map((apartment, index) => {
            const swiperId = `swiper-${apartment.id}`;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative group">
                  {/* Custom Navigation */}
                  <button
                    className={`absolute top-1/2 left-2 z-10 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black/30 hover:bg-black/50 transition p-1 rounded-full ${swiperId}-prev`}
                  >
                    <ChevronLeft className="text-white" size={20} />
                  </button>
                  <button
                    className={`absolute top-1/2 right-2 z-10 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black/30 hover:bg-black/50 transition p-1 rounded-full ${swiperId}-next`}
                  >
                    <ChevronRight className="text-white" size={20} />
                  </button>

                  <Swiper
                    navigation={{
                      prevEl: `.${swiperId}-prev`,
                      nextEl: `.${swiperId}-next`,
                    }}
                    modules={[Navigation]}
                    className="rounded-t-2xl"
                  >
                    {(apartment.images || []).map((img, idx) => (
                      <SwiperSlide key={idx}>
                        <Link href={`/${locale}/apartments/${apartment.id}`}>
                          <Image
                            width={800}
                            height={400}
                            src={img}
                            alt={`Apartment ${apartment.id}`}
                            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Status */}
                  <div className="absolute top-2 left-2 bg-white px-3 py-1 text-xs font-semibold rounded-xl shadow text-gray-700">
                    {apartment.status}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <MapPin size={16} />
                    <span>
                      {apartment.district}, {apartment.region}
                    </span>
                  </div>

                  <p className="text-gray-800 text-base leading-relaxed">
                    {apartment.price}
                  </p>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {apartment.description || ''}
                  </p>

                  <div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-1">
                      <Building2 size={16} className="text-gray-700" />
                      <span>{t('rooms')}</span>
                    </div>
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
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">
                      💰 {t('pay')}:
                    </h4>
                    <p className="text-sm text-gray-600">
                      {t('initial_payment')}: {apartment.payment?.initial_payment},
                      {t('installment')}: {apartment.payment?.installment}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* See More Button */}
        {visibleCount < localized.length && (
          <button
            onClick={handleSeeMore}
            className="group bg-[#174d99] mx-auto mt-10 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg hover:bg-[#1a6de0] transition-all flex items-center gap-2"
          >
            {t('see_more')}...
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        {/* Hide Swiper default arrows */}
        <style jsx global>{`
          .swiper-button-prev::after,
          .swiper-button-next::after {
            display: none;
          }
        `}</style>
      </section>
      <Footer />
    </div>
  );
}
