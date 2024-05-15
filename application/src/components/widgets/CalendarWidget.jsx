import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import CustomCard from "../custom-mui/CustomCard";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

CalendarWidget.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default function CalendarWidget({ title }) {
  return (
    <CustomCard
      sx={{
        "&:hover": {
          transform: "scale(1.1)",
          cursor: "pointer",
          bgcolor: "purple",
          border: "2px solid #222",
        },
      }}
    >
      <Typography gutterBottom sx={{ cursor: "pointer", color: "#fff" }}>
        <CalendarTodayIcon />
      </Typography>

      <Typography
        sx={{
          width: "100%",
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
