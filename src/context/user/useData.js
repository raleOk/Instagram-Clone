import { useState, useCallback } from "react";

const useData = () => {
  const [userData, setUserData] = useState({
    avatar: "",
  });

  const handleUserData = useCallback(() => {
    const avatar = localStorage.getItem("avatar");
    const data = { avatar };

    setUserData(data);
  }, []);

  return {
    userData,
    handleUserData,
    handleRemoveUserData(data) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("id");
      localStorage.removeItem("avatar");
      setUserData(data);
    },
  };
};

export default useData;
