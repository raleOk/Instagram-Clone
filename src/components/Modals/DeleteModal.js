import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Modal, Grid } from "@mui/material";
import { deleteModalStyles } from "../../styles/styles";
import { authContext } from "../../context/authContext";
import { deleteUser } from "../../api/api";

const DeleteModal = props => {
  const { authLogout, handleRemoveUserData } = useContext(authContext);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const { showModal, handleCloseModal } = props;

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      authLogout();
      handleRemoveUserData("");
      navigate("/login");
      return;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal open={showModal} onClose={handleCloseModal}>
      <Box sx={deleteModalStyles}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h6" component="h2">
              Delete account?
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              Are you sure you want to delete your account? This action cannot
              be undone.
            </Typography>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <Grid item>
              <Button
                onClick={handleDelete}
                variant="outlined"
                size="small"
                color="secondary"
              >
                Yes, I'm sure
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={handleCloseModal}
                variant="outlined"
                size="small"
                color="secondary"
              >
                No, go back
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
