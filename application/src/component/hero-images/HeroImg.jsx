import "./HeroImgStyles.css";
import { useEffect } from "react";
import Resume from "../../assets/resume.jpeg";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../firebase-functionality/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import CustomToast from "../toast/CustomToast";
import gsap from "gsap";

export const HeroImg = () => {
  const [user, loading] = useAuthState(auth);

  const handleLogin = async () => {
    if (user) {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));

      const doc = await getDocs(q);
      const data = doc.docs[0]?.data();
      if (data && data.employee) {
        await logout(); // Log the user out if they are an employee
      }
    }

    // Redirect to the login page
    window.location.href = "/SignIn";
  };

  useEffect(() => {
    toast(<CustomToast />, {
      position: "top-right",
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

  return (
    <div className="hero">
      <div className="mask"></div>

      <div className="content">
        <h1>Land Your Dream Job With The Perfect Resume.</h1>
        <p>
          Welcome to Resume Therapy, your companion on the journey to secure
          your dream job. Our platform simplifies the process of building an
          impactful resume, guiding you from template selection to skillfully
          articulating your professional journey. Leverage insights from
          industry experts to create a polished, professional resume that
          effectively highlights your unique abilities and experiences. Whether
          you're embarking on your career journey or preparing for the next
          professional milestone, Resume Therapy is your ally for success. Start
          your journey with us today, and make your dream job a reality!
        </p>

        <img className="img" src={Resume} />

        <div className="btn-style">
          <Link to="/Register" className="btn">
            Sign up
          </Link>
          <Link to="#" onClick={handleLogin} className="btn-light">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};
