import React from "react";
import "./popups.scss";

function ViewConnectionPopup(props) {
  const handlePopup = () => {
    props.setTrigger(false);
    props.setActiveTrigger(null);
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="close-btn-wrapper">
          <button className="close-btn" onClick={() => handlePopup()}>
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

export default ViewConnectionPopup;
