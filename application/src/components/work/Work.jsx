import "./work.scss";
import { useRef } from "react";
import { WorkCardData } from "./WorkCardData";
import { WorkCard } from "./WorkCard";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const Work = () => {
  const workRef = useRef(null);

  useGSAP(() => {
    gsap.set(".card", { rotateY: 90})
    gsap.to(".card", {
      scrollTrigger: {
        trigger: ".card",
        start: "top 70%",
        end: "top 15%",
        scrub: 0,
      },
      rotateY: 0,
      delay: 0.75,
      opacity: 1,
      boxShadow: "10px 10px 5px black",
      border: "2px solid white"
    });
  });

  return (
    <div className="work-container">
      <div className="project-heading">
        <div ref={workRef} className="project-container">
          {WorkCardData.map((val, ind) => {
            return (
              <div className="card">
                <WorkCard
                  key={ind}
                  imgsrc={val.imgsrc}
                  title={val.title}
                  text={val.text}
                  view={val.view}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
