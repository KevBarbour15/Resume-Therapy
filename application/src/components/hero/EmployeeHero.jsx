import "./hero.scss";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Therapist from "../../assets/therapist.jpeg";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../firebase-functionality/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

export const EmployeeHero = () => {
  const [user, loading] = useAuthState(auth);

  useGSAP(() => {
    gsap.from(".left-content", {
      opacity: 0,
      delay: 0.35,
      duration: 0.5,
      ease: "back.inOut",
    });

    let tl = gsap.timeline();

    tl.from(
      ".right-content img",
      {
        opacity: 0,
        delay: 0.35,
        duration: 0.15,
        y: -50,
      },
      0
    ).to(
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

  const handleLogin = async () => {
    if (user) {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));

      const doc = await getDocs(q);
      const data = doc.docs[0]?.data();
      if (data && !data.employee) {
        await logout(); // Log the user out if they are NOT an employee
      }
    }
  };

  return (
    <div className="hero">
      <div className="content">
        <div className="left-content">
          <h1 className="hero-title">Become a Resume Therapist</h1>
          <p>
            Embark on a rewarding journey as a Resume Therapist, empowering
            individuals worldwide to create and polish their ideal resumes. From
            the comfort of your own home, and with the flexibility to manage
            your hours, you can provide your expert guidance to people from
            diverse backgrounds and career stages. Your unique expertise and
            experience will be instrumental in helping them navigate their
            career paths successfully. With the added benefit of setting your
            own availability, you can balance this rewarding work with your
            personal schedule, making an impactful difference when it suits you
            best. Join us today and help shape the future of careers, one resume
            at a time.
          </p>

          <div className="btn-style">
            <Link to="/EmployeeRegister" className="btn">
              Sign Up
            </Link>
            <Link to="/EmployeeSignIn" className="btn-light">
              Log in
            </Link>
          </div>
        </div>
        <div className="right-content">
          <img src={Therapist} alt="" />
        </div>
      </div>
    </div>
  );
};

export default EmployeeHero;
