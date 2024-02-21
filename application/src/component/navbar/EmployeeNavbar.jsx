import "./NavbarStyles.css";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { auth, logout } from "../../firebase";

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
          <Link to="/ReviewerDash/Profile">Therapist Profile</Link>
        </li>

        <li>
          <Link to="/ReviewerDash/Availability">Availability</Link>
        </li>

        <li>
          <Link to="/ReviewerDash/PendingConnections">Pending Connections</Link>
        </li>

        <li>
          <Link to="/ReviewerDash/Connections">Connections</Link>
        </li>

        <li>
          <Link to="/ReviewerDash/Messages">Messages</Link>
        </li>

        <li>
          <Link to="/ReviewerDash/VirtualCall">Virtual Call</Link>
        </li>

        <li>
          <Link to="/" onClick={logUserOut}>
            Logout
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
