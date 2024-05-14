import "./custom-toast.scss";

const CustomToast = ({ closeToast }) => (
  <div className="toastContainer">
    <p>
      Resume Therapy is currently down as we make some major changes but it will
      be back up soon, and better than ever. We are refactoring the codebase and
      adding new features to improve your experience.
    </p>
    <button className="btn" onClick={closeToast}>
      Close
    </button>
  </div>
);

export default CustomToast;
