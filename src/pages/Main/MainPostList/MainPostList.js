import React, { useState, useCallback } from "react";
import { Container, Grid, Typography } from "@mui/material";
import Posts from "../../../components/Posts/Posts";
import SuccessAlert from "../../../components/Alerts/SuccessAlert";
import { getAllPosts } from "../../../api/api";
import useFetchOnScroll from "../../../hooks/useFetchOnScroll";
import ViewOnePost from "../../../components/Posts/ViewOnePost";

const MainPostList = () => {
  //rendered state
  const [posts, setPosts] = useState([]);

  //fallback page state
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

  //view one post modal state and handlers
  const [showPostModal, setShowPostModal] = useState(false);
  const [postData, setPostData] = useState({});

  const handleShowPostModal = post => {
    setPostData(post);
    setShowPostModal(true);
  };

  const handleClosePostModal = () => {
    setShowPostModal(false);
  };

  //pagination state and handlers
  const [page, setPage] = useState(1);
  const [noMorePages, setNoMorePages] = useState(false);

  const fetchPosts = useCallback(async page => {
    try {
      const response = await getAllPosts(page);
      const postsArr = response.data.posts;
      const paginationArr = response.data.pagination;
      //check for saving previous state; only if not on first page
      page !== 1
        ? setPosts(prevState => {
            return [...prevState, ...postsArr];
          })
        : setPosts(postsArr);
      //check if next page doesn't exist, so the function stops getting called by useFetchOnScroll hook
      if (paginationArr.next === null) {
        setNoMorePages(true);
        setIsFetching(false);
        return;
      }
      setIsFetching(false);
      return;
    } catch (err) {
      setErrorFallback(
        <Typography variant="h2">Something went wrong!</Typography>
      );
    }
  }, []);

  const [isFetching, setIsFetching] = useFetchOnScroll(
    fetchPosts,
    page,
    setPage,
    noMorePages
  );

  const postsList = (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{ mt: 2 }}
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
              handleShowPostModal={() => {
                handleShowPostModal(post);
              }}
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

  return (
    <>
      {postsList}
      {showPostModal ? (
        <ViewOnePost
          showPostModal={showPostModal}
          handleClosePostModal={handleClosePostModal}
          avatar={postData.user.avatar}
          username={postData.user.username}
          createdAt={postData.createdAt}
          media={postData.media}
          caption={postData.caption}
          postUserId={postData.user._id}
          postId={postData._id}
          fetchPosts={fetchPosts}
          handleOpenMessage={handleOpenMessage}
          handleSuccessMessage={handleSuccessMessage}
        />
      ) : (
        ""
      )}
      {isFetching && (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {noMorePages === true ? (
            <Typography variant="h6">No more posts</Typography>
          ) : (
            <Typography variant="h6">Gettings posts...</Typography>
          )}
        </Container>
      )}
      {errorFallback !== null && errorFallback}
    </>
  );
};

export default MainPostList;
