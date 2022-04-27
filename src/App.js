import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Verify from "./pages/Auth/Verify";
import Forgot from "./pages/Auth/Forgot";
import Reset from "./pages/Auth/Reset";
import MainPostList from "./pages/Main/MainPostList/MainPostList";
import Navbar from "./components/Navbar/Navbar";
import CreatePost from "./pages/Main/Posts/CreatePost";
import LikedPosts from "./pages/Main/Posts/LikedPosts";
import Profile from "./pages/Main/Profile/Profile";
import Settings from "./pages/Main/Settings/Settings";
import Loader from "./components/Loaders/Loader";
import UserList from "./pages/Main/Search/UserList";
import UserPosts from "./pages/Main/Posts/UserPosts";
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
          <Route path="/" element={<MainPostList />} exact />
          <Route path="create" element={<CreatePost />} />
          <Route path="liked" element={<LikedPosts />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users/*" element={<UserList />} />
          <Route path="users/:userId" element={<UserPosts />} />
        </Route>
        <Route path="/*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }
};

export default App;
