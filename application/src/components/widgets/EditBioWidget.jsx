import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomCard from "../custom-mui/CustomCard";

EditBioWidget.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default function EditBioWidget({ title }) {
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
    >
      <Typography gutterBottom sx={{ cursor: "pointer", color: "#fff" }}>
        <AccountCircleIcon />
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