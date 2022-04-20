import React, { useState } from "react";
import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import ViewOnePost from "./ViewOnePost";

const MyPostsList = props => {
  const { posts } = props;

  const [showPostModal, setShowPostModal] = useState(false);
  const [postData, setPostData] = useState({});

  const handleShowPostModal = post => {
    setShowPostModal(true);
    setPostData(post);
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
        <ViewOnePost
          showPostModal={showPostModal}
          handleClosePostModal={handleClosePostModal}
          avatar={postData.user.avatar}
          username={postData.user.username}
          createdAt={postData.createdAt}
          media={postData.media}
          caption={postData.caption}
          postUserId={postData.user._id}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default MyPostsList;
