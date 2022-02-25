import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Home from "./pages/Home";
import { authContext } from "./auth/useAuth";

const App = () => {
  const { authHandler } = useContext(authContext);
  useEffect(() => {
    authHandler();
  }, [authHandler]);
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} exact />
      </Route>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<Verify />} />
    </Routes>
  );
};

export default App;
