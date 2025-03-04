import React, { useEffect, useRef, useState } from "react";
import "@styles/tag.css";

interface TagProps {
   tag: string;
}

export const Tag: React.FC<TagProps> = ({ tag }) => {
   return <div className="tag">{tag}</div>;
};
