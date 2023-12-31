import "./NavbarStyles.css";
import { React, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { auth, logout } from "../../firebase";

export const UserDashNavbar = () => {
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
  }

  window.addEventListener("scroll", changeColor);

  return (
    <div className={color ? "header header-bg" : "header"}>
      <Link to="/">
        <h1>Resume Therapy</h1>
      </Link>

      <ul className={click ? "nav-menu active" : "nav-menu"}>
        
     
        <li>
          <Link to="/user-dash/profile">Profile</Link>
        </li>

        <li>
          <Link to="/user-dash/connections">Connections</Link>
        </li>

        <li>
          <Link to="/user-dash/MeetReviewers/meet-reviewers">Meet Reviewers</Link>
        </li>

        <li>
          <Link to="/user-dash/messages">Messages</Link>
        </li>

        <li>
          <Link to="/user-dash/book-appointment">Book Appointment</Link>
        </li>

        <li>
          <Link to="/user-dash/virtual-call">Virtual Call</Link>
        </li>

        <li>
            <Link to = "/" onClick={logUserOut}>Logout</Link>
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