import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';           // Import core Swiper styles
import 'swiper/css/navigation'; // Import Navigation module styles
import 'swiper/css/pagination'; // Import Pagination module styles

// Import Swiper modules
import { Navigation, Pagination } from 'swiper/modules';

const Slider = () => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]} // Include the modules here
    >
      <SwiperSlide><div className="bg-blue-500 h-64 flex justify-center items-center text-white">Slide 1</div></SwiperSlide>
      <SwiperSlide><div className="bg-red-500 h-64 flex justify-center items-center text-white">Slide 2</div></SwiperSlide>
      <SwiperSlide><div className="bg-green-500 h-64 flex justify-center items-center text-white">Slide 3</div></SwiperSlide>
      <SwiperSlide><div className="bg-purple-500 h-64 flex justify-center items-center text-white">Slide 4</div></SwiperSlide>
    </Swiper>
  );
};

export default Slider;
