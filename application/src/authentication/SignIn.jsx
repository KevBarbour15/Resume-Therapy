import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase-functionality/firebase";

//context
import { useUser } from "./../context/useUser";

//styles
import "./login.scss";

// components
import { Navbar } from "../components/navbar/Navbar";
import { toast } from "react-toastify";
import CustomToast from "../components/toast/CustomToast";

// animations
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SignIn = () => {
  const { user, loading, error } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  useGSAP(() => {
    let tl = gsap.timeline();
    tl.from(
      ".login-container",
      {
        opacity: 0,
        duration: 0.5,
        rotationY: 90,
      },
      0
    ).to(
      ".login-container",
      {
        border: "2px solid white",
        boxShadow: "10px 10px 5px black",
        duration: 0.25,
        rotationY: 0,
      },
      0.75
    );
  });

  useEffect(() => {
    if (user) {
      navigate("/UserDash/Profile");
    } else if (!user && !loading) {
      navigate("/SignIn");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (error) alert(error.message);
  }, [error]);

  const enter = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };

  const login = async () => {
    const errMessage = await logInWithEmailAndPassword(email, password);
    setErrorText(errMessage);
  };

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
      <div className="login">
        <div className="login-container">
          <h1> Login</h1>
          <input
            type="email"
            className="login-textbox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            onKeyDown={enter}
          />
          <input
            type="password"
            className="login-textbox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            onKeyDown={enter}
          />
          <div className="error-text">{errorText && <p>{errorText}</p>}</div>
          <button className="button" onClick={showAlert}>
            <div className="button-text">Login</div>
          </button>
          <div className="forgot-text">
            <Link to="/PasswordReset">Forgot Password?</Link>
          </div>
          <div className="login-text">
            Don't have an account? <Link to="/Register"> Register</Link> now.
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
