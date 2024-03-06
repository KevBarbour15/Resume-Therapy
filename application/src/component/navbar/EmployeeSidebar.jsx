import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";
import { auth, logout } from "../../firebase-functionality/firebase";

const sidebarNavItems = [
  {
    display: "Therapist Profile",
    to: "/ReviewerDash/Profile",
    section: "",
  },
  {
    display: "Availability",
    to: "/ReviewerDash/Availability",
    section: "",
  },
  {
    display: "Pending Connections",
    to: "/ReviewerDash/PendingConnections",
    section: "",
  },
  {
    display: "Connections",
    to: "/ReviewerDash/Connections",
    section: "",
  },
  {
    display: "Messages",
    to: "/ReviewerDash/Messages",
    section: "",
  },
  {
    display: "Virtual Call",
    to: "/ReviewerDash/VirtualCall",
    section: "",
  },
  {
    display: "Logout",
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

const EmployeeSidebar = () => {
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
              <a className="nav-link">
                <span>{item.display}</span>
              </a>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EmployeeSidebar;
