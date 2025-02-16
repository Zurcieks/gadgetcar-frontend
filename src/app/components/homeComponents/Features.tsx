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
    icon: <Truck size={30} />,
  },
  {
    name: "Wsparcie 24/7",
    description: "Pomoc przez całą dobę",
    icon: <Headset size={30} />,
  },
  {
    name: "Bezpieczeństwo",
    description: "Zabezpieczone płatności",
    icon: <ShieldCheck size={30} />,
  },
  {
    name: "30 dni na zwrot",
    description: "Masz 30 dni na zwrot",
    icon: <RotateCcw size={30} />,
  },
];

const Features = () => {
  return (
    <div className="bg-gray-950 dark:bg-black text-white h-auto border-white">
      <div className="container mx-auto ">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}  
          slidesPerView="auto"  
    
          autoplay={{delay: 3000}}
          breakpoints={{
            640: {
              slidesPerView: 2, 
            },
            1024: {
              slidesPerView: 4,  
            },
          }}
        >
          {features.map((feature, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center p-4 rounded-lg">
                <div className="mr-4">{feature.icon}</div>
                <div>
                  <h3 className=" text-md lg:text-lg  font-semibold">{feature.name}</h3>
                  <p className="text-sm  text-gray-400">{feature.description}</p>
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
