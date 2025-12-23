// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

// // Import images
// import csImage from "../images/ComputerScienceand IT-min.c7f0944a13a56918092d.webp";
// import teacherImage from "../images/teachertrainingicon-min.d40201f607973d2c2b83.webp";
// import hospitalImage from "../images/HospitalandHealhManagementicon-min.6e9b09d997aa34cdd722.webp";
// import beautyImage from "../images/BeautyWellnessandCosmetics-min.bb3992c2b746aba3f411.webp";
// import artsImage from "../images/ArtsandPaintings-min.33d059186ae9a38d8308.webp";
// import tailoringImage from "../images/Tailoring-min.586f38717e25555646c2.webp";
// import businessImage from "../images/BusinessManagement-min.3f01e97603804d6dcb67.webp";
// import safetyImage from "../images/safety-management-leadership-min.7c10e6107c9ecccdfaf1.webp";

// // Program data
// const programs = [
//   { title: "Computer Science and IT", img: csImage },
//   { title: "Teacher Training", img: teacherImage },
//   { title: "Hospital and Health Management", img: hospitalImage },
//   { title: "Beauty, Wellness and Cosmetics", img: beautyImage },
//   { title: "Arts and Paintings", img: artsImage },
//   { title: "Tailoring", img: tailoringImage },
//   { title: "Business Management", img: businessImage },
//   { title: "Safety Management", img: safetyImage },
// ];

// export default function Gallery() {
//   return (
//     <div className="bg-white py-10">
//       {/* Section Title */}
//       <div className="text-center mb-10">
//         <h2 className="text-3xl font-bold text-blue-900 uppercase">
//          Gallery
//         </h2>
//       </div>

//       {/* Swiper Slider */}
//       <div className="relative px-6 md:px-16">
// <Swiper
//   modules={[Navigation]}
//   navigation={{
//     nextEl: ".gallery-next", // unique class for this slider
//     prevEl: ".gallery-prev",
//   }}
//   spaceBetween={20}
//   slidesPerView={5}
//   slidesPerGroup={1}
//   loop={true}
// >
//   {programs.map((program, index) => (
//     <SwiperSlide key={index}>
//       <div className="relative rounded-xl overflow-hidden shadow-md group">
//         <img
//           src={program.img}
//           alt={program.title}
//           className="w-full h-38 object-cover transform transition-transform duration-500 group-hover:scale-110"
//         />
//       </div>
//     </SwiperSlide>
//   ))}
// </Swiper>

// {/* Custom Navigation Arrows */}
// <button className="gallery-prev absolute top-1/2 left-6 md:left-10 transform -translate-y-1/2 bg-blue-900 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-blue-800 transition z-10">
//   <FontAwesomeIcon icon={faArrowLeft} />
// </button>

// <button className="gallery-next absolute top-1/2 right-6 md:right-10 transform -translate-y-1/2 bg-blue-900 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-blue-800 transition z-10">
//   <FontAwesomeIcon icon={faArrowRight} />
// </button>




//       </div>

//       {/* Button */}
//       <div className="text-center mt-10">
//         <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
//           Explore More
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Gallery() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetch("https://api.iist.ind.in/api/gallery")
      .then((res) => res.json())
      .then((data) => setPrograms(data));
  }, []);

  return (
    <div className="bg-white py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-blue-900 uppercase">Gallery</h2>
      </div>

      <div className="relative px-6 md:px-16">
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".gallery-next",
            prevEl: ".gallery-prev",
          }}
          spaceBetween={20}
          slidesPerView={5} // default for desktop
          slidesPerGroup={1}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: 2, // mobile view
              slidesPerGroup: 1,
            },
            640: {
              slidesPerView: 3,
              slidesPerGroup: 1,
            },
            1024: {
              slidesPerView: 5, // desktop
              slidesPerGroup: 1,
            },
          }}
        >
          {programs.map((program, index) => (
            <SwiperSlide key={index}>
              <div className="relative rounded-xl overflow-hidden shadow-md group">
                <img
                  src={`http://localhost:5000${program.image}`}
                  alt={program.title}
                  className="w-full h-38 object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Arrows */}
        <button className="gallery-prev absolute top-1/2 left-6 md:left-10 transform -translate-y-1/2 bg-blue-900 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-blue-800 transition z-10">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button className="gallery-next absolute top-1/2 right-6 md:right-10 transform -translate-y-1/2 bg-blue-900 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-blue-800 transition z-10">
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
}
