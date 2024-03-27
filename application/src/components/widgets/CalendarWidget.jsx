import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import CustomCard from "../custom-mui/CustomCard";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

CalendarWidget.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default function CalendarWidget({ title, icon, ...other }) {
  return (
    <CustomCard
      {...other}
      sx={{
        "&:hover": {
          transform: "scale(1.1)",
          cursor: "pointer",
          bgcolor: "purple",
          border: "1px solid #222",
        },
      }}
    >
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
        }}
      >
        {title}
      </Typography>
    </CustomCard>
  );
}
