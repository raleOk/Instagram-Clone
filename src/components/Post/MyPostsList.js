import React, { useState } from "react";
import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import ViewOnePostCard from "./ViewOnePostCard";

const MyPostsList = props => {
  const { posts, fetchPosts, handleOpenMessage, handleSuccessMessage } = props;

  const [showPostModal, setShowPostModal] = useState(false);
  const [postData, setPostData] = useState({});

  const handleShowPostModal = post => {
    setPostData(post);
    setShowPostModal(true);
  };

  const handleClosePostModal = () => {
    setShowPostModal(false);
  };

  return (
    <>
      {posts.map(post => {
        return (
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            key={post._id}
          >
            <Card sx={{ maxWidth: 400 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  width="400"
                  image={post.media}
                  onClick={() => {
                    handleShowPostModal(post);
                  }}
                />
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
      {showPostModal ? (
        <ViewOnePostCard
          postData={postData}
          fetchPosts={fetchPosts}
          handleOpenMessage={handleOpenMessage}
          handleSuccessMessage={handleSuccessMessage}
          showPostModal={showPostModal}
          handleClosePostModal={handleClosePostModal}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default MyPostsList;
