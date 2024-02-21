import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import CustomCard from "../custom-mui/CustomCard";

CalendarWidget.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default function CalendarWidget({ title, total, icon, ...other }) {
  return (
    <CustomCard {...other}>
      <Typography
        variant="h3"
        sx={{ fontFamily: "Outfit, sans-serif", cursor: "pointer" }}
      >
        Upcoming
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{ fontFamily: "Outfit, sans-serif", cursor: "pointer" }}
      >
        {title}
      </Typography>
    </CustomCard>
  );
}
