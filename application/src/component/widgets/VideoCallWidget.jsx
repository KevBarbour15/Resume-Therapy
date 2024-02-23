import PropTypes from "prop-types";
import { CardActions, Typography } from "@mui/material";
import CustomCard from "../custom-mui/CustomCard";
import CustomButton from "../custom-mui/CustomButton";

VideoCallWidget.propTypes = {
  appointment: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired,
  employee: PropTypes.bool.isRequired,
  handleRemoveAppointment: PropTypes.func,
};

export default function VideoCallWidget({
  appointment,
  startCall,
  employee,
  handleRemoveAppointment,
  ...other
}) {
  return (
    <CustomCard {...other}>
      <Typography
        sx={{
          fontFamily: "Outfit, sans-serif",
          fontWeight: "600",
          color: "#fff",
        }}
      >
        <h2>{appointment.name}</h2>
        <ul>
          <li> Date: {appointment.date}</li>
          <li>Start: {appointment.start}</li>
          <li>End: {appointment.end}</li>
        </ul>
      </Typography>
      <CardActions>
        <CustomButton onClick={() => startCall(appointment)}>
          Join call
        </CustomButton>
        {employee && (
          <CustomButton onClick={() => handleRemoveAppointment(appointment)}>
            Delete Appointment
          </CustomButton>
        )}
      </CardActions>
    </CustomCard>
  );
}
