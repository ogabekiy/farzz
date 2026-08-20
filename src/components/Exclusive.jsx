'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import apartments from '@/data/apartments.json';
import Image from 'next/image';
import { MapPin, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function Exclusive() {
  const locale = useLocale();
  const [visibleCount, setVisibleCount] = useState(6);
  const loadMoreRef = useRef(null);

  const t = useTranslations("Exclusive");

  const localized = apartments.map(item => ({
    id: item.id,
    ...item.language_versions[locale],
  })); 

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || visibleCount >= localized.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((current) => Math.min(current + 6, localized.length));
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [localized.length, visibleCount]);

  return (
    <section className="py-12 px-4 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center"> {t("title")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {localized.slice(0, visibleCount).map((apartment) => {
          const image = apartment.images?.[0];

          return (
            <div
              key={apartment.id}
              className="bg-white rounded-2xl border shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative group">
                {image && (
                  <Link href={`/${locale}/apartments/${apartment.id}`}>
                    <Image
                      width={800}
                      height={400}
                      src={image}
                      alt={`Apartment ${apartment.id}`}
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                )}

                {/* Status */}
                <div className="absolute top-2 left-2 bg-white px-3 py-1 text-xs font-semibold rounded-xl shadow text-gray-700">
                  {apartment.status}
                </div>
              </div>

              {/* Info Section */}
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin size={16} />
                  <span>{apartment.district}, {apartment.region}</span>
                </div>

                <p className="text-gray-800 text-base leading-relaxed">
                  {apartment.price}
                </p>

                <div>
                <div className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-1">
                  <Building2 size={16} className="text-gray-700" />
                  <span>{t("rooms")}</span>
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
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">💰 {t("pay")}:</h4>
                  <p className="text-sm text-gray-600">
                    {t("initial_payment")}: {apartment.payment?.initial_payment},
                    {t("installment")}: {apartment.payment?.installment}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {visibleCount < localized.length && (
        <div ref={loadMoreRef} className="h-10" aria-hidden="true" />
      )}
    </section>
  );
}
