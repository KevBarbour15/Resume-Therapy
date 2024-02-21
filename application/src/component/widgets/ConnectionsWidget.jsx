import CardContent from "@mui/material/CardContent";
import { CardActions, Typography } from "@mui/material";
import PropTypes from "prop-types";
import CustomCard from "../custom-mui/CustomCard";
import CustomButton from "../custom-mui/CustomButton";

ConnectionsWidget.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default function ConnectionsWidget({
  title,
  total = 0,
  bio,
  icon,
  popUpHandle,
  viewInfo,
  ...other
}) {
  return (
    <CustomCard {...other}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>

        <Typography variant="body2" sx={{ fontFamily: "Outfit, sans-serif" }}>
          {bio}
        </Typography>
      </CardContent>

      <CardActions>
        <CustomButton onClick={() => popUpHandle(viewInfo)}>
          View Info
        </CustomButton>
      </CardActions>
    </CustomCard>
  );
}
