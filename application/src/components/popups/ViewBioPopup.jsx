import "./popups.scss";

function ViewBioPopup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="close-btn-wrapper">
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
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

export default ViewBioPopup;
