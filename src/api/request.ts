const baseURL = "https://jsonplaceholder.typicode.com/";

export const getUserList = async () => {
  const response = await fetch(`${baseURL}users`);
  return response.json();
};
export const addUser = async (data: {
  name: string;
  username: string;
  email: string;
}) => {
  const response = await fetch(`${baseURL}users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteUser = async (id: number) => {
  const response = await fetch(`${baseURL}users/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const updateUser = async (
  id: number,
  data: {
    name?: string;
    username?: string;
    email?: string;
  }
) => {
  const response = await fetch(`${baseURL}users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getPostList = async () => {
  const response = await fetch(`${baseURL}posts`).then((res) => res.json());
  return response;
};
export const getUserPostList = async (userId: number) => {
  const response = await fetch(`${baseURL}posts?userId=${userId}`).then((res) =>
    res.json()
  );
  return response.filter((post: { userId: number }) => post.userId === userId);
};

export const addPost = async (data: {
  title: string;
  body: string;
  userId: number;
}) => {
  const response = await fetch(`${baseURL}posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
export const deletePost = async (id: number) => {
  const response = await fetch(`${baseURL}posts/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
export const updatePost = async (
  id: number,
  data: {
    title?: string;
    body?: string;
    userId?: number;
  }
) => {
  const response = await fetch(`${baseURL}posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
