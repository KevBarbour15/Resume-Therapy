import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CustomCard from "../custom-mui/CustomCard";

ViewResumeWidget.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default function ViewResumeWidget({ title, total, ...other }) {
  return (
    <CustomCard {...other}>
      <Typography gutterBottom sx={{ cursor: "pointer", color: "#fff" }}>
        <NoteAddIcon />
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
