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
      <Typography variant="h3" sx={{ cursor: "pointer" }}>
        <AccountCircleIcon />
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{
          fontFamily: "Outfit, sans-serif",
          cursor: "pointer",
          transition: "all .3s ease-in-out",
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
