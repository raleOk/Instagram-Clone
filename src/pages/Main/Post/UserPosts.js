import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Grid, Avatar, Typography } from "@mui/material";
import MyPostsList from "../../../components/Posts/MyPostsList";
import Loader from "../../../components/Loaders/Loader";
import { getUserPosts } from "../../../api/api";

const Profile = () => {
  //id of the user to pass to getUserPosts
  const params = useParams();
  const userId = params.userId;

  //data to display (set from fetchUserPosts)
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);

  //load spinner state
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getUserPosts(userId);
      const data = response.data;
      const { avatar, username } = data[0].user;

      setPosts(data);
      setAvatar(avatar);
      setUsername(username);
      setIsLoading(false);
      return;
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            marginTop={5}
          >
            <MyPostsList posts={posts} fetchPosts={fetchUserPosts} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Profile;
