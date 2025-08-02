import React, { Fragment, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Tag } from "@components/Tag/Tag";
import { motion, AnimatePresence } from "framer-motion";

import "swiper/css/pagination";
import "swiper/css";
import "./carousel.css";

import ivr from "@assets/project-ivr/ivr.png";
import e2e from "@assets/project-e2e-portfolio/e2e-portfolio.png";
import { Pagination } from "swiper/modules";

interface ProjectTitleProps {
   activeIndex: number;
}

interface Project {
   id: string;
   name: string;
   description: string;
   year: string;
   tags: any[];
}

interface Projects {
   projects: Project[];
}

export const Carousel: React.FC<{ data: Projects }> = ({ data }) => {
   console.log("carousel!!!!!!:", data.projects);

   const projectsData = data.projects;

   const Contributions: React.FC<ProjectTitleProps> = ({ activeIndex }) => {
      return (
         <AnimatePresence mode="wait">
            <motion.div
               key={projectsData[activeIndex].name}
               initial={{ y: 25, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -25, opacity: 0 }}
               transition={{ duration: 0.15, ease: "easeInOut" }}
               className="carousel__content"
            >
               {/* {projectsData[activeIndex].name} */}
               {/* <motion.p className="carousel__headline">
                  {projectsData[activeIndex].headline}
               </motion.p> */}
               <motion.div className="carousel__tags">
                  {projectsData[activeIndex].tags.map((tag, i) => (
                     <Tag tag={tag} key={i} />
                  ))}
               </motion.div>
            </motion.div>
         </AnimatePresence>
      );
   };

   const ProjectTitle: React.FC<ProjectTitleProps> = ({ activeIndex }) => {
      return (
         <AnimatePresence mode="wait">
            <motion.div
               key={projectsData[activeIndex].name}
               initial={{ y: 25, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               exit={{ y: -25, opacity: 0 }}
               transition={{ duration: 0.15, ease: "easeInOut" }}
               className="carousel__content mobile"
            >
               <motion.p className="carousel__name">
                  {projectsData[activeIndex].name}
               </motion.p>
               {/* <motion.p className="carousel__headline">
                  {projectsData[activeIndex].headline}
               </motion.p> */}
            </motion.div>
         </AnimatePresence>
      );
   };
   const swiperRef = useRef(null);
   const imageRef = useRef<HTMLImageElement | null>(null);
   const [activeIndex, setActiveIndex] = useState(0);
   const [imageHeight, setImageHeight] = useState(768);

   const updateHeight = () => {
      if (imageRef.current) {
         setImageHeight(imageRef.current.clientHeight);
      }
   };

   useEffect(() => {
      updateHeight();
      window.addEventListener("resize", updateHeight);
      window.addEventListener("scroll", updateHeight);
      return () => {
         window.removeEventListener("resize", updateHeight);
         window.removeEventListener("scroll", updateHeight);
      };
   }, []);

   return (
      <div className="carousel">
         <div className="carousel__project-title">
            <ProjectTitle activeIndex={activeIndex}></ProjectTitle>
         </div>
         <div style={{ height: imageHeight }}>
            <Swiper
               direction={"vertical"}
               navigation={true}
               pagination={{
                  clickable: true,
               }}
               modules={[Pagination]}
               ref={swiperRef}
               spaceBetween={10}
               onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
               {projectsData.map((item, i) => (
                  <React.Fragment key={i}>
                     <SwiperSlide key={i}>
                        <h2 className="carousel__projectName">{item.name}</h2>
                        <img
                           src={`https://ocportfolio-images.s3.us-west-2.amazonaws.com/${item.id}.png`}
                           alt=""
                           ref={imageRef}
                           onLoad={updateHeight}
                        />
                     </SwiperSlide>
                  </React.Fragment>
               ))}
            </Swiper>
         </div>
         <Contributions activeIndex={activeIndex} />
      </div>
   );
};
