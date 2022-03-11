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

const updateUsername = async (data, userId) => {
  return axiosInstance.put(`users/${userId}`, data);
};

const updateAvatar = async (data, userId) => {
  const formData = new FormData();
  formData.append("avatar", data.avatar);
  return axiosInstance.put(`users/${userId}`, formData);
};

const updatePassword = async data => {
  return axiosInstance.patch("users/password", data);
};

const deleteUser = async userId => {
  return axiosInstance.delete(`users/${userId}`);
};

export {
  register,
  login,
  verify,
  resend,
  forgot,
  reset,
  updateUsername,
  updateAvatar,
  updatePassword,
  deleteUser,
};
