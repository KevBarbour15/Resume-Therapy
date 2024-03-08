import styles from "./custom-toast.module.scss";

const CustomToast = ({ closeToast }) => (
  <div className={styles.toastContainer}>
    <p>
      Registration and Login functionality is down while we revamp Resume
      Therapy. We will be back soon!
    </p>
    <button onClick={closeToast}>Close</button>
  </div>
);

export default CustomToast;
