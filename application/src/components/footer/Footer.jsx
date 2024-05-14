import "./footer.scss";

export const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-left">
        <span class="material-symbols-outlined">person_pin</span>
        <p>
          Resume Therapy was created by Kevin Barbour, Atharva Veer and Ivan
          Ramos.
        </p>
      </div>

      <div className="footer-right">
        <span class="material-symbols-outlined">home</span>
        <p>San Francisco, California</p>
      </div>
    </div>
  );
};
