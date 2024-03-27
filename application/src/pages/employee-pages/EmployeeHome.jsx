import React from "react";
import Employee from "../../components/hero/EmployeeHero";
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";

function EmployeeHome() {
  return (
    <>
      <div>
        <Navbar />
        <Employee />
        <Footer />
      </div>
    </>
  );
}

export default EmployeeHome;
