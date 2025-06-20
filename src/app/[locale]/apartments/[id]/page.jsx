"use client";
import React from 'react';
import apartments from '@/data/apartments.json';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { 
  Home, MapPin, BadgeDollarSign, ListChecks, Info, Landmark, 
  Phone, Instagram, Youtube, MessageCircle, Building2, 
  BedDouble, Bath, Car, Star, Heart, ArrowRight, PlayCircle 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Exclusive from '@/components/Exclusive';
import Footer from '@/components/Footer';

export default function OneApartment({ params: paramsPromise }) {
  const params = React.use(paramsPromise); 
  const { id, locale } = params;

  const apartment = apartments.find((apt) => apt.id === Number(id));
  
  if (!apartment) {
    return (
      <div>
        <Navbar />
        <div className="text-center py-20 text-xl">
          Apartment not found
        </div>
        <Footer />
      </div>
    );
  }
  
  const data = apartment?.language_versions[locale] || 
    apartment?.language_versions[Object.keys(apartment.language_versions)[0]];
  
  // Early return if no data in any language
  if (!data) {
    return (
      <div>
        <Navbar />
        <div className="text-center py-20 text-xl">
          Apartment data not available
        </div>
        <Footer />
      </div>
    );
  }

  const [selectedMedia, setSelectedMedia] = React.useState({ 
    type: data.images?.length > 0 ? 'image' : (data.videos?.length > 0 ? 'video' : null), 
    src: data.images?.length > 0 ? data.images[0] : (data.videos?.length > 0 ? data.videos[0] : null),
    index: 0
  });

  const swiperRef = React.useRef(null);

  const handleSelect = (src, type, index) => {
    setSelectedMedia({ src, type, index });
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const contactInfo = {
    phone: '+90 (507)-254-78-78',
    whatsapp: '+90 (507)-254-78-78',
    telegram: '+90 (507)-254-78-78',
    instagram: 'https://instagram.com/farzzgroup',
    youtube: 'https://www.youtube.com/@FARZZGROUP',
  };

  // Ensure all arrays exist to prevent mapping errors
  const images = data.images || [];
  const videos = data.videos || [];
  const plans = data.plans || [];
  const advantages = data.advantages || [];
  const distances = data.distances || {};
  const amenities = data.amenities || [];
  const suitableFor = data.suitable_for || [];

  return (
    <div>
      <Navbar/>
      <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3 animate-fade-in">
              <Home className="w-8 h-8 text-blue-500" strokeWidth={2.5} /> 
              {data.district}
            </h1>

            {/* Main Media Swiper */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                  nextEl: '.swiper-button-next-main',
                  prevEl: '.swiper-button-prev-main',
                }}
                pagination={{ clickable: true }}
                className="w-full aspect-video main-swiper"
                ref={swiperRef}
                onSlideChange={(swiper) => {
                  const index = swiper.activeIndex;
                  const isImage = index < images.length;
                  setSelectedMedia({
                    type: isImage ? 'image' : 'video',
                    src: isImage ? images[index] : videos[index - images.length],
                    index: index
                  });
                }}
              >
                {images.map((img, i) => (
                  <SwiperSlide key={`img-${i}`}>
                    <Image
                      src={img}
                      alt={`Apartment Image ${i + 1}`}
                      width={1280}
                      height={720}
                      className="object-cover w-full h-full"
                    />
                  </SwiperSlide>
                ))}
                {videos.map((vid, i) => (
                  <SwiperSlide key={`vid-${i}`}>
                    <iframe
                      src={vid}
                      className="w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  </SwiperSlide>
                ))}
                <div className="swiper-button-prev-main"></div>
                <div className="swiper-button-next-main"></div>
              </Swiper>
            </div>

            {/* Thumbnail Swiper */}
            {(images.length > 0 || videos.length > 0) && (
              <Swiper
                modules={[Navigation]}
                slidesPerView={3}
                spaceBetween={10}
                navigation={{
                  nextEl: '.swiper-button-next-thumb',
                  prevEl: '.swiper-button-prev-thumb',
                }}
                className="w-full py-2 thumb-swiper"
                breakpoints={{
                  640: { slidesPerView: 4 },
                  768: { slidesPerView: 5 },
                }}
              >
                {images.map((img, i) => (
                  <SwiperSlide key={`thumb-img-${i}`}>
                    <Image
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      width={150}
                      height={90}
                      className={`rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 object-cover h-20 ${
                        selectedMedia.src === img && selectedMedia.type === 'image'
                          ? 'border-4 border-blue-500 scale-105'
                          : 'border border-gray-200'
                      }`}
                      onClick={() => handleSelect(img, 'image', i)}
                    />
                  </SwiperSlide>
                ))}
                {videos.map((vid, i) => (
                  <SwiperSlide key={`thumb-vid-${i}`}>
                    <div
                      className={`relative h-20 bg-gray-200 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300 flex items-center justify-center ${
                        selectedMedia.src === vid && selectedMedia.type === 'video'
                          ? 'border-4 border-blue-500 scale-105'
                          : 'border border-gray-200'
                      }`}
                      onClick={() => handleSelect(vid, 'video', i + images.length)}
                    >
                      <PlayCircle className="w-8 h-8 text-blue-500" />
                    </div>
                  </SwiperSlide>
                ))}
                <div className="swiper-button-prev-thumb"></div>
                <div className="swiper-button-next-thumb"></div>
              </Swiper>
            )}

            {/* Apartment Details - Grid Layout */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 animate-slide-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="flex items-center gap-2 text-lg font-medium text-gray-700">
                  <MapPin className="w-6 h-6 text-green-500" /> {data.region || ''}
                </p>
                <p className="flex items-center gap-2 text-lg font-medium text-gray-700">
                  <BadgeDollarSign className="w-6 h-6 text-yellow-500" /> {data.price || ''}
                </p>
                <p className="flex items-center gap-2 text-lg font-medium text-gray-700">
                  <ListChecks className="w-6 h-6 text-purple-500" /> {data.status || ''}
                </p>
                <p className="flex items-center gap-2 text-lg font-medium text-gray-700">
                  <Building2 className="w-6 h-6 text-blue-500" /> {data.type || 'Apartment'}
                </p>
              </div>
              
              {/* Feature Sections in Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                      <Info className="w-6 h-6 text-blue-500" /> {locale === 'uz' ? 'Tavsif' : 'Описание'}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mt-2">{data.description || ''}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <BedDouble className="w-6 h-6 text-indigo-500" /> {locale === 'uz' ? "Xonalar" : 'Планировки'}
                    </h3>
                    <ul className="list-none space-y-2 mt-2">
                      {plans.map((plan, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <ArrowRight className="w-4 h-4 text-indigo-500" /> {plan}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <BadgeDollarSign className="w-6 h-6 text-yellow-500" /> {locale === 'uz' ? "To'lov shartlari" : 'Условия оплаты'}
                    </h3>
                    {data.payment && (
                      <>
                        <p className="text-gray-600 mt-2">{locale === 'uz' ? "Boshlang'ich to'lov:" : 'Первоначальный взнос:'} {data.payment.initial_payment}</p>
                        <p className="text-gray-600">{locale === 'uz' ? "Bo'lib tolash:" : 'Рассрочка:'} {data.payment.installment}</p>
                      </>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <Star className="w-6 h-6 text-yellow-500" /> {locale === 'uz' ? 'Afzalliklar' : 'Преимущества'}
                    </h3>
                    <ul className="list-none space-y-2 mt-2">
                      {advantages.map((adv, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <Heart className="w-4 h-4 text-red-500" /> {adv}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <MapPin className="w-6 h-6 text-green-500" /> {locale === 'uz' ? 'Masofalar' : 'Расстояния'}
                    </h3>
                    <ul className="list-none space-y-2 mt-2">
                      {Object.entries(distances).map(([place, time]) => (
                        <li key={place} className="flex items-center gap-2 text-gray-600">
                          <ArrowRight className="w-4 h-4 text-green-500" /> {place}: {time}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <Bath className="w-6 h-6 text-blue-500" /> {locale === 'uz' ? 'Qulayliklar' : 'Удобства'}
                    </h3>
                    <ul className="list-none space-y-2 mt-2">
                      {amenities.map((a, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <ArrowRight className="w-4 h-4 text-blue-500" /> {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <Car className="w-6 h-6 text-gray-500" /> {locale === 'uz' ? 'Mos keladi' : 'Подходит для'}
                    </h3>
                    <ul className="list-none space-y-2 mt-2">
                      {suitableFor.map((s, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <ArrowRight className="w-4 h-4 text-gray-500" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-xl p-6 sticky top-32 space-y-6 animate-slide-up">
              <h2 className="text-2xl font-bold flex items-center gap-2">
               {locale === 'uz' ? "Bog'lanish" : 'Контакты'}
              </h2>
              <div className="space-y-4">
                <p className="flex items-center gap-2">
                  <Phone className="w-5 h-5" /> {data.contact || contactInfo.phone}
                </p>
                <p className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" /> WhatsApp: {contactInfo.whatsapp}
                </p>
                <p className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" /> Telegram: {contactInfo.telegram}
                </p>
                <a
                  href={contactInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:underline"
                >
                  <Instagram className="w-5 h-5" /> Instagram
                </a>
                
              </div>
              <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                {locale === 'uz' ? "Hoziroq bog'lanish" : 'Связаться сейчас'} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Custom CSS for Animations and Swiper Navigation */}
        <style jsx>{`
          .animate-fade-in {
            animation: fadeIn 1s ease-in-out;
          }
          .animate-slide-up {
            animation: slideUp 0.8s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          
          /* Custom swiper navigation buttons */
          .main-swiper .swiper-button-next-main,
          .main-swiper .swiper-button-prev-main,
          .thumb-swiper .swiper-button-next-thumb,
          .thumb-swiper .swiper-button-prev-thumb {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 10;
            width: 40px;
            height: 40px;
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          
          .main-swiper .swiper-button-prev-main,
          .thumb-swiper .swiper-button-prev-thumb {
            left: 10px;
          }
          
          .main-swiper .swiper-button-next-main,
          .thumb-swiper .swiper-button-next-thumb {
            right: 10px;
          }
          
          .main-swiper .swiper-button-next-main:after,
          .main-swiper .swiper-button-prev-main:after,
          .thumb-swiper .swiper-button-next-thumb:after,
          .thumb-swiper .swiper-button-prev-thumb:after {
            font-family: 'swiper-icons';
            font-size: 20px;
            text-transform: none !important;
          }
          
          .main-swiper .swiper-button-prev-main:after,
          .thumb-swiper .swiper-button-prev-thumb:after {
            content: 'prev';
          }
          
          .main-swiper .swiper-button-next-main:after,
          .thumb-swiper .swiper-button-next-thumb:after {
            content: 'next';
          }
          
          .thumb-swiper .swiper-button-next-thumb,
          .thumb-swiper .swiper-button-prev-thumb {
            width: 30px;
            height: 30px;
          }
          
          .thumb-swiper .swiper-button-next-thumb:after,
          .thumb-swiper .swiper-button-prev-thumb:after {
            font-size: 14px;
          }
        `}</style>
      </div>
      <Exclusive/>
      <Footer/>
    </div>
  );
}