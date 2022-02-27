import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { authContext } from "./useAuth";

const ProtectedRoutes = ({ children }) => {
  const { auth } = useContext(authContext);

  return auth ? (
    <>
      {children} <Outlet />
    </>
  ) : (
    <Navigate to={"/login"} replace />
  );
};

export default ProtectedRoutes;
