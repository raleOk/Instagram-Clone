import React from "react";
import { Typography, Grid } from "@mui/material";
import ChangeUserData from "./ChangeUserData";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

const Settings = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{ mt: 1 }}
    >
      <Grid item>
        <Typography variant="h4">Settings</Typography>
      </Grid>
      <Grid item>
        <ChangeUserData />
      </Grid>
      <Grid item>
        <ChangePassword />
      </Grid>
      <Grid item>
        <DeleteAccount />
      </Grid>
    </Grid>
  );
};

export default Settings;
