import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/UserForms/Register";
import Login from "./pages/UserForms/Login";
import Verify from "./pages/UserForms/Verify";
import Forgot from "./pages/UserForms/Forgot";
import Reset from "./pages/UserForms/Reset";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import CreatePost from "./pages/NavigationTabs/CreatePost";
import LikedPosts from "./pages/NavigationTabs/LikedPosts";
import MyPosts from "./pages/NavigationTabs/MyPosts";
import Profile from "./pages/NavigationTabs/Profile";
import Settings from "./pages/NavigationTabs/Settings/Settings";
import Loader from "./components/Loaders/Loader";
import { UserContext } from "./context/userContext";

const App = () => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="verify" element={<Verify />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="reset" element={<Reset />} />
        <Route path="/*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  if (user) {
    return (
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Home />} exact />
          <Route path="create" element={<CreatePost />} />
          <Route path="liked" element={<LikedPosts />} />
          <Route path="my-posts" element={<MyPosts />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }
};

export default App;
