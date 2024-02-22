import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomCard from "../custom-mui/CustomCard";

ViewBioWidget.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default function ViewBioWidget({ title, total, icon, ...other }) {
  return (
    <CustomCard {...other}>
      <Typography gutterBottom sx={{ cursor: "pointer", color: "#fff" }}>
        <AccountCircleIcon />
      </Typography>

      <Typography
        sx={{
          fontFamily: "Outfit, sans-serif",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all .3s ease-in-out",
          color: "#fff",
          "&:hover": {
            transform: "scale(1.25)",
          },
        }}
      >
        {title}
      </Typography>
    </CustomCard>
  );
}
