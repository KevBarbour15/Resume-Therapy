import CardContent from "@mui/material/CardContent";
import { Button, CardActionArea, CardActions } from "@mui/material";
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

ReviewerWidget.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function ReviewerWidget({
  title,
  total,
  bio,
  icon,
  color = "primary",
  button,
  userid,
  reviewerid,
  removeFunc,
  sx,
  ...other
}) {
  const handleButton = (user, reviewer) => {
    button(user, reviewer);
    removeFunc(reviewer);
  };

  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: "left",
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {bio}
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            variant="outlined"
            onClick={() => {
              handleButton(userid, reviewerid);
            }}
          >
            Connect
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
