import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CustomCard from "../custom-mui/CustomCard";

ViewResumeWidget.propTypes = {
  title: PropTypes.string.isRequired,
};

export default function ViewResumeWidget({ title, ...other }) {
  return (
    <CustomCard
      sx={{
        "&:hover": {
          transform: "scale(1.1)",
          cursor: "pointer",
          bgcolor: "purple",
          border: "1px solid #222",
        },
      }}
      {...other}
    >
      <Typography gutterBottom sx={{ cursor: "pointer", color: "#fff" }}>
        <NoteAddIcon />
      </Typography>

      <Typography
        sx={{
          width: "100%",
          fontFamily: "Outfit, sans-serif",
          fontWeight: "600",
          transition: "all .3s ease-in-out",
          color: "#fff",
        }}
      >
        {title}
      </Typography>
    </CustomCard>
  );
}
