import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordReset } from "../firebase-functionality/firebase";
import "./login.scss";
import { Navbar } from "../components/navbar/Navbar";

const PasswordReset = () => {
  const [email, setEmail] = useState("");

  let err = "";
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
      <div className="login">
        <div className="login__container">
          <h1>Reset Your Password</h1>
          <input
            type="email"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            onKeyDown={enter}
          />
          <div className="error__text">{errorText && <p>{errorText}</p>}</div>
          <button className="login__btn" onClick={reset}>
            Reset Password
          </button>
          <div>
            Don't have an account? <Link to="/Register">Register</Link> now.
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordReset;
