import React, { useState, createContext } from "react";
const authContext = createContext();

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
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("id");
      localStorage.removeItem("avatar");
      localStorage.removeItem("username");
    },
  };
};

const AuthProvider = props => {
  const { auth, handleAuth, authLogin, authLogout } = useAuth();

  return (
    <authContext.Provider value={{ auth, handleAuth, authLogin, authLogout }}>
      {props.children}
    </authContext.Provider>
  );
};

export { authContext, AuthProvider };
