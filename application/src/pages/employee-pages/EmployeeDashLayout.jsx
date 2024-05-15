import "./layout-style.css";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-functionality/firebase";

// navigation components
import EmployeeSidebar from "../../components/sidebar/EmployeeSidebar";
import EmployeeNavbar from "../../components/navbar/EmployeeNavbar";

const EmployeeDashLayout = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [displaySidebar, setDisplaySidebar] = useState(true);

  const handleWindowResize = () => {
    if (window.innerWidth <= 1080 && window.innerWidth >= 0) {
      setDisplaySidebar(false);
    } else {
      setDisplaySidebar(true);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    handleWindowResize();

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [user, loading]);
  return (
    <div className="dash-layout">
      {displaySidebar ? <EmployeeSidebar /> : <EmployeeNavbar />}
      <Outlet />
    </div>
  );
};

export default EmployeeDashLayout;
