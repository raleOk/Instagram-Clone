import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
  Dialog,
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

const ViewOnePostCard = props => {
  const {
    postData,
    fetchPosts,
    handleOpenMessage,
    handleSuccessMessage,
    showPostModal,
    handleClosePostModal,
  } = props;

  const userContext = useContext(UserContext);
  const navigate = useNavigate();

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
      await editPost(postData._id, data);
      handleOpenMessage();
      handleSuccessMessage("Post edited.");
      fetchPosts(1);
      handleClosePostModal();
      setShowEditModal(false);
      return;
    } catch (err) {
      handleMenuClose();
      console.log(err);
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await deletePost(postData._id);
      const msg = response.data.message;
      handleOpenMessage();
      handleSuccessMessage(msg);
      fetchPosts(1);
      handleClosePostModal();
      return;
    } catch (err) {
      handleMenuClose();
      console.log(err);
    }
  };

  //handler that checks if the post is the currently logged in user's, sends to /profile if it is
  const handleNavigateProfile = () => {
    userContext.user._id === postData.user._id
      ? navigate("/profile")
      : navigate(`/users/${postData.user._id}`);
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
    <Dialog open={showPostModal} onClose={handleClosePostModal}>
      <Card sx={{ height: 615, width: 600 }}>
        <CardHeader
          avatar={
            <Avatar
              src={postData.user.avatar}
              onClick={handleNavigateProfile}
              sx={{ "&:hover": { cursor: "pointer" } }}
            />
          }
          action={
            userContext.user._id === postData.user._id ? postMenuButton : ""
          }
          title={postData.user.username}
          subheader={formatDate(postData.createdAt)}
        />
        <CardMedia component="img" height="400" image={postData.media} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {postData.caption}
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
            postCaption={postData.caption}
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
    </Dialog>
  );
};

export default ViewOnePostCard;
