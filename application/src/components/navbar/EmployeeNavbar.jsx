import "./navbar.scss";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { auth, logout } from "../../firebase-functionality/firebase";

export const EmployeeNavbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [color, setColor] = useState(false);
  const navigate = useNavigate();

  const changeColor = () => {
    if (window.scrollY >= 100) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  const logUserOut = async () => {
    try {
      await logout(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
    <div className={color ? "header header-bg" : "header"}>
      <Link to="/">
        <h1>Resume Therapy</h1>
      </Link>

      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li>
          <Link to="/ReviewerDash/Profile">
            <a className="nav-link">
              <span>Profile</span>
            </a>
          </Link>
        </li>

        <li>
          <Link to="/ReviewerDash/Availability">
            <a className="nav-link">
              <span>Availability</span>
            </a>
          </Link>
        </li>

        <li>
          <Link to="/ReviewerDash/PendingConnections">
            <a className="nav-link">
              <span>Pending Connections</span>
            </a>
          </Link>
        </li>

        <li>
          <Link to="/ReviewerDash/Connections">
            <a className="nav-link">
              <span>Connections</span>
            </a>
          </Link>
        </li>

        <li>
          <Link to="/ReviewerDash/Messages">
            <a className="nav-link">
              <span>Messages</span>
            </a>
          </Link>
        </li>

        <li>
          <Link to="/ReviewerDash/VirtualCall">
            <a className="nav-link">
              <span>Virtual Call</span>
            </a>
          </Link>
        </li>

        <li>
          <Link to="/" onClick={logUserOut}>
            <a className="nav-link">
              <span>Logout</span>
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

export default EmployeeNavbar;
