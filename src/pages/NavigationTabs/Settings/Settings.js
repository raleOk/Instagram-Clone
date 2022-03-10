import React, { useState } from "react";
import { Grid, List, ListItem, Typography } from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const settingsListItems = [
    { name: "Change username", route: "change-username" },
    { name: "Change avatar", route: "change-avatar" },
    { name: "Change password", route: "change-password" },
    { name: "Delete account", route: "delete-account" },
  ];

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      spacing={3}
      sx={{ mt: 2 }}
    >
      <Grid item>
        <List>
          {settingsListItems.map((el, index) => {
            return (
              <ListItem
                button
                selected={selectedIndex === index}
                onClick={event => {
                  handleListItemClick(event, index);
                  navigate(`${el.route}`);
                }}
                key={index}
              >
                <Typography>{el.name}</Typography>
              </ListItem>
            );
          })}
        </List>
      </Grid>
      <Grid item>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Settings;
