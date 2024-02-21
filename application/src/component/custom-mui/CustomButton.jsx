import { Button } from '@mui/material';

const CustomButton = ({ children, onClick, ...props }) => (
  <Button
    onClick={onClick}
    variant="outlined"
    sx={{
      fontFamily: "Outfit, sans-serif",
      color: "black",
      border: "2px solid black",
      borderRadius: "10px",
      margin: "auto",
      "&:hover": {
        color: "white",
        bgcolor: "black",
        border: "2px solid black",
      },
    }}
    {...props}
  >
    {children}
  </Button>
);

export default CustomButton;
