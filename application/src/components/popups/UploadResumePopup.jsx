import React from "react";
import "./popups.scss";

function UploadResumePopup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="close-button-wrapper">
          <button
            className="close-button"
            onClick={() => props.setTrigger(false)}
          >
            X
          </button>
        </div>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default UploadResumePopup;
