"use client";
import { useEffect, useState } from "react";
import ocLogo from "@assets/oc.svg";
import menuButton from "@assets/mobile_menu.svg";
import closeButton from "@assets/close_menu.svg";

import { SocialNavigation } from "@components/SocialNavigation";

import "@styles/navigation.css";

const navItems = [
   { name: "Home", id: "home", hide: true },
   { name: "About", id: "about" },
   { name: "Projects", id: "projects" },
   { name: "Contact", id: "contact" },
];

export default function Navigation() {
   const [isOpen, setIsOpen] = useState(false);
   const [activeSection, setActiveSection] = useState("");
   const [firstLoad, setFirstLoad] = useState(true);
   const [isScrolled, setIsScrolled] = useState(false);

   const handleMobileButtonClick = () => {
      setIsOpen(!isOpen);
   };

   const handleResize = () => {
      setIsOpen(false);
   };

   const handleScrollToSection = (id: string) => {
      setIsOpen(false);
      const section = document.getElementById(id);
      if (section) {
         section.scrollIntoView({ behavior: "smooth", block: "start" });
         setActiveSection(id);
      }
   };

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 0);
      };

      const updateActiveSection = () => {
         handleScroll();
         const scrollPosition = window.scrollY;

         for (const item of navItems) {
            const section = document.getElementById(item.id);
            if (section) {
               const { offsetTop, offsetHeight } = section;
               if (
                  scrollPosition >= offsetTop - 50 &&
                  scrollPosition < offsetTop + offsetHeight
               ) {
                  setActiveSection(item.id);
                  break;
               }
            }
         }
      };

      // Run once on mount to detect active section on load
      updateActiveSection();

      window.addEventListener("scroll", updateActiveSection);
      return () => window.removeEventListener("scroll", updateActiveSection);
   }, []);

   useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => {
         window.addEventListener("resize", handleResize);
      };
   }, [handleResize]);

   useEffect(() => {
      if (firstLoad) {
         window.scrollTo(0, 0);
         setFirstLoad(false);
      }
   });

   return (
      <nav
         className={`nav ${isOpen ? "open" : ""} ${isScrolled ? "isScrolled" : ""}`}
      >
         <div
            className={`nav__logo ${activeSection === "home" ? "active" : ""}`}
         >
            <a href="/" className="glowing-icon">
               <img src={ocLogo.src} width="32px" />
            </a>
         </div>
         <div className="nav__wrapper">
            <ul className="nav__menu">
               {navItems
                  .filter((item) => !item.hide)
                  .map((item) => (
                     <li key={item.id}>
                        <button
                           key={item.id}
                           onClick={() => handleScrollToSection(item.id)}
                           className={`glowing-icon ${
                              activeSection === item.id ? "active" : ""
                           }`}
                        >
                           {item.name}
                        </button>
                     </li>
                  ))}
            </ul>
            <SocialNavigation />
         </div>
         <button
            className="nav__mobile-button"
            aria-label="Toggle menu"
            type="button"
            id="button"
            onClick={handleMobileButtonClick}
         >
            <img
               src={!isOpen ? menuButton.src : closeButton.src}
               alt="open mobile menu for oscar portfolio"
            />
         </button>
      </nav>
   );
}
