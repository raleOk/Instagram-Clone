import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { getUserPosts } from "../../api/api";
import Loader from "../Loaders/Loader";
import Post from "../Posts/Post";

const MyPosts = () => {
  //posts state
  const [posts, setPosts] = useState([]);

  //load spinner state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const res = await getUserPosts("6233798e9c5cd18f6c063da5");
      const data = res.data;
      setPosts(data);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

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
            />
          </Grid>
        );
      })}
    </Grid>
  );

  return <>{isLoading ? <Loader /> : postsList}</>;
};

export default MyPosts;
