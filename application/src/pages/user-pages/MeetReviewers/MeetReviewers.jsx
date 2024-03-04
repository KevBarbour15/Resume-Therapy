import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db } from "../../../firebase-functionality/firebase";
import { addConnection } from "../../../firebase-functionality/connections";

import { Grid, Container } from "@mui/material";

import TextField from "@mui/material/TextField";

import "./reviewers.css";
import ReviewerWidget from "../../../component/widgets/ReviewerWidget";

const MeetReviewers = () => {
  const [user, loading] = useAuthState(auth);
  const [reviewers, setReviewers] = useState([]);
  const [filterText, setfilterText] = useState("");
  const [filteredConnection, setfilteredConnection] = useState([]);

  const fetchReviewers = async () => {
    try {
      const q = query(collection(db, "users"), where("employee", "==", true));
      const q2 = query(
        collection(db, "connections"),
        where("userid", "==", user?.uid)
      );
      const docs = await getDocs(q);
      const docs2 = await getDocs(q2);

      const tempConnections = [];
      docs2.forEach((doc) => {
        tempConnections.push(doc.data().reviewerid);
      });

      const tempReviewers = [];
      docs.forEach((doc) => {
        const reviewerUid = doc.data().uid;
        if (!tempConnections.includes(reviewerUid)) {
          tempReviewers.push([
            doc.data().name,
            reviewerUid,
            doc.data().bio || "",
          ]);
        }
      });
      setReviewers(tempReviewers);
      setfilteredConnection(tempReviewers);
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    if (!loading && user) {
      fetchReviewers();
    }
  }, [user, loading]);

  useEffect(() => {
    let newFilteredConnectons;
    if (filterText == "") {
      newFilteredConnectons = reviewers;
    } else {
      newFilteredConnectons = reviewers.filter((item) =>
        item[0].toLowerCase().includes(filterText.toLowerCase())
      );
    }
    setfilteredConnection(newFilteredConnectons);
  }, [filterText, reviewers]);

  const handleFilterText = (event) => {
    setfilterText(event.target.value);
  };

  return (
    <div>
      <Container maxWidth="xl">
        <div className="page-title">
          <h1>Meet Resume Therapists</h1>
        </div>

        <TextField
          id="standard-basic"
          label="Search Resume Therapists..."
          variant="standard"
          onChange={handleFilterText}
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Grid container spacing={4}>
          {filteredConnection.map((reviewer) => (
            <Grid item xs={12} md={6} lg={6} key={reviewer[1]}>
              <ReviewerWidget
                title={reviewer[0]}
                bio={reviewer[2]}
                button={addConnection}
                userid={user.uid}
                reviewerid={reviewer[1]}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default MeetReviewers;
