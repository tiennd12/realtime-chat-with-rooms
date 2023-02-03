import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { Messages } from "./messages";
import { SendMessage } from "./send-message";
import { RoomAndUsers } from "./room-and-users";

export const Chat = ({ socket, username, room }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!username) {
      navigate("/", { replace: true });
    }
  });

  return (
    <div className={styles.chatContainer}>
      <RoomAndUsers socket={socket} username={username} room={room} />

      <div>
        <Messages socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};
