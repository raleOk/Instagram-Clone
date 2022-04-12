import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Loader from "../components/Loaders/Loader";
import Post from "../components/Posts/Post";
import { getAllPosts } from "../api/api";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const response = await getAllPosts();
      const data = response.data.posts;
      setPosts(data);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  const postsList = (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{ mt: 3 }}
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
            />
          </Grid>
        );
      })}
    </Grid>
  );

  return <>{isLoading ? <Loader /> : postsList}</>;
};

export default Home;
