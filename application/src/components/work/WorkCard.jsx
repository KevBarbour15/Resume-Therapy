import "./work.scss";
import { useRef } from "react";

//animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const WorkCard = (props) => {

  return (
    <div  className="work-card">
      <img src={props.imgsrc} alt={props.title} />
      <h2 className="work-title"> {props.title} </h2>
      <div className="work-details">
        <p>{props.text} </p>
      </div>
    </div>
  );
};
