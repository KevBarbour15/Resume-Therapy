import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";
import { auth, logout } from "../../firebase-functionality/firebase";

const sidebarNavItems = [
  {
    display: "Profile",
    icon: <i className="bx bx-home"></i>,
    to: "/UserDash/Profile",
    section: "",
  },
  {
    display: "Connections",
    icon: <i className="bx bx-star"></i>,
    to: "/UserDash/Connections",
    section: "upload-resume",
  },
  {
    display: "Meet Resume Therapists",
    icon: <i className="bx bx-calendar"></i>,
    to: "/UserDash/MeetReviewers",
    section: "meet-reviewers",
  },
  {
    display: "Messages",
    icon: <i className="bx bx-user"></i>,
    to: "/UserDash/Messages",
    section: "messages",
  },
  {
    display: "Book Appointment",
    icon: <i className="bx bx-user"></i>,
    to: "/UserDash/BookAppointment",
    section: "book-appointment",
  },
  {
    display: "Virtual Call",
    icon: <i className="bx bx-receipt"></i>,
    to: "/UserDash/VirtualCall",
    section: "virtual-call",
  },
  {
    display: "ChatGPT Guidance",
    icon: <i className="bx bx-log-out"></i>,
    to: "/UserDash/ChatGPTGuidance",
    section: "chat-gpt-feedback",
  },
  {
    display: "Logout",
    icon: <i className="bx bx-log-out"></i>,
    section: "logout",
    onClick: async () => {
      try {
        await logout(auth);
        navigate("/");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
  },
];

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepHeight, setStepHeight] = useState(0);
  const sidebarRef = useRef();
  const indicatorRef = useRef();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      if (sidebarRef.current) {
        const sidebarItem = sidebarRef.current.querySelector(
          ".sidebar__menu__item"
        );
        if (sidebarItem && indicatorRef.current) {
          indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
        }
        setStepHeight(sidebarItem ? sidebarItem.clientHeight : 0);
      }
    }, 50);
  }, []);

  useEffect(() => {
    const curPath = window.location.pathname.split("/")[1];
    const activeItem = sidebarNavItems.findIndex(
      (item) => item.section === curPath
    );
    setActiveIndex(curPath.length === 0 ? 0 : activeItem);
  }, [location]);

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <div className="title">Resume Therapy</div>
      </div>
      <div ref={sidebarRef} className="sidebar__menu">
        {sidebarNavItems.map((item, index) => (
          <Link
            to={item.to}
            key={index}
            onClick={item.onClick ? item.onClick : () => {}}
          >
            <div
              className={`sidebar__menu__item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <div className="sidebar__menu__item__icon">{item.icon}</div>
              <div className="sidebar__menu__item__text">{item.display}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
