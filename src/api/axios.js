import axios from "axios";

const baseURL = "https://starfish-y8ps9.herokuapp.com/api/auth/";
const routes = ["register", "login", "verify", "forgot", "reset"];
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
  axiosInstance.post(routes[0], formData, config);
};

export { register };
