const menuItems = [
   {
      label: "linkedin-icon",
      href: "https://www.linkedin.com/in/oscar-casta%C3%B1eda-5a0a0244/",
      icon: "/socialIcons/linkedin.svg",
   },
   {
      label: "github-icon",
      href: "https://github.com/oscar-d-rodriguez",
      icon: "/socialIcons/github.svg",
   },
   {
      label: "email-icon",
      href: "mailto:ocasta06@gmail.com",
      icon: "/socialIcons/email.svg",
   },
   {
      label: "instagram-icon",
      href: "https://www.instagram.com/oscar7castaneda/",
      icon: "/socialIcons/instagram.svg",
   },
   {
      label: "behance-icon",
      href: "https://www.behance.net/OscarRdz",
      icon: "/socialIcons/behance.svg",
   },
];

export const SocialNavigation: React.FC = () => {
   return (
      <ul className="nav__social">
         {menuItems.map((item, i) => (
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
