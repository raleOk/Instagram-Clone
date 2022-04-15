import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import Loader from "../../../components/Loaders/Loader";
import Posts from "../../../components/Posts/Posts";
import SuccessAlert from "../../../components/Alerts/SuccessAlert";
import { getAllPosts } from "../../../api/api";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorFallback, setErrorFallback] = useState(null);

  //success message alert state and handlers
  const [openMessage, setOpenMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleOpenMessage = () => {
    setOpenMessage(true);
  };

  const handleCloseMessage = () => {
    setOpenMessage(false);
  };

  const handleSuccessMessage = msg => {
    setSuccessMessage(msg);
  };

  //handler called by Home to render the list initially
  //also called by Post to re-render the list after a post has been edited or deleted
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await getAllPosts();
      const data = response.data.posts;
      setPosts(data);
      setIsLoading(false);
      return;
    } catch (err) {
      setErrorFallback(
        <Typography variant="h2">Something went wrong!</Typography>
      );
    }
  };

  useEffect(() => {
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
            <Posts
              avatar={post.user.avatar}
              username={post.user.username}
              createdAt={post.createdAt}
              media={post.media}
              caption={post.caption}
              postUserId={post.user._id}
              postId={post._id}
              fetchPosts={fetchPosts}
              handleOpenMessage={handleOpenMessage}
              handleSuccessMessage={handleSuccessMessage}
            />
          </Grid>
        );
      })}
      <Grid item>
        <SuccessAlert
          openMessage={openMessage}
          handleClose={handleCloseMessage}
          successMessage={successMessage}
        />
      </Grid>
    </Grid>
  );

  const fallbackPage = errorFallback === null ? <Loader /> : errorFallback;

  return <>{isLoading ? fallbackPage : postsList}</>;
};

export default PostList;
