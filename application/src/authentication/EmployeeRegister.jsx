import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

import {
  auth,
  registerWithEmailAndPasswordEmployee,
} from "../firebase-functionality/firebase";
import "./login.scss";

// Toast notifications
import { toast } from "react-toastify";
import CustomToast from "../components/toast/CustomToast";

// GSAP animations
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const EmployeeRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  useGSAP(() => {
    let tl = gsap.timeline();
    tl.from(".register-container", {
      opacity: 0,
      duration: 0.65,
      rotationY: 90,
    }).to(
      ".register-container",
      {
        border: "2px solid white",
        boxShadow: "10px 10px 5px black",
        duration: 0.25,
        rotationX: 0,
      },
      0.75
    );
  });

  const register = async () => {
    if (password !== confirmPassword) {
      setErrorText("Passwords do not match");
      return;
    }
    /*
    try {
      console.log("Attempting to register user");
      await registerWithEmailAndPasswordEmployee(name, email, password, false);
      console.log("Registration successful");
      setRegistrationStatus("success");
    } catch (error) {
      console.error("Registration error:", error);
      setErrorText(error.message);
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
      navigate("/ReviewerDash/Profile");
    }
  }, [navigate, registrationStatus]);

  useEffect(() => {
    if (loading) return;
  }, [user, loading]);

  const showAlert = () => {
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
  };

  return (
    <>
      <Navbar />
      <div className="register">
        <div className="register-container">
          <h1>Register as a Therapist</h1>

          <input
            type="text"
            className="register-textbox"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            onKeyDown={enter}
          />
          <input
            type="text"
            className="register-textbox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            onKeyDown={enter}
          />
          <input
            type="password"
            className="register-textbox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            onKeyDown={enter}
          />
          <input
            type="password"
            className="register-textbox"
            value={password}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            onKeyDown={enter}
          />
          <div className="error-text">{errorText && <p>{errorText}</p>}</div>
          <button
            className="button" //onClick={register}
            onClick={() => {
              showAlert;
            }}
          >
            <div className="button-text">Register</div>
          </button>

          <div className="register-text">
            Already have an account? <Link to="/EmployeeSignIn"> Log in </Link>{" "}
            now.
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeRegister;
