import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firebase-functionality/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  getDoc,
} from "firebase/firestore";

import "./appointments.css";
import TextField from "@mui/material/TextField";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Grid, Container } from "@mui/material";
import CustomButton from "../../../component/custom-mui/CustomButton";

function BookAppointment() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [connections, setConnections] = useState([]);
  const [name, setName] = useState(null);

  const fetchConnections = async () => {
    const q = query(
      collection(db, "connections"),
      where("userid", "==", auth.currentUser.uid),
      where("status", "==", "accepted")
    );
    const connectionsSnapshot = await getDocs(q);
    const connectionsData = connectionsSnapshot.docs.map(
      (doc) => doc.data().reviewerid
    );
    setConnections(connectionsData);
  };

  const fetchName = async () => {
    const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
    if (userDoc.exists()) {
      console.log("name: " + userDoc.data().name);
      setName(userDoc.data().name);
    } else {
      console.log("No such document!");
    }
  };

  const fetchEmployees = async () => {
    const schedulesSnapshot = await getDocs(collection(db, "schedules"));
    const employeesData = await Promise.all(
      schedulesSnapshot.docs
        .filter((scheduleDoc) => connections.includes(scheduleDoc.data().uid))
        .map(async (scheduleDoc) => {
          const userDoc = await getDocs(
            query(
              collection(db, "users"),
              where("uid", "==", scheduleDoc.data().uid)
            )
          );
          const userData = userDoc.docs[0].data();
          return { ...scheduleDoc.data(), name: userData.name };
        })
    );
    setEmployees(employeesData);
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  useEffect(() => {
    if (connections.length > 0) {
      fetchEmployees();
    }
  }, [connections]);

  const handleEmployeeSelection = (employee) => {
    setSelectedEmployee(employee);
    setSelectedSlot(null);
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const bookAppointment = async () => {
    if (!selectedEmployee || !selectedSlot) return;
    fetchName();
    const updatedAvailability = selectedEmployee.availability.map((slot) =>
      slot === selectedSlot
        ? {
            ...slot,
            booked: true,
            bookedBy: auth.currentUser.uid,
            bookedByName: name,
            meetingId:
              Math.random().toString(36).substring(2, 15) +
              Math.random().toString(36).substring(2, 15),
          }
        : slot
    );

    const employeeScheduleRef = doc(db, "schedules", selectedEmployee.uid);
    await updateDoc(employeeScheduleRef, { availability: updatedAvailability });

    setSelectedEmployee(null);
    setSelectedSlot(null);
    fetchEmployees();
  };

  return (
    <div>
      <Container maxWidth="xl">
        <div className="page-title">
          <h1>Book Appointments</h1>
        </div>
        
        <TextField
          id="standard-basic"
          label="Search Resume Therapists..."
          variant="standard"
          fullWidth
        />

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={6}>
            <div>
              {employees.map((employee, index) => (
                <li className="reviewer-container" key={index}>
                  <div className="reviewer">
                    <h1>{employee.name}</h1>
                    <div class="icon">
                      <CalendarMonthIcon
                        variant="outlined"
                        onClick={() => handleEmployeeSelection(employee)}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            {selectedEmployee && (
              <div className="availability-container">
                <h2>Select a time slot with {selectedEmployee.name}: </h2>
                <ul>
                  {selectedEmployee.availability
                    .filter((slot) => !slot.booked)
                    .map((slot, index) => (
                      <li key={index}>
                        {slot.date} : {slot.start} - {slot.end} :
                        <CustomButton onClick={() => handleSlotSelection(slot)}>
                          {" "}
                          Select{" "}
                        </CustomButton>
                      </li>
                    ))}
                </ul>
                {selectedSlot && (
                  <div class="schedule">
                    <h3>Meeting Details:</h3>
                    <p>Date: {selectedSlot.date}</p>
                    <p>Start Time: {selectedSlot.start}</p>
                    <p>End Time: {selectedSlot.end}</p>
                    <p>Employee: {selectedEmployee.name}</p>
                    <p>Meeting Token: {selectedSlot.meetingToken}</p>
                  </div>
                )}
                <CustomButton onClick={bookAppointment}>
                  Book Appointment
                </CustomButton>
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default BookAppointment;
