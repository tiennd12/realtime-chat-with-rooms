import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

export const Home = ({ room, setRoom, username, setUsername, socket }) => {
  const navigate = useNavigate();
  const joinRoom = () => {
    if (room !== "" && username !== "") {
      window.localStorage.setItem("username", JSON.stringify(username));
      window.localStorage.setItem("room", JSON.stringify(room));
      socket.emit("join_room", { username, room });
      navigate("/chat", { replace: true });
    }
  };

  const getLocalUsername = () => {
    if (localStorage.getItem("username") === null) {
      localStorage.setItem("username", JSON.stringify([]));
    } else {
      let usernameLocal = JSON.parse(localStorage.getItem("username"));
      setUsername(usernameLocal);
    }
  };

  const getLocalRoom = () => {
    if (localStorage.getItem("room") === null) {
      localStorage.setItem("room", JSON.stringify([]));
    } else {
      let roomLocal = JSON.parse(localStorage.getItem("room"));
      setRoom(roomLocal);
    }
  };

  useEffect(() => {
    getLocalUsername();
    getLocalRoom();
  },[]);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>DevRooms</>`}</h1>
        <input
          placeholder="Username..."
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        <select
          className={styles.input}
          onChange={(e) => setRoom(e.target.value)}
          value={room}
        >
          <option>-- Select Room --</option>
          <option value="javascript">JavaScript</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
          <option value="react">React</option>
        </select>

        <button
          className="btn btn-secondary"
          style={{ width: "100%" }}
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>
    </div>
  );
};
