import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import UnprotectedRoutes from "./auth/UnprotectedRoutes";
import Register from "./pages/UserForms/Register";
import Login from "./pages/UserForms/Login";
import Verify from "./pages/UserForms/Verify";
import Forgot from "./pages/UserForms/Forgot";
import Reset from "./pages/UserForms/Reset";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar/Navbar";
import CreatePost from "./pages/NavigationTabs/CreatePost";
import LikedPosts from "./pages/NavigationTabs/LikedPosts";
import MyPosts from "./pages/NavigationTabs/MyPosts";
import Profile from "./pages/NavigationTabs/Profile";
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
          <Route path="/create" element={<CreatePost />} />
          <Route path="/liked" element={<LikedPosts />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/profile" element={<Profile />} />
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
