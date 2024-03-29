import { useEffect, useState, useCallback } from "react";
import { db } from "../../../firebase-functionality/firebase";
import { useUser } from "../../../context/useUser";
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
import "./virtual-call.css";
import { Grid, Container } from "@mui/material";

import VideoCallWidget from "../../../components/widgets/VideoCallWidget";
import CustomButton from "../../../components/custom-mui/CustomButton";

const VirtualCall = () => {
  const { user, loading, error } = useUser();
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEmployee, setIsEmployee] = useState(null);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [daily, setDaily] = useState(null);
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

  const fetchUserData = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const userSnapshot = await getDocs(q);

      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        setIsEmployee(userData.employee);
      } else {
        console.error("User not found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAppointments = async () => {
    try {
      const schedulesSnapshot = await getDocs(collection(db, "schedules"));

      const appointmentsData = [];
      schedulesSnapshot.forEach((scheduleDoc) => {
        const scheduleData = scheduleDoc.data();
        const availability = scheduleData.availability || [];
        const appointments = availability
          .filter((slot) => slot.booked && slot.bookedBy === user.uid)
          .map((slot) => ({
            ...slot,
            meetingToken: slot.meetingToken,
            meetingUrl: slot.meetingUrl,
            id: scheduleDoc.id,
          }));

        appointmentsData.push(...appointments);
      });

      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Error fetching appointments: ", error);
      alert("An error occurred while fetching appointments");
    }
  };

  useEffect(() => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return;

    const fetchUserDataAndAppointments = async () => {
      await fetchUserData();
      await fetchAppointments();
    };

    fetchUserDataAndAppointments();
  }, [user, loading]);

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
    console.log(response);
    console.log(
      "Token generated " + response.data.token + " for room " + roomName + "."
    );
    return response.data.token;
  };

  const joinCall = async (appointment) => {
    try {
      let meetingUrl = appointment.meetingUrl;
      let meetingToken = appointment.meetingToken;

      if (!meetingUrl || !meetingToken) {
        const meetingRoomsRef = collection(db, "meetingRooms");
        const q = query(meetingRoomsRef, where("inUse", "==", false));
        const meetingRoomsSnapshot = await getDocs(q);

        if (!meetingRoomsSnapshot.empty) {
          const meetingRoomDoc = meetingRoomsSnapshot.docs[0];
          const meetingRoomData = meetingRoomDoc.data();
          const roomName = meetingRoomData.roomName;
          setMeetingRoomDocRef(meetingRoomDoc.ref);

          meetingUrl = meetingRoomData.room;

          await updateDoc(meetingRoomDoc.ref, {
            inUse: true,
          });

          meetingToken = await generateToken(roomName);

          if (appointment && appointment.id) {
            const scheduleRef = doc(db, "schedules", appointment.id);
            const scheduleSnap = await getDoc(scheduleRef);
            const scheduleData = scheduleSnap.data();
            const updatedAvailability = scheduleData.availability.map((slot) =>
              slot.bookedBy === user.uid &&
              slot.meetingId === appointment.meetingId
                ? { ...slot, meetingUrl, meetingToken }
                : slot
            );
            await updateDoc(scheduleRef, { availability: updatedAvailability });
          } else {
            console.error("Invalid appointment");
            return;
          }
        } else {
          console.error("No available meeting rooms");
          return;
        }
      }

      const appointmentDetails = { ...appointment, meetingUrl, meetingToken };
      setSelectedAppointment(appointmentDetails);
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

      window.location.reload();
    } else {
      console.error("No active call to end");
    }
  };

  useEffect(() => {
    if (isCallModalOpen && selectedAppointment && daily) {
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
  }, [isCallModalOpen, selectedAppointment, daily]);

  return (
    <>
      <Container maxWidth="xl">
        <div className="page-title">
          <h1>Upcoming Calls</h1>
        </div>

        <Grid container spacing={4}>
          {appointments.map((appointment, index) => (
            <Grid item xs={12} sm={6} md={6} lg={6} xl={4} key={index}>
              <VideoCallWidget
                key={index}
                appointment={appointment}
                startCall={startCall}
                employee={false}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Modal
        isOpen={isCallModalOpen}
        onRequestClose={endCall}
        contentLabel="Video Call Modal"
        className={"call-modal"}
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
    </>
  );
};

export default VirtualCall;
