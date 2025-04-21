"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Image paths from public/assets
const images = ["/assets/1.jpg", "/assets/2.jpg", "/assets/3.jpg"];

const SwiperBanner = () => {
  return (
    <div className="relative w-full h-screen">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <Image
              src={src}
              alt={`Banner ${index + 1}`}
              fill
              className="object-cover object-top"
              priority={index === 0}
              sizes="100vw"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperBanner;
