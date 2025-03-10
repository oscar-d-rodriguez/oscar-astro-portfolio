import React, { Fragment, useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Tag } from "@components/Tag";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import ivr from "@assets/project-ivr/ivr.png";
import e2e from "@assets/project-e2e-portfolio/e2e-portfolio.png";
import useScrollControl from "../utils/useScrollControl";
import { EffectFade, Mousewheel, Pagination } from "swiper/modules";

import "@styles/carousel.css";

const projectsData = [
   {
      name: "IVR",
      img: ivr.src,
      headline:
         "High-quality experience for automated phone system authentication ",
      tags: [
         {
            label: "Design System",
         },
         {
            label: "Front-End Dev",
         },
         {
            label: "UX Design",
         },
      ],
   },
   {
      name: "E2E PF",
      img: e2e.src,
      headline: "High-quality portfolio from idea to final product ",
      tags: [
         {
            label: "Design System",
         },
         {
            label: "Front-End Dev",
         },
         {
            label: "UX Design",
         },
         {
            label: "API design",
         },
         {
            label: "DynamoDB",
         },
         {
            label: "Backend dev",
         },
      ],
   },
];
export default function Carousel() {
   const swiperRef = useRef(null);
   const imageRef = useRef<HTMLImageElement | null>(null);
   const contenteRef = useRef<HTMLImageElement | null>(null);

   const [imageHeight, setImageHeight] = useState(768);

   const updateHeight = () => {
      if (imageRef.current && contenteRef.current) {
         setImageHeight(
            imageRef.current.clientHeight + contenteRef.current.clientHeight,
         );
      }
   };

   useEffect(() => {
      // Initial height
      updateHeight();

      // Update height on window resize or scrolling
      window.addEventListener("resize", updateHeight);
      window.addEventListener("scroll", updateHeight);

      return () => {
         window.removeEventListener("resize", updateHeight);
         window.removeEventListener("scroll", updateHeight);
      };
   }, []);
   // useScrollControl(swiperRef);
   return (
      <div className="carousel" style={{ height: imageHeight }}>
         <Swiper
            ref={swiperRef}
            direction={"vertical"}
            slidesPerView={1}
            spaceBetween={30}
            pagination={{
               clickable: true,
            }}
            mousewheel={false}
            // effect={"fade"}
            modules={[Mousewheel, Pagination]}
            className="carousel"
         >
            {projectsData.map((item, i) => (
               <React.Fragment key={i}>
                  <SwiperSlide key={i}>
                     <h2 className="carousel__projectName">{item.name}</h2>
                     <img
                        src={item.img}
                        alt=""
                        width={600}
                        ref={imageRef}
                        onLoad={updateHeight}
                     />
                     <div className="carousel__content" ref={contenteRef}>
                        <p className="carousel__headline">{item.headline}</p>
                        <div className="carosuel__contributions-wrapper">
                           <p className="carousel__contributions">
                              Contributions:
                           </p>
                           <div className="carousel__tags">
                              {item.tags.map((tag, i) => (
                                 <Tag tag={tag.label} key={i} />
                              ))}
                           </div>
                        </div>
                     </div>
                  </SwiperSlide>
               </React.Fragment>
            ))}
         </Swiper>
      </div>
   );
}
