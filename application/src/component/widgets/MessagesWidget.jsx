import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import CustomCard from "../custom-mui/CustomCard";

MessagesWidget.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default function MessagesWidget({
  title,
  total,
  icon,
  color,
  ...other
}) {
  return (
    <CustomCard {...other}>
      <Typography variant="h3" sx={{ cursor: "pointer" }}>
        <Badge badgeContent={total}>
          <MailIcon />
        </Badge>
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
