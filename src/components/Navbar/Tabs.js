import React, { useState } from "react";
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
import SearchIcon from "@mui/icons-material/Search";
import navLogo from "../../images/navLogo.png";
import { Search, SearchIconWrapper, StyledInputBase } from "./TabsStyles";

const Tabs = () => {
  const navigate = useNavigate();

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
          navigate("/profile");
          handleMenuClose();
        }}
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate("/profile");
          handleMenuClose();
        }}
      >
        Settings
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
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
              <Avatar alt="avatar" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default Tabs;
