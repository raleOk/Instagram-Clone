import React, { createContext } from "react";
import useAuth from "./auth/useAuth";
import useData from "./user/useData";

const authContext = createContext();

const AuthProvider = props => {
  const { auth, handleAuth, authLogin, authLogout } = useAuth();
  const { userData, handleUserData, handleRemoveUserData } = useData();

  return (
    <authContext.Provider
      value={{
        auth,
        handleAuth,
        authLogin,
        authLogout,
        userData,
        handleUserData,
        handleRemoveUserData,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export { authContext, AuthProvider };
