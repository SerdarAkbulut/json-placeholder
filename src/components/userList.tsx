import { useEffect, useState } from "react";
import {
  addPost,
  addUser,
  deleteUser,
  getUserList,
  getUserPostList,
  updateUser,
} from "../api/request";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body?: string;
}

function UserList() {
  const [userList, setUserList] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Record<number, Post[]>>({});
  const [newUserName, setNewUserName] = useState("");
  const [newUserUsername, setNewUserUsername] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    setUserList(userList.filter((user) => user.id !== id));

    const updatedPosts = { ...userPosts };
    delete updatedPosts[id];
    setUserPosts(updatedPosts);
  };

  const handleAddUser = async () => {
    if (!newUserName || !newUserUsername || !newUserEmail) return;
    const newUser = await addUser({
      name: newUserName,
      username: newUserUsername,
      email: newUserEmail,
    });
    setUserList([...userList, newUser]);
    setNewUserName("");
    setNewUserUsername("");
    setNewUserEmail("");
  };

  const handleAddPost = async (userId: number) => {
    if (!postTitle || !postBody) return;
    const newPost = await addPost({ title: postTitle, body: postBody, userId });
    setUserPosts({
      ...userPosts,
      [userId]: [...(userPosts[userId] || []), newPost],
    });
    setPostTitle("");
    setPostBody("");
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    const updatedUser = await updateUser(editingUser.id, {
      name: editingUser.name,
      username: editingUser.username,
      email: editingUser.email,
    });

    setUserList((prev) =>
      prev.map((u) => (u.id === editingUser.id ? updatedUser : u))
    );
    setEditingUser(null);
  };

  const handleEditClick = (user: User) => {
    setEditingUser({ ...user });
  };

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUserList();
      setUserList(users);

      const postsByUser: Record<number, Post[]> = {};
      for (const user of users) {
        const posts = await getUserPostList(user.id);
        postsByUser[user.id] = posts;
      }
      setUserPosts(postsByUser);
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={newUserUsername}
          onChange={(e) => setNewUserUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <h1>User List</h1>

      {userList.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
          }}
        >
          {editingUser?.id === user.id ? (
            <>
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <input
                  type="text"
                  value={editingUser.name}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editingUser.username}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, username: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editingUser.email}
                  onChange={(e) =>
                    setEditingUser({ ...editingUser, email: e.target.value })
                  }
                />
                <button onClick={handleUpdateUser}>Save</button>
                <button onClick={() => setEditingUser(null)}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <p>
                  <b>ID:</b> {user.id}
                </p>
                <p>
                  <b>Name:</b> {user.name}
                </p>
                <p>
                  <b>Username:</b> {user.username}
                </p>
                <p>
                  <b>Email:</b> {user.email}
                </p>
                <button onClick={() => handleEditClick(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            </>
          )}

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <input
              type="text"
              placeholder="Post Title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              style={{ width: "200px" }}
            />
            <input
              type="text"
              placeholder="Post Body"
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
              style={{ width: "200px" }}
            />
            <button onClick={() => handleAddPost(user.id)}>Add Post</button>
          </div>

          <div style={{ marginTop: "10px", paddingLeft: "20px" }}>
            <h4>User Posts:</h4>
            {userPosts[user.id]?.length ? (
              userPosts[user.id].map((post) => (
                <div key={post.id} style={{ marginBottom: "5px" }}>
                  <p>{post.title}</p>
                </div>
              ))
            ) : (
              <p style={{ fontStyle: "italic", color: "#777" }}>
                Bu kullanıcının postu yok.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
