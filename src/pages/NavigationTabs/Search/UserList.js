import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getUsers } from "../../../api/api";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  Avatar,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import Loader from "../../../components/Loaders/Loader";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [searchParams] = useSearchParams({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchTerm = searchParams.get("search");
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const getUserData = async () => {
      try {
        setIsLoading(true);
        const response = await getUsers(searchTerm, page, limit);
        const { users } = response.data;

        setUserList(users);
        setIsLoading(false);
        return;
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    getUserData();
  }, [searchParams]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ mt: 1 }}
    >
      {isLoading ? (
        <Grid item>
          <Loader />
        </Grid>
      ) : (
        <>
          <Grid item>
            <Typography variant="h6">
              {userList.length === 0
                ? "No user found!"
                : `Search results for ${searchParams.get("search")}`}
            </Typography>
          </Grid>
          <Grid item>
            <List sx={{ width: "100%", maxWidth: 360 }}>
              {userList.map(user => {
                return (
                  <Container key={user._id}>
                    <ListItemButton>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar src={user.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.username}
                          secondary="Lorem ipsum dolor sit amet"
                        />
                      </ListItem>
                    </ListItemButton>
                    <Divider component="li" />
                  </Container>
                );
              })}
            </List>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default UserList;
