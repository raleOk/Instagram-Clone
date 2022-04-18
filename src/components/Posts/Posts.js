import React, { useState, useContext } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "../Modals/DeleteModal";
import EditModal from "../Modals/EditModal";
import { UserContext } from "../../context/userContext";
import { deletePost, editPost } from "../../api/api";
import formatDate from "../../helpers/formatDate";

const Posts = props => {
  const {
    avatar,
    username,
    createdAt,
    media,
    caption,
    postUserId,
    postId,
    fetchPosts,
    handleOpenMessage,
    handleSuccessMessage,
  } = props;

  const userContext = useContext(UserContext);

  //menu state and handlers
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handlePostMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShowDeleteModal = () => {
    handleMenuClose();
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  //edit modal state
  const [showEditModal, setShowEditModal] = useState(false);

  const handleShowEditModal = () => {
    handleMenuClose();
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  //edit/delete post handlers
  const handleEditPost = async data => {
    try {
      await editPost(postId, data);
      handleOpenMessage();
      handleSuccessMessage("Post edited.");
      fetchPosts(1);
      setShowEditModal(false);
      return;
    } catch (err) {
      handleMenuClose();
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await deletePost(postId);
      const msg = response.data.message;
      handleOpenMessage();
      handleSuccessMessage(msg);
      fetchPosts(1);
      return;
    } catch (err) {
      handleMenuClose();
      console.log(err);
    }
  };

  const postMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="primary-search-account-menu"
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleShowEditModal}>
        <IconButton size="small" color="inherit">
          <EditIcon />
        </IconButton>
        Edit post
      </MenuItem>
      <MenuItem onClick={handleShowDeleteModal}>
        <IconButton size="small" color="inherit">
          <DeleteIcon />
        </IconButton>
        Delete post
      </MenuItem>
    </Menu>
  );

  const postMenuButton = (
    <IconButton onClick={handlePostMenu}>
      <MoreVertIcon />
    </IconButton>
  );

  return (
    <Card sx={{ maxWidth: 345, maxHeight: 455 }}>
      <CardHeader
        avatar={<Avatar src={avatar} />}
        action={userContext.user._id === postUserId ? postMenuButton : ""}
        title={username}
        subheader={formatDate(createdAt)}
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
      {postMenu}
      {showEditModal ? (
        <EditModal
          showModal={showEditModal}
          handleCloseModal={handleCloseEditModal}
          handleEdit={handleEditPost}
          postCaption={caption}
        />
      ) : (
        ""
      )}
      {showDeleteModal ? (
        <DeleteModal
          showModal={showDeleteModal}
          handleCloseModal={handleCloseDeleteModal}
          handleDelete={handleDeletePost}
          modalTitle="Delete post?"
          modalQuestion="Are you sure you want to delete your post? This action cannot
         be undone."
        />
      ) : (
        ""
      )}
    </Card>
  );
};

export default Posts;
