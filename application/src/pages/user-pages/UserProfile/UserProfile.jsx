import { useState, useEffect } from "react";
import { useUser } from "../../../context/useUser";
import { useNavigate } from "react-router-dom";
import { query, collection, getDocs, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { db, storage } from "../../../firebase-functionality/firebase";
import { addBio } from "../../../firebase-functionality/bio";

// styles
import "./profile.css";
import { Grid, Container } from "@mui/material";
import TextField from "@mui/material/TextField";

// components
import ProfileWidget from "../../../components/widgets/ProfileWidget";
import MessagesWidget from "../../../components/widgets/MessagesWidget";
import CalendarWidget from "../../../components/widgets/CalendarWidget";
import ViewResumeWidget from "../../../components/widgets/ViewResumeWidget";
import ViewBioWidget from "../../../components/widgets/ViewBioWidget";
import CustomButton from "../../../components/custom-mui/CustomButton";
import EditBioPopup from "../../../components/popups/EditBioPopup";
import ViewBioPopup from "../../../components/popups/ViewBioPopup";
import UploadResumePopup from "../../../components/popups/UploadResumePopup";
import ViewResumePopup from "../../../components/popups/ViewResumePopup";
import UploadResumeWidget from "../../../components/widgets/UploadResumeWidget";
import EditBioWidget from "../../../components/widgets/EditBioWidget";

// animation imports
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function UserProfile() {
  const { user, loading, logout } = useUser();
  const [buttonPopup, setButtonPopup] = useState(false);
  const [resumePopup, setResumePopup] = useState(false);
  const [viewResumePopup, setViewResumePopup] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumePreview, setResumePreview] = useState("");
  const [viewBioPopup, setViewBioPopup] = useState(false);
  const [name, setName] = useState("");
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

  useEffect(() => {
    if (resumeFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumePreview(reader.result);
      };
      reader.readAsDataURL(resumeFile);
    } else {
      setResumePreview(null);
    }
  }, [resumeFile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      (file && file.type.substr(0, 5) === "image") ||
      file.type === "application/pdf"
    ) {
      setResumeFile(file);
    } else {
      setResumeFile(null);
    }
  };

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
    console.log("imageUpload: ", resumeFile);
    if (!resumeFile) return;

    const imageRef = ref(storage, `resumes/users/${user?.uid}/resume`);
    uploadBytes(imageRef, resumeFile)
      .then((snapshot) => {
        getDownloadURL(ref(storage, snapshot.ref.fullPath))
          .then((url) => {
            console.log("url: ", url);
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

  useGSAP(() => {
    gsap.from(".page-title", {
      opacity: 0,
      delay: 0.05,
      duration: 0.75,
      y: -50,
      ease: "back.inOut",
    });

    gsap.from(".grid-item", {
      opacity: 0,
      delay: 0.45,
      stagger: 0.05,
      rotationX: -90,
      ease: "back.inOut",
    });
  });

  return (
    <div>
      <Container maxWidth="xl">
        <div className="page-title">
          <h1>Hi, welcome back!</h1>
        </div>

        <Grid container spacing={6}>
          <Grid className="grid-item" item xs={12} sm={8} md={8} lg={8} xl={8}>
            <ProfileWidget title={name} />
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid className="grid-item" item xs={6} md={4} lg={4}>
            <ViewResumeWidget
              title="View Resume"
              onClick={() => setViewResumePopup(true)}
            />
          </Grid>

          <Grid className="grid-item" item xs={6} md={4} lg={4}>
            <UploadResumeWidget
              title="Upload Resume"
              onClick={() => setResumePopup(true)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={6}>
          <Grid className="grid-item" item xs={6} md={4} lg={4}>
            <ViewBioWidget
              title="View Bio"
              onClick={() => setViewBioPopup(true)}
            />
          </Grid>
          <Grid className="grid-item" item xs={6} md={4} lg={4}>
            <EditBioWidget
              title="Edit Bio"
              onClick={() => setEditBioPopup(true)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid className="grid-item" item xs={6} md={4} lg={4}>
            <CalendarWidget
              title="Calendar"
              onClick={() => navigate("/UserDash/BookAppointment")}
            />
          </Grid>

          <Grid className="grid-item" item xs={6} md={4} lg={4}>
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
            onChange={handleFileChange}
            hidden
          />
        </CustomButton>
        {resumePreview && (
          <div>
            <h2>Preview:</h2>
            {resumeFile.type.substr(0, 5) === "image" ? (
              <img
                src={resumePreview}
                alt="Resume Preview"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            ) : (
              <embed
                src={resumePreview}
                type="application/pdf"
                width="100%"
                height="600px"
              />
            )}
          </div>
        )}
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
