import { useState, useEffect } from "react";
import { useUser } from "../../../context/useUser";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import {  db, storage } from "../../../firebase-functionality/firebase";
import { addBio } from "../../../firebase-functionality/bio";

import "./profile.css";
import ProfileWidget from "../../../component/widgets/ProfileWidget";
import MessagesWidget from "../../../component/widgets/MessagesWidget";
import CalendarWidget from "../../../component/widgets/CalendarWidget";
import ViewResumeWidget from "../../../component/widgets/ViewResumeWidget";
import ViewBioWidget from "../../../component/widgets/ViewBioWidget";
import CustomButton from "../../../component/custom-mui/CustomButton";
import EditBioPopup from "../../../component/popups/EditBioPopup";
import ViewBioPopup from "../../../component/popups/ViewBioPopup";
import UploadResumePopup from "../../../component/popups/UploadResumePopup";
import ViewResumePopup from "../../../component/popups/ViewResumePopup";

import { Grid, Container } from "@mui/material";
import TextField from "@mui/material/TextField";

function UserProfile() {
  const { user, loading, logout } = useUser();
  const [buttonPopup, setButtonPopup] = useState(false);
  const [resumePopup, setResumePopup] = useState(false);
  const [viewResumePopup, setViewResumePopup] = useState(false);
  const [viewBioPopup, setViewBioPopup] = useState(false);
  const [name, setName] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [bio, setBio] = useState("");

  const navigate = useNavigate();
  const imageListRef = ref(storage, `resumes/users/${user?.uid}/`);

  useEffect(() => {
    let isMounted = true;

    const fetchUserName = async () => {
      try {
        const q = query(
          collection(db, "users"),
          user?.uid ? where("uid", "==", user.uid) : undefined
        );

        const doc = await getDocs(q);
        const data = doc.docs[0]?.data();
        if (data && isMounted) {
          setName(data.name);
          setBio(data.bio || "");
          if (data.employee) {
            setStatus("true");
            logout();
          } else {
            setStatus("false");
          }
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred while fetching user data");
      }
    };

    if (!loading && !user) {
      navigate("/");
    } else {
      fetchUserName();
    }

    return () => {
      isMounted = false;
    };
  }, [user, loading, navigate]);

  useEffect(() => {
    let isMounted = true;

    if (!user) return;

    listAll(imageListRef)
      .then((res) => {
        const promises = res.items.map((itemRef) =>
          getDownloadURL(itemRef).then((url) => {
            if (isMounted) setImage(url);
          })
        );

        Promise.all(promises).catch((err) => {
          console.error(err);
          alert("An error occurred while fetching resume data 1");
        });
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while fetching resume data 2");
      });

    return () => {
      isMounted = false;
    };
  }, [imageListRef, user]);

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleBioSubmit = async () => {
    if (!user) return;
    await addBio(user.uid, bio);
  };

  const handleWrapperBioTrigger = async () => {
    await handleBioSubmit();
    setButtonPopup(false);
  };

  const handleUploadImage = () => {
    if (!imageUpload) return;

    const imageRef = ref(storage, `resumes/users/${user?.uid}/resume`);
    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(ref(storage, snapshot.ref.fullPath))
          .then((url) => {
            setImage(url);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleImageChange = (event) => {
    setImageUpload(event.target.files[0]);
  };

  return (
    <div>
      <Container maxWidth="xl">
        <div className="page-title">
          <h1>Hi, welcome back!</h1>
        </div>

        <Grid container spacing={6}>
          <Grid item xs={7} sm={8} md={8} lg={8} xl={6}>
            <ProfileWidget title={name} bio={bio} />
          </Grid>
          <Grid
            item
            xs={5}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            container
            sx={{
              display: "flex",
              flexDirection: {
                xs: "row",
                sm: "column",
                md: "column",
                lg: "column",
                xl: "column",
              },
            }}
          >
            <Grid item>
              <CustomButton onClick={() => setButtonPopup(true)}>
                Edit Bio
              </CustomButton>
            </Grid>
            <Grid item>
              <CustomButton onClick={() => setResumePopup(true)}>
                Upload Resume
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={6} md={4} lg={4}>
            <ViewResumeWidget
              title="View Resume"
              onClick={() => setViewResumePopup(true)}
            />
          </Grid>

          <Grid item xs={6} md={4} lg={4}>
            <ViewBioWidget
              title="View Bio"
              onClick={() => setViewBioPopup(true)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={6} md={4} lg={4}>
            <CalendarWidget
              title="Appointments"
              onClick={() => navigate("/UserDash/BookAppointment")}
            />
          </Grid>

          <Grid item xs={6} md={4} lg={4}>
            <MessagesWidget
              title="Messages"
              onClick={() => navigate("/UserDash/Messages")}
            />
          </Grid>
        </Grid>
      </Container>

      <UploadResumePopup trigger={resumePopup} setTrigger={setResumePopup}>
        <h1 className="widget-title">Upload Resume</h1>
        <CustomButton component="label" sx={{ marginBottom: 2 }}>
          Choose File
          <input
            type="file"
            accept="image/*, application/pdf"
            onChange={handleImageChange}
            hidden
          />
        </CustomButton>
        <CustomButton
          compononet="label"
          onClick={() => handleUploadImage()}
          sx={{ marginBottom: 2 }}
        >
          Upload
        </CustomButton>
      </UploadResumePopup>

      <ViewResumePopup
        trigger={viewResumePopup}
        setTrigger={setViewResumePopup}
      >
        <div>
          {image ? (
            <div className="resume">
              <img src={image} className="img" alt="Resume preview" />
            </div>
          ) : (
            <div className="no-resume">No resume uploaded.</div>
          )}
        </div>
      </ViewResumePopup>

      <EditBioPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <h1 className="widget-title">Edit Bio</h1>
        <TextField
          multiline
          rows={12}
          value={bio}
          onChange={handleBioChange}
          placeholder="Write a brief description about yourself..."
          sx={{ marginBottom: 2, width: "300px" }}
        />

        <CustomButton
          variant="outlined"
          onClick={() => handleWrapperBioTrigger()}
        >
          Update Bio
        </CustomButton>
      </EditBioPopup>

      <ViewBioPopup trigger={viewBioPopup} setTrigger={setViewBioPopup}>
        <div>
          <h1 className="widget-title">Bio</h1>
          <p>{bio}</p>
        </div>
      </ViewBioPopup>
    </div>
  );
}

export default UserProfile;
