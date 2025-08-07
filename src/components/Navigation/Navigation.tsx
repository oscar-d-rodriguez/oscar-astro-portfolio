"use client";

import { useState } from "react";
import { navItems } from "./navItems";
import { useSectionNavigation } from "./useSectionNavigation";
import { useBodyLock } from "./useBodyLock";
import { SocialNavigation } from "../SocialNavigation/SocialNavigation";
import ocLogo from "@assets/oc.svg";
import menuButton from "@assets/mobile_menu.svg";
import closeButton from "@assets/close_menu.svg";

import "./navigation.css";

export default function Navigation() {
   const [isOpen, setIsOpen] = useState(false);
   const { active, isScrolled, handleScrollToSection } = useSectionNavigation();
   useBodyLock(isOpen);

   return (
      <nav
         className={`nav${isOpen ? " open" : ""}${isScrolled ? " isScrolled" : ""}`}
      >
         <div className={`nav__logo${active === "home" ? " active" : ""}`}>
            <a href="/" className="glowing-icon">
               <img
                  src={ocLogo.src}
                  alt="oscar castaneda showcase logo"
                  width="32px"
               />
            </a>
         </div>
         <div className="nav__wrapper">
            <ul className="nav__menu">
               {navItems
                  .filter((i) => !i.hide)
                  .map((i) => (
                     <li key={i.id}>
                        <button
                           onClick={() => {
                              setIsOpen(false);
                              handleScrollToSection(i.id);
                           }}
                           className={`glowing-icon${active === i.id ? " active" : ""}`}
                        >
                           {i.name}
                        </button>
                     </li>
                  ))}
            </ul>
            <div className="mobileOnly">
               <SocialNavigation />
            </div>
         </div>
         <button
            className="nav__mobile-button"
            aria-label="Toggle menu"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
         >
            <img
               src={!isOpen ? menuButton.src : closeButton.src}
               alt="navigation menu"
            />
         </button>
      </nav>
   );
}
