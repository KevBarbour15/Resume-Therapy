import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase-functionality/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./login.scss";
import { Navbar } from "../components/navbar/Navbar";
import { toast } from "react-toastify";
import CustomToast from "../components/toast/CustomToast";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.from(".login__container", {
      opacity: 0,
      delay: 0.15,
      duration: 0.5,
      y: "-25vw",
      ease: "back.inOut",
    });
  });

  useEffect(() => {
    // if (user) navigate("/UserDash/Profile");
    if (error) alert(error.message);
  }, [user, loading]);

  const enter = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };

  const login = async () => {
    /*
    const errMessage = await logInWithEmailAndPassword(email, password);
    setErrorText(errMessage);
    */
  };

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
      <div className="login">
        <div className="login__container">
          <h1> Login</h1>
          <input
            type="email"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            onKeyDown={enter}
          />
          <input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            onKeyDown={enter}
          />
          <div className="error__text">{errorText && <p>{errorText}</p>}</div>
          <button
            className="login__btn" //onClick={login}
            onClick={() => {
              showAlert;
            }}
          >
            Login
          </button>
          <button
            className="login__btn login__google"
            //onClick={signInWithGoogle}
            onClick={() => {
              showAlert;
            }}
          >
            Login with Google
          </button>
          <div>
            <Link to="/PasswordReset">Forgot Password?</Link>
          </div>
          <div>
            Don't have an account? <Link to="/Register">Register</Link> now.
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
