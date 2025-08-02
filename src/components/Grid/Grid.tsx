import React from "react";
import "./grid.css";

interface Project {
   id: string;
   name: string;
   type: string;
}

interface Projects {
   projects: Project[];
}

type RowType = "same" | "firstHalf";

interface RowConfig {
   cards: number;
   type: RowType;
}

const sizes: RowConfig[] = [
   { cards: 3, type: "same" }, // row 1
   { cards: 2, type: "same" }, // row 2
   { cards: 2, type: "firstHalf" }, // row 3
];

export const Grid: React.FC<{ data: Projects }> = ({ data }) => {
   const projectsData = data.projects;
   let idx = 0;

   return (
      <div className="grid">
         {sizes.map((row, rowIdx) => {
            const rowCards = projectsData.slice(idx, idx + row.cards);
            idx += row.cards;
            return (
               <div
                  className={`grid-row grid-row-${rowIdx}`}
                  key={`row-${rowIdx}`}
               >
                  {rowCards.map((item, i) => (
                     <a
                        href={`projects/${item.id}`}
                        key={item.id}
                        className="grid-card"
                     >
                        <div className="img-container">
                           <img
                              className="default-img"
                              width={100}
                              src={`https://ocportfolio-images.s3.us-west-2.amazonaws.com/background-images/geometry_${idx - row.cards + i + 1}.jpg`}
                              alt={item.id}
                           />
                           <img
                              className="hover-img"
                              width={100}
                              src={`https://ocportfolio-images.s3.us-west-2.amazonaws.com/${item.id}/${item.id}.jpg`}
                              alt={item.id}
                           />
                        </div>
                        <h3>{item.name}</h3>
                        <p>{item.type}</p>
                     </a>
                  ))}
               </div>
            );
         })}
      </div>
   );
};
