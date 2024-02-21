import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CustomCard from "../custom-mui/CustomCard";

UploadResumeWidget.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default function UploadResumeWidget({
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
        sx={{ fontFamily: "Outfit, sans-serif", cursor: "pointer" }}
      >
        {title}
      </Typography>
    </CustomCard>
  );
}
