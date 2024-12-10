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

export default function Banner() {
  return (
    <div className="md:flex gap-8 items-center">
      <div className="md:w-1/3 ">
        <h2 className="text-2xl text-purple font-bold pb-4">
          Upload and share study materials, create a collective knowledge base,
          and learn from each others perspectives.
        </h2>
        <br />
      </div>
      <div className="md:w-2/3 mx-auto p-2 border-4 border-blue-200">
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
