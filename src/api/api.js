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

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axiosInstance.post("auth/register", formData, config);
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

export { register, login, verify, resend, forgot, reset, updateUsername };
