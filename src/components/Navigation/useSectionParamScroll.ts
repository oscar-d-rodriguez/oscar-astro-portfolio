import { useEffect } from "react";

export function useSectionParamScroll() {
   useEffect(() => {
      const sectionId = new URLSearchParams(window.location.search).get(
         "section",
      );
      if (!sectionId) return;

      const tryScroll = () => {
         const element = document.getElementById(sectionId);
         if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
         } else {
            setTimeout(tryScroll, 100);
         }
      };

      tryScroll();
   }, []);
}
