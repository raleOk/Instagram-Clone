import React from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Post = props => {
  const { avatar, username, createdAt, media, caption } = props;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar src={avatar} />}
        action={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        title={username}
        subheader={createdAt}
      />
      <CardMedia component="img" height="194" image={media} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
