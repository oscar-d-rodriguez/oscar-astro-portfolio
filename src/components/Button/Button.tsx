import React from "react";
import "./button.css";

type ButtonLinkProps = {
   url: string;
   label: string;
   variant?: string;
   target?: string;
   anchor?: boolean;
};

const Button: React.FC<ButtonLinkProps> = ({
   url,
   label,
   variant = "",
   anchor,
   target = "_self",
}) => {
   return anchor ? (
      <a href={url} className={`button ${variant}`} target={target}>
         {label}
      </a>
   ) : (
      <button
         className={`button ${variant}`}
         onClick={() => (window.location.href = url)}
      >
         {label}
      </button>
   );
};

export default Button;
