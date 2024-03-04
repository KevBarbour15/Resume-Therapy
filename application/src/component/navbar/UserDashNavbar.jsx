import "./NavbarStyles.css";
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
            Profile
          </Link>
        </li>

        <li>
          <Link to="/UserDash/Connections" onClick={handleCloseMenu}>
            Connections
          </Link>
        </li>

        <li>
          <Link to="/UserDash/MeetReviewers" onClick={handleCloseMenu}>
            Meet Resume Therapists
          </Link>
        </li>

        <li>
          <Link to="/UserDash/Messages" onClick={handleCloseMenu}>
            Messages
          </Link>
        </li>

        <li>
          <Link to="/UserDash/BookAppointment" onClick={handleCloseMenu}>
            Book Appointment
          </Link>
        </li>

        <li>
          <Link to="/UserDash/VirtualCall" onClick={handleCloseMenu}>
            Virtual Call
          </Link>
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

export default UserDashNavbar;
