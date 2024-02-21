import { Card } from "@mui/material";

const CustomCard = ({ title, bio, children, sx, ...other }) => (
  <Card
    sx={{
      py: 5,
      boxShadow: 0,
      textAlign: "center",
      color: "black",
      bgcolor: "white",
      border: "2px solid black",
      borderRadius: "10px",
      boxSizing: "border-box",
      ...sx,
    }}
    {...other}
  >
    {children}
  </Card>
);

export default CustomCard;
