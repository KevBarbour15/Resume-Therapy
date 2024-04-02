import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase-functionality/firebase";


import "./login.scss";

// Toast notifications
import { toast } from "react-toastify";
import CustomToast from "../components/toast/CustomToast";

// GSAP animations
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.from(".register__container", {
      opacity: 0,
      delay: 0.15,
      duration: 0.5,
      y: "-25vw",
      ease: "back.inOut",
    });
  });

  const register = async () => {
    /*
    const errMessage = await registerWithEmailAndPassword(
      name,
      email,
      password
    );
    setErrorText(errMessage);

    if (error === "") {
      setRegistrationStatus("success");
    } else {
      setRegistrationStatus("failure");
    }
    */
  };

  const enter = (event) => {
    if (event.key === "Enter") {
      register();
    }
  };

  useEffect(() => {
    if (registrationStatus === "success") {
      navigate("/UserDash/Profile");
    }
  }, [registrationStatus]);

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
    if (loading) return;
  }, [user, loading]);

  const showAlert = () => {
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
  };

  return (
    <>
      <Navbar />
      <div className="register">
        <div className="register__container">
          <h1>Register </h1>

          <input
            type="text"
            className="register__textBox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            onKeyDown={enter}
          />
          <input
            type="text"
            className="register__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            onKeyDown={enter}
          />
          <input
            type="password"
            className="register__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            onKeyDown={enter}
          />
          <div className="error__text">{errorText && <p>{errorText}</p>}</div>
          <button
            className="register__btn" //onClick={register}
            onClick={() => {
              showAlert;
            }}
          >
            Register
          </button>
          <button
            className="register__btn register__google"
            //onClick={signInWithGoogle}
            onClick={() => {
              showAlert;
            }}
          >
            Register with Google
          </button>

          <a>Already have an account?</a>

          <div>
            <Link to="#" onClick={handleLogin}>
              Login now.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
