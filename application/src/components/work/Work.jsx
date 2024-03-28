import "./work.scss";
import { useRef } from "react";
import { WorkCardData } from "./WorkCardData";
import { WorkCard } from "./WorkCard";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const Work = () => {
  const workRef = useRef(null);

  useGSAP(() => {
    gsap.to(workRef.current, {
      scrollTrigger: {
        trigger: workRef.current,
        start: "top 75%",
        end: "top 35%",
        scrub: 0,
      },
      delay: 0.75,
      opacity: 1,
    });
  });

  return (
    <div className="work-container">
      <div className="project-heading">
        <div ref={workRef} className="project-container">
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
