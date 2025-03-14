import React from "react";
import "@styles/button.css";

type ButtonLinkProps = {
   url: string;
   label: string;
   variant?: string;
};

const Button: React.FC<ButtonLinkProps> = ({ url, label, variant }) => {
   return (
      <button
         className={`button ${variant}`}
         onClick={() => (window.location.href = url)}
      >
         {label}
      </button>
   );
};

export default Button;
