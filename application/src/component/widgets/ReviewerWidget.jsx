import CardContent from "@mui/material/CardContent";
import { CardActions } from "@mui/material";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import CustomCard from "../custom-mui/CustomCard";
import CustomButton from "../custom-mui/CustomButton";

ReviewerWidget.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default function ReviewerWidget({
  title,
  total,
  bio,
  icon,
  userid,
  reviewerid,
  removeFunc,
  ...other
}) {
  const handleButton = (user, reviewer) => {
    button(user, reviewer);
    removeFunc(reviewer);
  };

  return (
    <CustomCard {...other}>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        <Typography variant="body2">{bio}</Typography>
      </CardContent>

      <CardActions>
        <CustomButton
          onClick={() => {
            handleButton(userid, reviewerid);
          }}
        >
          Connect
        </CustomButton>
      </CardActions>
    </CustomCard>
  );
}
