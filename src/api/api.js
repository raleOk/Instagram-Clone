import axios from "axios";

const baseURL = "https://starfish-y8ps9.herokuapp.com/api/";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    const tokenConfig = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
    return tokenConfig;
  },
  function (err) {
    return Promise.reject(err);
  }
);

//auth routes
const register = async data => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(`${key}`, data[key]);
  }
  return axiosInstance.post("auth/register", formData);
};

const login = async data => {
  return axiosInstance.post("auth/login", data);
};

const verify = async data => {
  return axiosInstance.post("auth/verify", data);
};

const resend = async data => {
  return axiosInstance.post("auth/resend", data);
};

const forgot = async data => {
  return axiosInstance.post("auth/forgot", data);
};

const reset = async data => {
  return axiosInstance.post("auth/reset", data);
};

//users routes
const updateUserData = async (data, userId) => {
  const formData = new FormData();
  if (data.avatar !== "") {
    formData.append("avatar", data.avatar);
  }
  if (data.username !== "") {
    formData.append("username", data.username);
  }
  return axiosInstance.put(`users/${userId}`, formData);
};

const updatePassword = async data => {
  return axiosInstance.patch("users/password", data);
};

const deleteUser = async userId => {
  return axiosInstance.delete(`users/${userId}`);
};

const getUsers = async (searchTerm, page = 1, limit = 10) => {
  return axiosInstance.get(
    `users?search=${searchTerm}&limit=${limit}&page=${page}`
  );
};

//posts routes
const createPost = async data => {
  const formData = new FormData();
  formData.append("media", data.media);
  formData.append("caption", data.caption);

  return axiosInstance.post("posts", formData);
};

const getAllPosts = async () => {
  return axiosInstance.get("posts");
};

const getOnePost = async postId => {
  return axiosInstance.get(`posts/${postId}`);
};

const getUserPosts = async userId => {
  return axiosInstance.get(`posts/user/${userId}`);
};

const editPost = async (postId, data) => {
  return axiosInstance.put(`posts/${postId}`, data);
};

const deletePost = async postId => {
  return axiosInstance.delete(`posts/${postId}`);
};

export {
  register,
  login,
  verify,
  resend,
  forgot,
  reset,
  updateUserData,
  updatePassword,
  deleteUser,
  getUsers,
  createPost,
  getAllPosts,
  getOnePost,
  getUserPosts,
  editPost,
  deletePost,
};
