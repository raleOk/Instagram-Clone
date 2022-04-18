import React, { useState, useEffect, useContext, useCallback } from "react";
import { Grid, Typography } from "@mui/material";
import { getUserPosts } from "../../api/api";
import Loader from "../Loaders/Loader";
import Posts from "./Posts";
import SuccessAlert from "../Alerts/SuccessAlert";
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

  //handler called by MyPosts to render the list initially
  //also called by Post to re-render the list after a post has been edited or deleted
  const fetchPosts = useCallback(async () => {
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
  }, [userContext.user._id]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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

export default MyPosts;
