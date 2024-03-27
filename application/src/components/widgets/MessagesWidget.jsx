import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import CustomCard from "../custom-mui/CustomCard";

MessagesWidget.propTypes = {
  title: PropTypes.string.isRequired,
};

export default function MessagesWidget({ title, ...other }) {
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
        <MailIcon />
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
