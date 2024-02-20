import PropTypes from "prop-types";
import { Card, Typography } from "@mui/material";

ProfileWidget.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  sx: PropTypes.object,
};

export default function ProfileWidget({
  title,
  bio,
  icon,
  color = "primary",
  sx,
  ...other
}) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        borderRadius: 0,
        border: 2,
        borderColor: "primary.main",
        textAlign: "center",

        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => theme.palette[color].lighter,
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h3" sx={{ opacity: 1.0 }}>
        {title}
      </Typography>

      <Typography variant="h5" sx={{ opacity: 0.5 }}>
        {bio}
      </Typography>
    </Card>
  );
}
