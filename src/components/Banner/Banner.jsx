// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import slide1 from "../../assets/images/2.study.png";
import slide2 from "../../assets/images/3.study.jpg";
import slide3 from "../../assets/images/4.study.jpg";
import slide4 from "../../assets/images/1.study.jpg";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "./Slide";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="flex gap-8 items-center">
    <div className="w-1/3 text-center">

        <h2 className="text-2xl font-bold">Upload and share study materials, create a collective knowledge base, and learn from each others perspectives.</h2>
        <br />
          <Link to='/addBook' className='w-full px-5 py-4 mt-4 text-sm font-medium text-sky-700 capitalize transition-colors duration-300 transform bg-white rounded-md lg:w-auto hover:bg-pink-200 focus:outline-none focus:bg-gray-500'>
            Add your favorite books
          </Link>
        </div>
        <div className="w-2/3 mx-auto p-2 border border-4 border-blue-100">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide image={slide1}></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={slide2}></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={slide3}></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide image={slide4}></Slide>
        </SwiperSlide>
      </Swiper>
    </div>
    </div>
  );
}
