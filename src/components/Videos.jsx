'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Youtube } from 'lucide-react';

const videos = [
  {
    id: '15MwNt2eyD6CP13HNhCtTQsCXPCWfVH0i',
    title: 'Sug‘urta haqida 2023',
  },
  {
    id: '1TMGLjPaC60JvIk4va7vq8eoIOJDLVN9R',
    title: 'Kvartira sharhi - Alaniya',
  },
  {
    id: '1z8TZ2DfEbaNN8MBzZBEn-4RIKy1bWOas',
    title: 'Balkonli duplekslar',
  },
  {
    id: '18wngVeG-p1u9RThFM0VhJTMHDbkwW4C_',
    title: 'Yashash uchun joylar',
  },
  {
    id: '18aFwSCRnWEtaX4Q4Ae-On9QzUdfWrBu4',
    title: 'Narxlar va takliflar',
  },
  {
    id: '1LwK5iGnTveczFStAeRNvKl98QHjwrVQS',
    title: 'Mijozlar fikri',
  },
  {
    id: '1zWxOn30za7B4BxBShrCLGdOwiMiEhyEG',
    title: '6 sabab tanlash uchun',
  },
  {
    id: '1RDTYvnAge54L6-uDwfGc_4EIW50lH8Yq',
    title: 'Sharoitlar haqida',
  },
  {
    id: '1CKAuQsFPaWlqS7YF9eeGO-lQLoARw_gG',
    title: 'Hujjatlar va onlayn ko‘rsatmalar',
  },
];

const VideoSlider = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const { scrollLeft, clientWidth } = sliderRef.current;
    const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
    sliderRef.current.scrollTo({
      left: scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="bg-[#E6F0FA] py-12 px-4 md:px-8 sketch-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 sketch-text">Our YouTube Channel</h2>
          <p className="text-gray-600 mt-2 sketch-text">
            Video reviews of apartments, instructions for processing documents and paying taxes, our clients' testimonials, as well as videos about life in Turkey – all this is on our channel.
          </p>
        </div>

        <div className="relative">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white sketch-border p-2 rounded-full hover:bg-gray-100"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white sketch-border p-2 rounded-full hover:bg-gray-100"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          <div
            ref={sliderRef}
            className="overflow-x-auto scrollbar-hide flex space-x-6 pb-4 scroll-smooth"
          >
            {videos.map((video) => (
              <div
                key={video.id}
                className="min-w-[300px] bg-white sketch-border rounded-lg overflow-hidden sketch-shadow"
              >
                <div className="aspect-video">
                  <iframe
                    src={`https://drive.google.com/file/d/${video.id}/preview`}
                    allow="autoplay"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="p-3 text-center sketch-text">
                  {video.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-800 sketch-text">
            Go to our YouTube channel <Youtube className="ml-2 w-5 h-5 text-red-600" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoSlider;

