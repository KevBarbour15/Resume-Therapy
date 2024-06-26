import "./navbar.scss";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [color, setColor] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 100) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
    <div className={color ? "header header-bg" : "header"}>
      <Link to="/">
        <a className="nav-link">
          <span>Resume Therapy</span>
        </a>
      </Link>

      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li>
          <Link to="/">
            <a className="nav-link">
              <span>Home</span>
            </a>
          </Link>
        </li>

        <li>
          <Link to="/EmployeeHome">
            <a className="nav-link">
              <span>Become A Therapist</span>
            </a>
          </Link>
        </li>

        <li>
          <Link to="/Login">
            <a className="nav-link">
              <span>Login</span>
            </a>
          </Link>
        </li>
      </ul>

      <div className="hamburger" onClick={handleClick}>
        {click ? (
          <FaTimes size={20} style={{ color: "#fff" }} />
        ) : (
          <FaBars size={20} style={{ color: "#fff" }} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
