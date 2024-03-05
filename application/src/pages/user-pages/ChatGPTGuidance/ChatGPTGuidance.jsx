import "./chatgpt-guidance.css";
import { useState } from "react";
import { useUser } from "../../../context/useUser";
import axios from "axios";
import { Grid, Container } from "@mui/material";
import CustomButton from "../../../component/custom-mui/CustomButton";

const ChatGPTGuidance = () => {
  const { user, loading, error } = useUser();
  const [response, setResponse] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  const fetchMessage = async () => {
    try {
      const { data } = await axios.post("http://localhost:3001/api/chat", {});

      setResponse(data.choices[0].message.content);
    } catch (error) {
      console.error("Failed to fetch the response:", error);
      setResponse("Sorry, something went wrong.");
    }
  };

  return (
    <div>
      <Container maxWidth="xl">
        <div className="page-title">
          <h1>AI Feedback Tool</h1>
          <h2>Coming soon...</h2>
        </div>
      </Container>
    </div>
  );
};

export default ChatGPTGuidance;
