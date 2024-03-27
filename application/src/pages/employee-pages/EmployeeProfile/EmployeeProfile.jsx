import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase-functionality/firebase";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { addBio } from "../../../firebase-functionality/bio";
import EditProfilePopup from "../../../components/popups/EditBioPopup";
import UploadResumePopup from "../../../components/popups/UploadResumePopup";
import TextField from "@mui/material/TextField";
import { Grid, Container } from "@mui/material";

import "./profile.css";

import ProfileWidget from "../../../components/widgets/ProfileWidget";
import MessagesWidget from "../../../components/widgets/MessagesWidget";
import CalendarWidget from "../../../components/widgets/CalendarWidget";
import UploadResumeWidget from "../../../components/widgets/ViewResumeWidget";
import CustomButton from "../../../components/custom-mui/CustomButton";

function EmpProfile() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [resumePopup, setResumePopup] = useState(false);

  const [user, loading] = useAuthState(auth);
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
          if (data.user) {
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
            alert("An error occurred while fetching resume data 3");
          });
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while uploading resume data");
      });
  };

  const handleImageChange = (event) => {
    setImageUpload(event.target.files[0]);
  };

  return (
    <div>
      <div>
        <Container maxWidth="xl">
          <div className="page-title">
            <h1>Hi, welcome back!</h1>
          </div>

          <Grid container spacing={6}>
            <Grid item xs={7} sm={8} md={8} lg={8} xl={6}>
              <ProfileWidget title={name} bio={bio} />
            </Grid>

            <Grid item xs={12} sm={3} md={3}>
              <CustomButton onClick={() => setButtonPopup(true)}>
                Edit Bio
              </CustomButton>
            </Grid>
          </Grid>

          <Grid container spacing={6}>
            <Grid item xs={12} sm={3} md={3}>
              <UploadResumeWidget
                title="Upload Resume"
                onClick={() => setResumePopup(true)}
              />{" "}
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <CalendarWidget
                title="Calendar"
                total={714}
                sx={{ boxShadow: 5 }}
                onClick={() => navigate("/ReviewerDash/Availability")}
              />{" "}
            </Grid>

            <Grid item xs={12} md={3} lg={3}>
              <MessagesWidget
                title="Messages"
                onClick={() => navigate("/ReviewerDash/Messages")}
              />{" "}
            </Grid>
          </Grid>
        </Container>
      </div>

      <UploadResumePopup trigger={resumePopup} setTrigger={setResumePopup}>
        <CustomButton>
          Choose File
          <input
            type="file"
            accept="image/*, application/pdf"
            onChange={handleImageChange}
            hidden
          />
        </CustomButton>
        <CustomButton
          variant="contained"
          compononet="label"
          onClick={() => handleUploadImage()}
        >
          Upload
        </CustomButton>

        <div>
          {image && (
            <div className="resume">
              <img src={image} class="img" alt="Resume preview" />
            </div>
          )}
        </div>
      </UploadResumePopup>

      <EditProfilePopup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Bio"
            multiline
            rows={5}
            value={bio}
            onChange={handleBioChange}
            placeholder="Write a brief description about yourself..."
          />

          <CustomButton onClick={() => handleWrapperBioTrigger()}>
            Update Bio
          </CustomButton>
        </div>
      </EditProfilePopup>
    </div>
  );
}

export default EmpProfile;
