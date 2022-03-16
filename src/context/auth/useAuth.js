import { useState } from "react";

const useAuth = () => {
  const [auth, setAuth] = useState(0);

  return {
    auth,
    handleAuth() {
      const isLogged = localStorage.getItem("isLogged");
      switch (isLogged) {
        case "true":
          setAuth(1);
          break;
        case "false":
          setAuth(-1);
          break;
        default:
          setAuth(-1);
      }
    },
    authLogin() {
      setAuth(1);
      localStorage.setItem("isLogged", "true");
    },
    authLogout() {
      setAuth(-1);
      localStorage.removeItem("isLogged");
    },
  };
};

export default useAuth;
