import { useCallback } from "react";
import { useScrollSectionHighlighter } from "./useScrollSectionHighlighter";
import { useSectionParamScroll } from "./useSectionParamScroll";
import { scrollToSectionAndUpdateUrl } from "./scrollToSectionAndUpdateUrl";

export function useSectionNavigation() {
   // Track which section is active and if the page is scrolled
   const { active, isScrolled } = useScrollSectionHighlighter();

   // Scroll to section on load if ?section=... param is present
   useSectionParamScroll();

   // Handle navigation button clicks
   const handleScrollToSection = useCallback((sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
         scrollToSectionAndUpdateUrl(element, sectionId);
      } else {
         window.location.href = `/?section=${sectionId}`;
      }
   }, []);

   return { active, isScrolled, handleScrollToSection };
}
