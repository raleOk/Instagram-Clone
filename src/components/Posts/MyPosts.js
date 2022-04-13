import React, { useState, useEffect, useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { getUserPosts } from "../../api/api";
import Loader from "../Loaders/Loader";
import Post from "../Posts/Post";
import { UserContext } from "../../context/userContext";

const MyPosts = () => {
  //context api
  const userContext = useContext(UserContext);

  //posts state
  const [posts, setPosts] = useState([]);

  //load spinner state
  const [isLoading, setIsLoading] = useState(false);

  //error page state
  const [errorFallback, setErrorFallback] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await getUserPosts(`${userContext.user._id}`);
        const data = response.data;
        setPosts(data);
        setIsLoading(false);
        return;
      } catch (err) {
        setErrorFallback(
          <Typography variant="h2">Something went wrong!</Typography>
        );
      }
    };
    fetchPosts();
  }, [userContext.user._id]);

  const postsList = (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      {posts.map(post => {
        return (
          <Grid item key={post._id}>
            <Post
              avatar={post.user.avatar}
              username={post.user.username}
              createdAt={post.createdAt}
              media={post.media}
              caption={post.caption}
              postUserId={post.user._id}
              postId={post._id}
            />
          </Grid>
        );
      })}
    </Grid>
  );

  const fallbackPage = errorFallback === null ? <Loader /> : errorFallback;

  return <>{isLoading ? fallbackPage : postsList}</>;
};

export default MyPosts;
