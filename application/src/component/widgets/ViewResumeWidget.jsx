import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CustomCard from "../custom-mui/CustomCard";

ViewResumeWidget.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default function ViewResumeWidget({
  title,
  total,
  icon: IconComponent = NoteAddIcon,
  ...other
}) {
  return (
    <CustomCard {...other}>
      <Typography variant="h3" sx={{ cursor: "pointer" }}>
        <IconComponent />
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
