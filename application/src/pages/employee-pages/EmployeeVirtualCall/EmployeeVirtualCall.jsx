import React, { useEffect, useState, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase-functionality/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import Modal from "react-modal";
import DailyIframe from "@daily-co/daily-js";
import axios from "axios";
import { removeAvailability } from "../../../firebase-functionality/availability";
import { Grid, Container } from "@mui/material";

import VideoCallWidget from "../../../component/widgets/VideoCallWidget";
import CustomButton from "../../../component/custom-mui/CustomButton";

const EmployeeVirtualCall = () => {
  const [user, loading] = useAuthState(auth);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [daily, setDaily] = useState(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [meetingRoomDocRef, setMeetingRoomDocRef] = useState(null);

  const videoRef = useCallback((node) => {
    if (node !== null) {
      setDaily(
        DailyIframe.wrap(node, {
          iframeStyle: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          },
        })
      );
    }
  }, []);

  const fetchAppointments = async () => {
    try {
      const q = query(
        collection(db, "schedules"),
        where("uid", "==", user.uid)
      );
      const schedulesSnapshot = await getDocs(q);

      const appointmentsData = [];

      schedulesSnapshot.forEach((doc) => {
        const scheduleData = doc.data();

        const bookedAppointments = scheduleData.availability
          .filter((appointment) => appointment.booked === true)
          .map((appointment) => ({
            ...appointment,

            scheduleId: doc.id,
          }));
        appointmentsData.push(...bookedAppointments);
      });

      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    if (loading || !user) return;

    fetchAppointments();
  }, [user, loading, fetchAppointments]);

  const generateToken = async (roomName) => {
    const apiKey = process.env.REACT_APP_DAILY_API_KEY;

    const response = await axios.post(
      "https://api.daily.co/v1/meeting-tokens",
      {
        properties: {
          room_name: roomName,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    console.log("Token generated: ", response.data.token);
    return response.data.token;
  };

  const joinCall = async (appointment) => {
    try {
      const scheduleRef = doc(db, "schedules", appointment.scheduleId);
      const scheduleSnap = await getDoc(scheduleRef);
      const scheduleData = scheduleSnap.data();

      const appointmentIndex = scheduleData.availability.findIndex(
        (slot) => slot.meetingId === appointment.meetingId
      );

      if (appointmentIndex === -1) {
        console.error("Appointment not found in schedule");
        return;
      }

      let meetingUrl = scheduleData.availability[appointmentIndex].meetingUrl;
      let meetingToken =
        scheduleData.availability[appointmentIndex].meetingToken;

      if (!meetingUrl || !meetingToken) {
        const meetingRoomsRef = collection(db, "meetingRooms");
        const q = query(meetingRoomsRef, where("inUse", "==", false));
        const meetingRoomsSnapshot = await getDocs(q);

        if (meetingRoomsSnapshot.empty) {
          console.error("No available meeting rooms");
          return;
        }

        const meetingRoomDoc = meetingRoomsSnapshot.docs[0];
        const meetingRoomData = meetingRoomDoc.data();
        const roomName = meetingRoomData.roomName;
        setMeetingRoomDocRef(meetingRoomDoc.ref);

        meetingUrl = meetingRoomData.room;

        await updateDoc(meetingRoomDoc.ref, {
          inUse: true,
        });

        meetingToken = await generateToken(roomName);

        scheduleData.availability[appointmentIndex].meetingUrl = meetingUrl;
        scheduleData.availability[appointmentIndex].meetingToken = meetingToken;

        await updateDoc(scheduleRef, {
          availability: scheduleData.availability,
        });
      }

      console.log("Joining call at: ", meetingUrl);
      setSelectedAppointment({ ...appointment, meetingUrl, meetingToken });
    } catch (error) {
      console.error("Failed to join call:", error);
    }
  };

  const startCall = (appointment) => {
    console.log("startCall function is called with appointment: ", appointment);
    joinCall(appointment);
    console.log("Setting isCallModalOpen to true");
    setIsCallModalOpen(true);
  };

  const endCall = async () => {
    if (daily) {
      daily.leave();
      daily.destroy();
      setIsCallModalOpen(false);

      if (meetingRoomDocRef) {
        await updateDoc(meetingRoomDocRef, { inUse: false });
        setMeetingRoomDocRef(null);
      }

      if (selectedAppointment && selectedAppointment.meetingId) {
        const scheduleRef = doc(
          db,
          "schedules",
          selectedAppointment.scheduleId
        );
        const scheduleSnap = await getDoc(scheduleRef);
        const scheduleData = scheduleSnap.data();

        const appointmentIndex = scheduleData.availability.findIndex(
          (slot) => slot.meetingId === selectedAppointment.meetingId
        );

        if (appointmentIndex !== -1) {
          // Update the appointment in the local copy of the array
          scheduleData.availability[appointmentIndex].meetingUrl = null;
          scheduleData.availability[appointmentIndex].meetingToken = null;

          // Write the entire array back to Firestore
          await updateDoc(scheduleRef, {
            availability: scheduleData.availability,
          });
        }
      }

      window.location.reload();
    } else {
      console.error("No active call to end");
    }
  };

  useEffect(() => {
    if (isCallModalOpen && selectedAppointment && daily) {
      console.log("Joining call");
      console.log("meetingUrl: ", selectedAppointment.meetingUrl);
      console.log("meetingToken: ", selectedAppointment.meetingToken);
      if (selectedAppointment.meetingUrl && selectedAppointment.meetingToken) {
        daily.join({
          url: String(selectedAppointment.meetingUrl),
          token: String(selectedAppointment.meetingToken),
        });
      } else {
        console.log("Missing meeting URL or token");
      }

      daily.on("left-meeting", async () => {
        daily.destroy();
        setSelectedAppointment(null);
        setIsCallModalOpen(false);

        if (meetingRoomDocRef) {
          await updateDoc(meetingRoomDocRef, { inUse: false });
          setMeetingRoomDocRef(null);
        }

        if (selectedAppointment && selectedAppointment.id) {
          const scheduleRef = doc(db, "schedules", selectedAppointment.id);
          const scheduleSnap = await getDoc(scheduleRef);
          const scheduleData = scheduleSnap.data();
          const updatedAvailability = scheduleData.availability.map((slot) =>
            slot.bookedBy === user.uid &&
            slot.meetingId === selectedAppointment.meetingId
              ? { ...slot, meetingUrl: null, meetingToken: null }
              : slot
          );
          await updateDoc(scheduleRef, { availability: updatedAvailability });
        }
      });

      daily.on("error", (error) => {
        console.error("Daily error:", error);
        daily.destroy();
        setSelectedAppointment(null);
        setIsCallModalOpen(false);
      });
    }
  }, [selectedAppointment]);

  const handleRemoveAppointment = async (index) => {
    const updatedAvailability = await removeAvailability(user.uid, index);
    setAppointments(updatedAvailability);
  };

  return (
    <>
      <Container maxWidth="xl">
        <div className="page-title">
          <h1>Upcoming Calls</h1>
        </div>

        <Grid container spacing={4}>
          {appointments.map((appointment, index) => (
            <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
              <VideoCallWidget
                key={index}
                appointment={appointment}
                startCall={startCall}
                employee={true}
                handleRemoveAppointment={handleRemoveAppointment}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <div className="modal">
        <Modal
          isOpen={isCallModalOpen}
          onRequestClose={endCall}
          contentLabel="Video Call Modal"
        >
          <div className="call-container-modal">
            <div className="video-container">
              <iframe
                ref={videoRef}
                title="Video Call"
                allow="microphone; camera; autoplay;"
              />
            </div>
            <CustomButton sx={{ marginTop: 3 }} onClick={endCall}>
              End Call
            </CustomButton>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default EmployeeVirtualCall;
