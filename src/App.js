import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import UnprotectedRoutes from "./auth/UnprotectedRoutes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar/Navbar";
import { authContext } from "./auth/useAuth";

const App = () => {
  const { handleAuth } = useContext(authContext);
  useEffect(() => {
    handleAuth();
  }, [handleAuth]);
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<Navbar />} exact>
          <Route path="/" element={<Home />} exact />
        </Route>
      </Route>
      <Route path="/" element={<UnprotectedRoutes />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset" element={<Reset />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
