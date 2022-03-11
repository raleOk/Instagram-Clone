import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
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
import ChangeUsername from "./pages/NavigationTabs/Settings/ChangeUsername";
import ChangeAvatar from "./pages/NavigationTabs/Settings/ChangeAvatar";
import ChangePassword from "./pages/NavigationTabs/Settings/ChangePassword";
import DeleteAccount from "./pages/NavigationTabs/Settings/DeleteAccount";
import NotFound from "./pages/NotFound";
import Loader from "./components/Loader";
import { authContext } from "./auth/useAuth";

const App = () => {
  const { handleAuth, auth } = useContext(authContext);

  useEffect(() => {
    handleAuth();
  }, [handleAuth]);

  if (auth === 0) {
    return <Loader />;
  }
  if (auth === -1) {
    return (
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="verify" element={<Verify />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="reset" element={<Reset />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    );
  }
  if (auth === 1) {
    return (
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Home />} exact />
          <Route path="create" element={<CreatePost />} />
          <Route path="liked" element={<LikedPosts />} />
          <Route path="my-posts" element={<MyPosts />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />}>
            <Route path="change-username" element={<ChangeUsername />} />
            <Route path="change-avatar" element={<ChangeAvatar />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="delete-account" element={<DeleteAccount />} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    );
  }
};

export default App;
