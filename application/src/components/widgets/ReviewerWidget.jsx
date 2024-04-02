import { useState } from "react";
import CardContent from "@mui/material/CardContent";
import { CardActions } from "@mui/material";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import CustomCard from "../custom-mui/CustomCard";
import CustomButton from "../custom-mui/CustomButton";

import ViewBioPopup from "../popups/ViewBioPopup";
import ViewResumePopup from "../popups/ViewResumePopup";

ReviewerWidget.propTypes = {
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
};

export default function ReviewerWidget({
  title,
  bio,
  userid,
  reviewerid,
  ...other
}) {
  const [viewBioPopup, setViewBioPopup] = useState(false);
  const [viewResumePopup, setViewResumePopup] = useState(false);
  const [image, setImage] = useState(null);

  const handleButton = (user, reviewer) => {
    button(user, reviewer);
    removeFunc(reviewer);
  };

  return (
    <>
      <CustomCard {...other}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            sx={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: "600",
              color: "#fff",
            }}
          >
            {" "}
            {title}
          </Typography>
        </CardContent>

        <CardActions>
          <CustomButton>Bio</CustomButton>
          <CustomButton>Resume</CustomButton>
        </CardActions>
        <CardActions>
          {" "}
          <CustomButton
            onClick={() => {
              handleButton(userid, reviewerid);
            }}
          >
            Connect
          </CustomButton>
        </CardActions>
      </CustomCard>

      <ViewResumePopup
        trigger={viewResumePopup}
        setTrigger={setViewResumePopup}
      >
        <div>
          {image ? (
            <div className="resume">
              <img src={image} className="img" alt="Resume preview" />
            </div>
          ) : (
            <div className="no-resume">No resume uploaded.</div>
          )}
        </div>
      </ViewResumePopup>
    </>
  );
}
