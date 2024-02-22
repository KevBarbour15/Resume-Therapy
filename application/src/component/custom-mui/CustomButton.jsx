import { Button } from "@mui/material";

const CustomButton = ({ children, sx, onClick, ...props }) => (
  <Button
    onClick={onClick}
    variant="outlined"
    sx={{
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
      marginBottom: "20px",
      "&:hover": {
        color: "#fff",
        border: "1px solid black",
        bgcolor: "purple",
      },
      ...sx,
    }}
    {...props}
  >
    {children}
  </Button>
);

export default CustomButton;
