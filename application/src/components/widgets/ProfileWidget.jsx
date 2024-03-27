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
      <Typography
        sx={{
          fontSize: "1.75em",
          fontFamily: "Outfit, sans-serif",
          fontWeight: "600",
          transition: "all .3s ease-in-out",
          color: "#fff",
        }}
      >
        {title}
      </Typography>
      <div></div>
    </CustomCard>
  );
}
