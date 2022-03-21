import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Modal, Grid } from "@mui/material";
import { deleteModalStyles } from "../../styles/styles";
import { deleteUser } from "../../api/api";
import { UserContext } from "../../context/userContext";
import ErrorAlert from "../Alerts/ErrorAlert";

const DeleteModal = props => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const { showModal, handleCloseModal } = props;

  const [openErr, setOpenErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const handleErrMessageClose = () => {
    setOpenErr(false);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userContext.user._id);
      userContext.logout();
      navigate("/login");
      return;
    } catch (err) {
      //will add dynamic err msgs
      setErrMessage("Something went wrong!");
      setOpenErr(true);
      return;
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
          <Grid item>
            <ErrorAlert
              openErr={openErr}
              errMessage={errMessage}
              handleClose={handleErrMessageClose}
            />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
