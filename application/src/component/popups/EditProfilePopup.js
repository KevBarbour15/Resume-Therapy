import React from "react";
import "./popups.css";

function EditProfilePopup(props) {
  console.log(props);
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          X
        </button>
        <div className="popup-content">{props.children}</div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default EditProfilePopup;
