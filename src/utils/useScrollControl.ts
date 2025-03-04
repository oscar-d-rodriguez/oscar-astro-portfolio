import { useEffect, useRef, useState } from "react";

const useScrollControl = (swiperRef: any) => {
   const [isScrollingUp, setIsScrollingUp] = useState(false);
   const lastScrollY = useRef(0); // Remove window.scrollY, set to 0 instead
   const animationFrame = useRef<number | null>(null);

   useEffect(() => {
      if (typeof window === "undefined") return; // Ensure client-side execution

      const handleScroll = (event: WheelEvent) => {
         if (!swiperRef.current) return;

         const swiperInstance = swiperRef.current.swiper;
         const isFirstSlide = swiperInstance.isBeginning;
         const isLastSlide = swiperInstance.isEnd;
         const isScrollingUpNow = event.deltaY < 0;

         // Avoid excessive function calls
         if (animationFrame.current)
            cancelAnimationFrame(animationFrame.current);

         animationFrame.current = requestAnimationFrame(() => {
            setIsScrollingUp(isScrollingUpNow);
            lastScrollY.current = window.scrollY; // Update lastScrollY here

            // Apply scrolling logic:
            if (isFirstSlide && isScrollingUpNow) {
               swiperInstance.mousewheel.disable();
            } else if (isFirstSlide && !isScrollingUpNow) {
               swiperInstance.mousewheel.enable();
            } else if (isLastSlide && !isScrollingUpNow) {
               swiperInstance.mousewheel.disable();
            } else if (isLastSlide && isScrollingUpNow) {
               swiperInstance.mousewheel.enable();
            } else {
               swiperInstance.mousewheel.enable();
            }
         });
      };

      window.addEventListener("wheel", handleScroll, { passive: true });

      return () => {
         window.removeEventListener("wheel", handleScroll);
         if (animationFrame.current)
            cancelAnimationFrame(animationFrame.current);
      };
   }, [swiperRef]);

   return isScrollingUp;
};

export default useScrollControl;
