import axios from "axios";

const baseURL = "https://starfish-y8ps9.herokuapp.com/api/auth/";
const token = JSON.parse(localStorage.getItem("token"));

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

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
  return axiosInstance.post("register", formData, config);
};

const login = async data => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axiosInstance.post("login", data, config);
};

const verify = async data => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axiosInstance.post("verify", data, config);
};

const resend = async data => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return axiosInstance.post("resend", data, config);
};

export { register, login, verify, resend };
