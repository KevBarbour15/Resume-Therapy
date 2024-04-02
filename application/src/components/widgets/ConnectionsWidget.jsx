import CardContent from "@mui/material/CardContent";
import { CardActions, Typography } from "@mui/material";
import PropTypes from "prop-types";
import CustomCard from "../custom-mui/CustomCard";
import CustomButton from "../custom-mui/CustomButton";

ConnectionsWidget.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
};

export default function ConnectionsWidget({
  title,
  bio,
  icon,
  popUpHandle,
  viewInfo,
  ...other
}) {
  return (
    <CustomCard {...other}>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          sx={{
            width: "100%",
            fontFamily: "Outfit, sans-serif",
            fontWeight: "600",
            color: "#fff",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            width: "100%",
            fontSize: "16px",
            fontFamily: "Outfit, sans-serif",
          }}
        >
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
