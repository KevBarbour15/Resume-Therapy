import CardContent from "@mui/material/CardContent";
import { Button, CardActionArea, CardActions } from "@mui/material";

// @mui
import PropTypes from "prop-types";

import { Card, Typography } from "@mui/material";

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
  button1,
  button2,
  userid,
  reviewerid,
  sx,
  ...other
}) {
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
          <Button onClick={button1}>Accept</Button>
          <Button onClick={button2}>Deny</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
