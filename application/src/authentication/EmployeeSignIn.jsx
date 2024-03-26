import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPasswordEmployee,
} from "../firebase-functionality/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./login.css";
import { Navbar } from "../component/navbar/Navbar";
import { toast } from "react-toastify";
import CustomToast from "../component/toast/CustomToast";

const EmployeeSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/ReviewerDash/Profile");
    if (error) alert(error.message);
  }, [user, loading, navigate, error]);

  const enter = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };

  const login = async () => {
    /*
    const errMessage = await logInWithEmailAndPasswordEmployee(email, password);
    console.log(err);
    setErrorText(errMessage);*/
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
    <>
      <Navbar />

      <div className="login">
        <div className="login__container">
          <h1>Therapist Login</h1>
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
            className="login__btn"
            onClick={() => logInWithEmailAndPasswordEmployee(email, password)}
          >
            Login
          </button>
          <div>
            <Link to="/PasswordReset">Forgot Password?</Link>
          </div>
          <div>
            Don't have an account? <Link to="/EmployeeRegister">Register</Link>{" "}
            now.
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeSignIn;
