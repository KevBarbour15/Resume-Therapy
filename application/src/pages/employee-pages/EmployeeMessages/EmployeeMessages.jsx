import React, { useState, useEffect } from "react";
import "react-chat-elements/dist/main.css";
import { auth } from "../../../firebase-functionality/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { ListConversations } from "../../../firebase-functionality/messages.js";
import "./messages.css";
import { TextField } from "@mui/material";
import { ChatMessage } from "./Chatbox.jsx";

function UserMessages() {
  const [listConnection, setListConnection] = useState([]);
  const [filterText, setfilterText] = useState("");
  const [filteredConnection, setfilteredConnection] = useState([]);
  const [authUser, setAuthUser] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (resolve) => {
      ListConversations(resolve).then((theData) => {
        setfilteredConnection(theData);
        setListConnection(theData);
      });
      setAuthUser(resolve);
    });
  }, []);

  const handleConversationClick = (conversationId) => {
    if (conversationId == activeConversation) {
      setActiveConversation(null);
    } else {
      setActiveConversation(conversationId);
    }
  };

  useEffect(() => {
    let newFilteredConnectons;
    if (filterText == "") {
      newFilteredConnectons = listConnection;
    } else {
      newFilteredConnectons = listConnection.filter((item) =>
        item.id.includes(filterText)
      );
    }
    setfilteredConnection(newFilteredConnectons);
  }, [filterText]);

  const handleFilterText = (event) => {
    setfilterText(event.target.value);
  };

  return (
    <div>
      <div className="page-title">
        <h1>Messages</h1>
      </div>
      <div className="messages">
        <div className="message-list">
          <div className="messages-nav">
            <TextField
              id="standard-basic"
              value={filterText}
              onChange={handleFilterText}
              label="Search Messages..."
              variant="standard"
              fullWidth
            />
          </div>

          {filteredConnection.map((connection) => (
            <li key={connection.ref.id}>
              <ChatMessage
                dataSource={[
                  {
                    avatar:
                      "https://github.githubassets.com/images/icons/emoji/unicode/1f604.png",
                    authUser: authUser,
                    conversation: connection,
                  },
                ]}
                slideBool={activeConversation == connection.ref.id}
                callback={handleConversationClick}
                authenticate={authUser}
              />
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserMessages;
