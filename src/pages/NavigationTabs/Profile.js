import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [bio, setBio] = useState("");

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
          <Avatar src={avatar} sx={{ width: 140, height: 140 }} />
        </Grid>
        <Grid item>
          <Typography variant="h5">{username}</Typography>
        </Grid>
        <Grid item>
          <TextField
            multiline
            minRows={4}
            placeholder="Tell us something about yourself."
            label=""
            value={bio}
            onChange={handleBio}
            inputProps={{ maxLength: 122 }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
