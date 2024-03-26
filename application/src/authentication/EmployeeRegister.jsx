import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../component/navbar/Navbar";

import {
  auth,
  registerWithEmailAndPasswordEmployee,
} from "../firebase-functionality/firebase";
import "./login.css";
import { toast } from "react-toastify";
import CustomToast from "../component/toast/CustomToast";

const EmployeeRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();

  const register = async () => {
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
      <div className="register">
        <div className="register__container">
          <h1>Register as Therapist</h1>

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
          <button className="register__btn" onClick={register}>
            Register
          </button>

          <a>Already have an account?</a>

          <div>
            <Link to="/EmployeeSignIn">Login now.</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeRegister;
