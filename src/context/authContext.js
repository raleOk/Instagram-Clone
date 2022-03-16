import React, { createContext } from "react";
import useAuth from "./auth/useAuth";
import useUserData from "./user/useUserData";

const authContext = createContext();

const AuthProvider = props => {
  const { auth, handleAuth, authLogin, authLogout } = useAuth();
  const { userData, handleAvatar, handleRemoveUserData } = useUserData();

  return (
    <authContext.Provider
      value={{
        auth,
        handleAuth,
        authLogin,
        authLogout,
        userData,
        handleAvatar,
        handleRemoveUserData,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export { authContext, AuthProvider };
