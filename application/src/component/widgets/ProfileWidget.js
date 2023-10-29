import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
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
