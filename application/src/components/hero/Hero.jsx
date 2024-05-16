import "./hero.scss";
import { useEffect } from "react";
import Resume from "../../assets/resume.jpeg";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../firebase-functionality/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// Toast notifications
import { toast } from "react-toastify";
import CustomToast from "../toast/CustomToast";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

export const HeroImg = () => {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) logout();
  }, [user]);

  useGSAP(() => {
    let tl = gsap.timeline();
    tl.from(
      ".left-content",
      {
        opacity: 0,
        delay: 0.35,
        duration: 0.5,
        ease: "power4.in",
      },
      0
    )
      .from(
        ".right-content",
        {
          opacity: 0,
          duration: 0.65,
          rotationY: 90,
        },
        0
      )
      .to(
        ".right-content img",
        {
          border: "2px solid white",
          boxShadow: "10px 10px 5px black",
          duration: 0.25,
          rotationY: 0,
        },
        0.75
      );

    const titleST = new SplitText(".hero-title", {
      type: "words",
      position: "absolute",
    });

    let titleTl = gsap.timeline({
      ease: "power2",
      duration: 2,
      delay: 0.35,
    });

    titleTl.from(
      titleST.words,
      {
        opacity: 0,
        y: -120,
        stagger: 0.05,
      },
      0
    );
  });

  /*
  useEffect(() => {
    toast(<CustomToast />, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        borderRadius: "0px",
        border: "2px solid purple",
        color: "white",
        backgroundColor: "black",
        boxShadow: "10px 10px 5px black",
        width: "300px",
        height: "auto",
      },
    });
  }, []);
  */

  return (
    <div className="hero">
      <div className="content">
        <div className="left-content">
          <h1 className="hero-title">
            Land Your Dream Job With The Perfect Resume.
          </h1>

          <p>
            Welcome to Resume Therapy, your companion on the journey to secure
            your dream job. Our platform simplifies the process of building an
            impactful resume, guiding you from template selection to skillfully
            articulating your professional journey. Leverage insights from
            industry experts to create a polished, professional resume that
            effectively highlights your unique abilities and experiences.
            Whether you're embarking on your career journey or preparing for the
            next professional milestone, Resume Therapy is your ally for
            success. Start your journey with us today, and make your dream job a
            reality!
          </p>
          <div className="button-style">
            <Link to="/SignUp" className="button">
              <div className="button-text">Sign Up</div>
            </Link>

            <Link to="/Login" className="button-light">
              <div className="button-text">Login</div>
            </Link>
          </div>
        </div>
        <div className="right-content">
          <img src={Resume} alt="" />
        </div>
      </div>
    </div>
  );
};
