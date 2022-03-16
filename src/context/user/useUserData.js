import { useState } from "react";

const useUserData = () => {
  const [userData, setUserData] = useState({ avatar: "" });

  return {
    userData,
    handleAvatar(data) {
      setUserData(data);
    },
    handleRemoveUserData(data) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("id");
      localStorage.removeItem("avatar");
      setUserData(data);
    },
  };
};

export default useUserData;
