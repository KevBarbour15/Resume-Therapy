import "./navbar.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { auth, logout } from "../../firebase-functionality/firebase";

export const UserDashNavbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const handleCloseMenu = () => setClick(false);
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
    } finally {
      handleCloseMenu();
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
    <div className={color ? "header header-bg" : "header"}>
      <span>
        <h1>Resume Therapy</h1>
      </span>

      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li>
          <Link to="/UserDash/Profile" onClick={handleCloseMenu}>
            <a className="nav-link">
              <span>Profile</span>
            </a>
          </Link>
        </li>

        <li>
          <Link to="/UserDash/Connections" onClick={handleCloseMenu}>
            <a className="nav-link">
              <span>Connections</span>
            </a>
          </Link>
        </li>

        <li>
          <Link to="/UserDash/MeetReviewers" onClick={handleCloseMenu}>
            <a className="nav-link">
              <span>Meet Resume Therapists</span>
            </a>
          </Link>
        </li>

        <li>
          <Link to="/UserDash/Messages" onClick={handleCloseMenu}>
            <a className="nav-link">
              <span>Messages</span>
            </a>
          </Link>
        </li>

        <li>
          <Link to="/UserDash/BookAppointment" onClick={handleCloseMenu}>
            <a className="nav-link">
              <span>Book Appointment</span>
            </a>
          </Link>
        </li>

        <li>
          <Link to="/UserDash/VirtualCall" onClick={handleCloseMenu}>
            <a className="nav-link">
              <span>Virtual Call</span>
            </a>
          </Link>
        </li>

        <li>
          <Link to="/UserDash/ChatGPTGuidance" onClick={handleCloseMenu}>
            <a className="nav-link">
              <span>AI Feedback Tool</span>
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

export default UserDashNavbar;
