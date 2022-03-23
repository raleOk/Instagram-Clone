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
  Pagination,
} from "@mui/material";
import Loader from "../../../components/Loaders/Loader";

const UserList = () => {
  //user list state
  const [userList, setUserList] = useState([]);

  //url params state and variables
  const [searchParams, setSearchParams] = useSearchParams({});

  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");

  //loading state
  const [isLoading, setIsLoading] = useState(false);

  //pagination state and handler
  const [paginationValues, setPaginationValues] = useState({});

  const handlePage = (event, value) => {
    setPaginationValues(prevState => {
      return { ...prevState, page: value };
    });
    setSearchParams({ search, limit, page: value });
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        setIsLoading(true);
        const response = await getUsers(search, page, limit);
        const { users, pagination } = response.data;

        setUserList(users);
        setPaginationValues(pagination);
        setIsLoading(false);
        return;
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };
    getUserData();
  }, [searchParams, search, page, limit]);

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
          <Grid item>
            <Pagination
              count={paginationValues.pages}
              page={paginationValues.page}
              onChange={handlePage}
              spacing={2}
              color="secondary"
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default UserList;
