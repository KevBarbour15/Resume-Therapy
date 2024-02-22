import { Card } from "@mui/material";

const CustomCard = ({ title, bio, sx, children, ...other }) => (
  <Card
    sx={{
      textAlign: "center",
      textTransform: "uppercase",
      fontFamily: "Outfit, sans-serif",
      color: "#222",
      bgcolor: "rgb(248, 217, 15)",
      border: "1px solid #fff",
      borderRadius: "0px",
      fontWeight: "600",
      padding: "10px 32px",
      fontSize: ".85rem",
      boxShadow: "10px 10px 5px black",
      transition: "all .3s ease-in-out",
      ...sx,
    }}
    {...other}
  >
    {children}
  </Card>
);

export default CustomCard;
