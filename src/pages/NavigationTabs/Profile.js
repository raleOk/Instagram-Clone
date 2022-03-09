import React, { useState } from "react";
import {
  Grid,
  Avatar,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const Profile = () => {
  const username = localStorage.getItem("username");
  const avatar = localStorage.getItem("avatar");
  const [bio, setBio] = useState("Tell us something about yourself.");

  const handleBio = event => {
    setBio(event.target.value);
  };
  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<SettingsIcon />}
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
          <Avatar src={avatar} sx={{ width: 140, height: 140 }} />
        </Grid>
        <Grid item>
          <Typography variant="h5">{username}</Typography>
        </Grid>
        <Grid item>
          <TextField
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
            multiline
            rows={4}
            value={bio}
            onChange={handleBio}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
