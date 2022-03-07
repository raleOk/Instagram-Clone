import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import { Search, SearchIconWrapper, StyledInputBase } from "./TabsStyles";
import navLogo from "../../images/navLogo.png";

const Tabs = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logo = <img src={navLogo} alt="navLogo" />;

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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
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
                console.log("test");
              }}
            >
              <Typography textAlign="center">My Posts</Typography>
            </MenuItem>
            <MenuItem
              key="likedPosts"
              onClick={() => {
                console.log("test");
              }}
            >
              <Typography textAlign="center">Liked posts</Typography>
            </MenuItem>
            <MenuItem
              key="createPost"
              onClick={() => {
                console.log("test");
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
