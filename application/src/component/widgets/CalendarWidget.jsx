import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import CustomCard from "../custom-mui/CustomCard";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

CalendarWidget.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default function CalendarWidget({ title, total, sx, icon, ...other }) {
  return (
    <CustomCard {...other}>
      <Typography gutterBottom sx={{ cursor: "pointer", color: "#fff" }}>
        <CalendarTodayIcon />
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
