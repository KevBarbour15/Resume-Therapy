import React from "react";
import "./popups.scss";

function EditBioPopup(props) {
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
        <div className="popup-content">{props.children}</div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default EditBioPopup;
