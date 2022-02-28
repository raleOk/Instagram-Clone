import axios from "axios";

const baseURL = "https://starfish-y8ps9.herokuapp.com/api/auth/";
const token = JSON.parse(localStorage.getItem("token"));

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
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
  return axiosInstance.post("login", data);
};

const verify = async data => {
  return axiosInstance.post("verify", data);
};

const resend = async data => {
  return axiosInstance.post("resend", data);
};

const forgot = async data => {
  return axiosInstance.post("forgot", data);
};

export { register, login, verify, resend, forgot };
