import axios from "axios";

const baseURL = "https://starfish-y8ps9.herokuapp.com/api/auth/";
const token = "placeholder";

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
  axiosInstance.post("register", formData, config);
};

const verify = async data => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axiosInstance.post("verify", data, config);
};

export { register, verify };
