import { useSectionNavigation } from "@components/Navigation/useSectionNavigation";
import { socialMenuItems } from "../Navigation/navItems";

import "./socialNavigation.css";

export const SocialNavigation: React.FC = () => {
   const { isScrolled } = useSectionNavigation();

   return (
      <ul className={`nav__social  ${isScrolled ? "isScrolled" : ""}`}>
         {socialMenuItems.map((item, i) => (
            <li key={i} className="nav__social-listItem">
               <a href={item.href} target="_blank">
                  <img
                     src={item.icon}
                     alt={item.label}
                     className="menu-icon glowing-icon"
                  />
               </a>
            </li>
         ))}
      </ul>
   );
};
