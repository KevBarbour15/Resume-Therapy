import "./FooterStyles.css";
import React from "react";
import {
  FaHome,
  FaPhone,
  FaMailBulk,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="left">
          <div className="location">
            <div>
              <p>San Francisco State University </p>
              <p>San Francisco, California</p>
            </div>
          </div>
        </div>

        <div className="right">
          <p>Creators of Resume Therapy:</p>
          <p>Kevin Barbour, Atharva Veer & Ivan Ramos</p>
        </div>
      </div>
    </div>
  );
};
