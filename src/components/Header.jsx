"use client";
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export default function Header() {
  const t = useTranslations("HomePage");
  
  return (
    <section className="relative bg-[#0e1e3a] text-white pt-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpeg"
          alt="Real estate in Turkey"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>
      
      <div className="absolute top-10 left-5 w-24 h-24 sm:w-32 sm:h-32 bg-[#1e7bff] rounded-full opacity-10 blur-xl"></div>
      <div className="absolute bottom-10 right-5 w-32 h-32 sm:w-40 sm:h-40 bg-[#1e7bff] rounded-full opacity-10 blur-xl"></div>
      
      <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10 flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
          Real estate in Turkey
        </h1>
        
        <div className="h-1 w-48 sm:w-64 bg-gradient-to-r from-[#1e7bff] to-[#5e9fff] mb-6 sm:mb-8 rounded-full"></div>
        
        <div className="relative my-6 sm:my-8 max-w-3xl w-full">
          <div className="absolute inset-0 bg-[#174d99]/20 backdrop-blur-sm rounded-lg -z-10"></div>
          <div className="border-l-4 border-[#1e7bff] rounded-lg p-4 sm:p-5">
            <p className="text-lg sm:text-xl md:text-2xl italic text-white font-light">
              <span className="text-[#1e7bff] font-semibold">FARZZ GROUP</span> — {t("fazz")}
            </p>
          </div>
        </div>
        
        <button className="group bg-[#174d99] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg hover:bg-[#1a6de0] transition-all flex items-center gap-2">
          {t("leave")}
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}