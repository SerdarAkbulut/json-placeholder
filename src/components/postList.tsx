import { useEffect, useState } from "react";
import { deletePost, getPostList, updatePost } from "../api/request";

interface Post {
  userId: number;
  id: number;
  title: string;
}
function PostList() {
  const [postList, setPostList] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const handleDelete = async (id: number) => {
    await deletePost(id);
    setPostList(postList.filter((post) => post.id !== id));
  };

  useEffect(() => {
    const fetchData = async () => {
      const postList = await getPostList();
      setPostList(postList);
    };
    fetchData();
  }, []);
  const handleEditClick = (post: Post) => {
    setEditingPost({ ...post });
  };
  const handleUpdatePost = async () => {
    if (!editingPost) return;
    const updatedPost = await updatePost(editingPost.id, {
      title: editingPost.title,
      userId: editingPost.userId,
    });
    setPostList(
      postList.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    setEditingPost(null);
  };
  return (
    <div>
      <h1>Post List</h1>
      {postList.map((post: Post) => (
        <div
          key={post.id}
          style={{
            display: "flex",
            marginBottom: "20px",
            paddingRight: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            gap: "10px",
            justifyItems: "center",
            alignItems: "center",
            padding: "10px",
          }}
        >
          {editingPost?.id === post.id ? (
            <>
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, title: e.target.value })
                  }
                />

                <button onClick={handleUpdatePost}>Save</button>
                <button onClick={() => setEditingPost(null)}>Cancel</button>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
              <p>
                <span style={{ fontWeight: "bold" }}>User ID: </span>
                {post.userId}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Post ID: </span>
                {post.id}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Title: </span>
                {post.title}
              </p>
              <button
                style={{ marginLeft: "auto" }}
                onClick={() => handleEditClick(post)}
              >
                Edit
              </button>
            </div>
          )}

          <a
            style={{
              color: "red",
              background: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => handleDelete(post.id)}
          >
            X
          </a>
        </div>
      ))}
    </div>
  );
}

export default PostList;
