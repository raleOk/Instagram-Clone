import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@mui/material";
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

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      const response = await getUserPosts(`${userContext.user._id}`);
      const data = response.data;
      setPosts(data);
      setIsLoading(false);
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
            />
          </Grid>
        );
      })}
    </Grid>
  );

  return <>{isLoading ? <Loader /> : postsList}</>;
};

export default MyPosts;
