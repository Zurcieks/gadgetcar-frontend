"use client";

import React from "react";
import { Truck, Headset, ShieldCheck, RotateCcw } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
const features = [
  {
    name: "Szybka wysyłka",
    description: "Dostawa w 24h",
    icon: <Truck size={40} />,
  },
  {
    name: "Wsparcie 24/7",
    description: "Pomoc przez całą dobę",
    icon: <Headset size={40} />,
  },
  {
    name: "Zabezpieczone płatności",
    description: "Twoje płatności są bezpieczne",
    icon: <ShieldCheck size={40} />,
  },
  {
    name: "30 dni na zwrot",
    description: "Masz 30 dni na zwrot",
    icon: <RotateCcw size={40} />,
  },
];

const Features = () => {
  return (
    <div className="bg-gray-950 text-white h-auto border-white">
      <div className="container mx-auto px-2">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20} // Odstęp pomiędzy slajdami
          slidesPerView="auto" // Dostosowanie liczby slajdów widocznych na ekranie
           // Przewijanie w kółko
          autoplay={{delay: 3000}}
          breakpoints={{
            640: {
              slidesPerView: 2, // Na małych ekranach 2 slajdy
            },
            1024: {
              slidesPerView: 4, // Na większych ekranach 4 slajdy
            },
          }}
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center p-4  rounded-lg">
                <div className="mr-4">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold">{feature.name}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Features;
