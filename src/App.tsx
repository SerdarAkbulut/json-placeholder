import { useState } from "react";
import "./App.css";
import PostList from "./components/postList";
import UserList from "./components/userList";

function App() {
  const [show, setShow] = useState<"posts" | "users" | null>("posts");

  return (
    <div
      style={{
        display: "flex",
        gap: "50px",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <button onClick={() => setShow("posts")}>Show Posts</button>
        <button onClick={() => setShow("users")}>Show Users</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {show === "posts" && <PostList />}
        {show === "users" && <UserList />}
      </div>
    </div>
  );
}

export default App;
