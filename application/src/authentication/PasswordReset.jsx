import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordReset } from "../firebase-functionality/firebase";

import "./auth.scss";

import { Navbar } from "../components/navbar/Navbar";

// GSAP animations
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  useGSAP(() => {
    let tl = gsap.timeline();
    tl.from(".auth-container", {
      opacity: 0,
      duration: 0.65,
      rotationY: 90,
    }).to(
      ".auth-container",
      {
        border: "2px solid white",
        boxShadow: "10px 10px 5px black",
        duration: 0.25,
        rotationY: 0,
      },
      0.75
    );
  });

  const enter = (event) => {
    if (event.key === "Enter") {
      reset();
    }
  };

  const reset = async () => {
    await sendPasswordReset(email);
  };

  return (
    <>
      <Navbar />
      <div className="auth">
        <div className="auth-container">
          <h1>Reset Password</h1>
          <input
            type="email"
            className="auth-textbox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            onKeyDown={enter}
          />
          <button className="button" onClick={reset}>
            <div className="button-text">Reset</div>
          </button>
          <div className="auth-text">
            Don't have an account? <Link to="/Register">Register</Link> now.
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
