import "./custom-toast.scss";

const CustomToast = ({ closeToast }) => (
  <div className="toastContainer">
    <p>
      Resume Therapy is currently down as we make some major changes but it will
      be back up soon, and better than ever. We're working on adding ChatGPT
      functionality to get feedback and tips in even more ways than ever.
    </p>
    <button className="btn" onClick={closeToast}>
      Close
    </button>
  </div>
);

export default CustomToast;
