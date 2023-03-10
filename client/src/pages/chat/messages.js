import styles from "./styles.module.css";
import { useEffect, useState, useRef } from "react";

export const Messages = ({ socket }) => {
  const [messagesReceived, setMessagesReceived] = useState([]);

  const messagesColumnRef = useRef(null);

  const sortMessagesByDate = (messages) => {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  };

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => socket.off("receive_message");
  }, [socket]);

  // Runs whenever a socket event is received from the server
  useEffect(() => {
    socket.on("last_100_messages", (last100Messages) => {
      console.log("Last 100 messages", JSON.parse(last100Messages));
      last100Messages = JSON.parse(last100Messages);
      // Sort these messages by __createdtime__
      last100Messages = sortMessagesByDate(last100Messages);
      setMessagesReceived((state) => [...last100Messages, ...state]);
    });

    return () => socket.off("last_100_messages");
  }, [socket]);

  // Scroll to the most recent message
  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesReceived]);

  // dd/mm/yyyy, hh:mm:ss
  const formatDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };
  return (
    <div className={styles.messagesColumn} ref={messagesColumnRef}>
      <div>
        {messagesReceived.map((msg, i) => (
          <div className={styles.message} key={i}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span className={styles.msgMeta}>{msg.username}</span>
              <span className={styles.msgMeta}>
                {formatDateFromTimestamp(msg.__createdtime__)}
              </span>
            </div>
            <p className={styles.msgText}>{msg.message}</p>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};
