import React from "react";
import "./popups.css";

function EditBioPopup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="close-btn-wrapper">
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            X
          </button>
        </div>
        <div className="popup-content">{props.children}</div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default EditBioPopup;
