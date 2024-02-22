import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import CustomCard from "../custom-mui/CustomCard";

ProfileWidget.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
};

export default function ProfileWidget({ title, bio, icon, ...other }) {
  return (
    <CustomCard {...other}>
      <Typography variant="h3" sx={{ fontFamily: "Outfit, sans-serif" }}>
        {title}
      </Typography>
      <div></div>
    </CustomCard>
  );
}
