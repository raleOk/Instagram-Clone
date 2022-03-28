import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Avatar, Typography, Button, Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { UserContext } from "../../../context/userContext";
import MyPosts from "../Posts/MyPosts";

const Profile = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<SettingsIcon />}
          onClick={() => {
            navigate("/settings");
          }}
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          Settings
        </Button>
      </Box>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{ mt: 1 }}
      >
        <Grid item>
          <Avatar
            src={userContext.user.avatar}
            sx={{ width: 140, height: 140 }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h5">{userContext.user.username}</Typography>
        </Grid>
        <Grid item marginTop={5}>
          <MyPosts />
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
