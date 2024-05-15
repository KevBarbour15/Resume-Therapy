import { Card } from "@mui/material";

const CustomCard = ({ title, bio, sx, children, ...other }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      textTransform: "uppercase",
      bgcolor: "#1d332e",
      border: "2px solid #fff",
      borderRadius: "0px",
      padding: "10px 32px",
      boxShadow: "10px 10px 5px black",
      transition: "all .3s ease-in-out",
      minHeight: "125px",
      marginBottom: "20px",
      ...sx,
    }}
    {...other}
  >
    {children}
  </Card>
);

export default CustomCard;
