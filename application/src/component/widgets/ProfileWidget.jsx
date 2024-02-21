import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import CustomCard from "../custom-mui/CustomCard";

ProfileWidget.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
};

export default function ProfileWidget({ title, bio, icon, ...other }) {
  const displayBio = bio.trim().length > 0 ? bio : "* No bio yet *";

  return (
    <CustomCard {...other}>
      <Typography variant="h2" sx={{ fontFamily: "Outfit, sans-serif" }}>
        {title}
      </Typography>
      <div>
        <Typography variant="h5" sx={{ fontFamily: "Outfit, sans-serif" }}>
          {displayBio}
        </Typography>
      </div>
    </CustomCard>
  );
}
