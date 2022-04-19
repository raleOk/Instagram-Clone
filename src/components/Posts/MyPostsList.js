import React from "react";
import { Avatar, Grid } from "@mui/material";

const MyPostsList = props => {
  const { posts } = props;

  return (
    <>
      {posts.map(post => {
        return (
          <Grid item key={post._id}>
            <Avatar
              variant="square"
              sx={{
                width: 394,
                height: 394,
              }}
              src={post.media}
            />
          </Grid>
        );
      })}
    </>
  );
};

export default MyPostsList;
