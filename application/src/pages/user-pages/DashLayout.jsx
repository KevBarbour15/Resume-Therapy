import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../component/navbar/Sidebar";
import { useUser } from "../../context/useUser";
import { useNavigate } from "react-router-dom";

import UserDashNavbar from "../../component/navbar/UserDashNavbar";
import "./layout-style.css";

const DashLayout = () => {
  const navigate = useNavigate();
  const { user, loading, error } = useUser();
  const [displaySidebar, setDisplaySidebar] = useState(true);

  const handleWindowResize = () => {
    if (window.innerWidth <= 1080 && window.innerWidth >= 0) {
      setDisplaySidebar(false);
    } else {
      setDisplaySidebar(true);
    }
  };

  useEffect(() => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return navigate("/");

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [user, loading]);

  return (
    <div className="dash-layout">
      {displaySidebar ? <Sidebar /> : <UserDashNavbar />}
      <Outlet />
    </div>
  );
};

export default DashLayout;
