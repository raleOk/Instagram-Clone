import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Avatar,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import AccountCircle from "@mui/icons-material/AccountCircle";
import navLogo from "../../images/navLogo.png";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import SearchBar from "../../pages/NavigationTabs/Search/SearchBar";
import { UserContext } from "../../context/userContext";

const Tabs = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const logo = <img src={navLogo} alt="navLogo" />;

  //menu state and handlers
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //mobile menu state and handlers
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/profile");
        }}
      >
        <IconButton size="small" color="inherit">
          <AccountCircle />
        </IconButton>
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/settings");
        }}
      >
        <IconButton size="small" color="inherit">
          <Settings />
        </IconButton>
        Settings
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          userContext.logout();
          navigate("/login");
        }}
      >
        <IconButton size="small" color="inherit">
          <Logout />
        </IconButton>
        Logout
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        key="My posts"
        onClick={() => {
          navigate("/my-posts");
        }}
      >
        My Posts
      </MenuItem>
      <MenuItem
        key="likedPosts"
        onClick={() => {
          navigate("/liked");
        }}
      >
        Liked posts
      </MenuItem>
      <MenuItem
        key="createPost"
        onClick={() => {
          navigate("/create");
        }}
      >
        Create post
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="small" color="inherit">
          <AccountCircle />
        </IconButton>
        <Typography>Profile</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography
            noWrap
            component="div"
            onClick={() => {
              navigate("/");
            }}
            sx={{
              display: {
                xs: "none",
                sm: "block",
                ":hover": { cursor: "pointer" },
              },
            }}
          >
            {logo}
          </Typography>
          <SearchBar />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <MenuItem
              key="My posts"
              onClick={() => {
                navigate("/my-posts");
              }}
            >
              <Typography textAlign="center">My Posts</Typography>
            </MenuItem>
            <MenuItem
              key="likedPosts"
              onClick={() => {
                navigate("/liked");
              }}
            >
              <Typography textAlign="center">Liked posts</Typography>
            </MenuItem>
            <MenuItem
              key="createPost"
              onClick={() => {
                navigate("/create");
              }}
            >
              <Typography textAlign="center">Create post</Typography>
            </MenuItem>
            <IconButton size="large" edge="end" onClick={handleProfileMenuOpen}>
              <Avatar src={userContext.user.avatar} alt="avatar" />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Tabs;
