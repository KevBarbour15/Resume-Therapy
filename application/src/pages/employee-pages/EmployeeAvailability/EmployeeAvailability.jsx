import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase-functionality/firebase.js";
import { query, collection, where, getDocs } from "firebase/firestore";
import {
  fetchAvailability,
  addAvailability,
  updateAvailability,
  removeAvailability,
} from "../../../firebase-functionality/availability.js";

import "./availability.css";
import { Grid, Container, TextField } from "@mui/material";
import CustomButton from "../../../components/custom-mui/CustomButton.jsx";

function EmpAvailability() {
  const [user] = useAuthState(auth);
  const [availability, setAvailability] = useState([]);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const fetchName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      if (!doc.empty) {
        const data = doc.docs[0].data();
        setName(data.name);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    if (user) {
      fetchAvailability(user.uid).then(setAvailability);
      fetchName();
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!date || !start || !end) return;

    const newSlot = {
      name,
      date,
      start,
      end,
      booked: false,
    };

    const dateNow = new Date();
    dateNow.setHours(0, 0, 0, 0);
    const dateSlot = new Date(date);
    if (dateSlot < dateNow) {
      alert("You can't add a time slot in the past!");
      return;
    }

    // Check for conflicting appointments
    const conflict = availability.some(
      (slot) =>
        slot.date === date &&
        ((slot.start <= start && start < slot.end) ||
          (slot.start < end && end <= slot.end))
    );

    if (conflict) {
      alert("There's a conflict with another appointment!");
      return;
    }

    if (editing) {
      const updatedAvailability = await updateAvailability(
        user.uid,
        editingIndex,
        newSlot
      );
      setAvailability(updatedAvailability);
    } else {
      const updatedAvailability = await addAvailability(user.uid, newSlot);
      setAvailability(updatedAvailability);
    }

    setDate("");
    setStart("");
    setEnd("");
    setEditing(false);
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    const slot = availability[index];
    setEditing(true);
    setEditingIndex(index);
    setDate(slot.date);
    setStart(slot.start);
    setEnd(slot.end);
  };

  const handleRemove = async (index) => {
    const updatedAvailability = await removeAvailability(user.uid, index);
    setAvailability(updatedAvailability);
  };

  return (
    <Container maxWidth="xl">
      <div className="page-title">
        <h1>Availability</h1>
      </div>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                label="Date"
                type="date"
                variant="standard"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div>
              <TextField
                label="Start Time"
                type="time"
                variant="standard"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div>
              <TextField
                label="End Time"
                type="time"
                variant="standard"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <CustomButton type="submit" variant="outlined">
              {editing ? "Update" : "Add"} Time Slot
            </CustomButton>
          </form>
        </Grid>
        <div className="page-title">
          <h1>Current Availability</h1>
        </div>
        <Grid item xs={12} sm={6}>
          {availability.map((slot, index) => (
            <li key={index}>
              {slot.date} {slot.start} - {slot.end}
              {slot.booked ? (
                <p>Slot is booked by {slot.bookedByName}</p>
              ) : (
                <p>Slot is available</p>
              )}
              <CustomButton onClick={() => handleEdit(index)}>
                Edit
              </CustomButton>
              <CustomButton onClick={() => handleRemove(index)}>
                Remove
              </CustomButton>
            </li>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default EmpAvailability;
