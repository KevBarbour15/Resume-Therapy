import "./work.scss";
import { useEffect } from "react";
import { WorkCardData } from "./WorkCardData";
import { WorkCard } from "./WorkCard";
import gsap from "gsap";

export const Work = () => {
 
  return (
    <div className="work-container">
      <div className="project-heading">
        <div className="project-container">
          {WorkCardData.map((val, ind) => {
            return (
              <WorkCard
                key={ind}
                imgsrc={val.imgsrc}
                title={val.title}
                text={val.text}
                view={val.view}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
