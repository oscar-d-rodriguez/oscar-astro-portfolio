import { useEffect, useRef, useState } from "react";
import { navItems } from "./navItems";

// Helper: update section param in the URL
function setSectionParamInUrl(sectionId: string) {
   const url = new URL(window.location.href);
   url.searchParams.set("section", sectionId);
   window.history.replaceState({}, "", url);
}

// Helper: find which section is currently in view
function getSectionInView(): string | null {
   for (const { id } of navItems) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.offsetTop;
      const height = el.offsetHeight;
      const scrollY = window.scrollY;
      const isInView = scrollY >= top - 50 && scrollY < top + height;
      if (isInView) return id;
   }
   return null;
}

// Main hook
export function useScrollSectionHighlighter() {
   const [activeSection, setActiveSection] = useState("");
   const [scrolled, setScrolled] = useState(false);
   const lastSectionId = useRef("");
   const justNavigated = useRef(true);

   useEffect(() => {
      function handleScrollOrResize() {
         setScrolled(window.scrollY > 0);

         const currentSection = getSectionInView();
         if (!currentSection) return;

         setActiveSection(currentSection);

         if (lastSectionId.current !== currentSection) {
            lastSectionId.current = currentSection;

            // Skip URL update on first load
            if (justNavigated.current) {
               justNavigated.current = false;
               return;
            }

            setSectionParamInUrl(currentSection);
         }
      }

      window.addEventListener("scroll", handleScrollOrResize);
      window.addEventListener("resize", handleScrollOrResize);
      handleScrollOrResize();

      return () => {
         window.removeEventListener("scroll", handleScrollOrResize);
         window.removeEventListener("resize", handleScrollOrResize);
      };
   }, []);

   return { active: activeSection, isScrolled: scrolled };
}
