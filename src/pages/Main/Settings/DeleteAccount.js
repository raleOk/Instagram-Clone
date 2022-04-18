import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography, Divider } from "@mui/material";
import DeleteModal from "../../../components/Modals/DeleteModal";
import ErrorAlert from "../../../components/Alerts/ErrorAlert";
import { deleteUser } from "../../../api/api";
import { UserContext } from "../../../context/userContext";

const DeleteAccount = () => {
  const navigate = useNavigate();

  //context
  const userContext = useContext(UserContext);

  //modal state
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //error message state and handlers
  const [openErr, setOpenErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const handleErrMessageClose = () => {
    setOpenErr(false);
  };

  //handler passed to modal
  const handleDelete = async () => {
    try {
      await deleteUser(userContext.user._id);
      userContext.logout();
      navigate("/login");
      return;
    } catch (err) {
      setErrMessage("Something went wrong!");
      setOpenErr(true);
      return;
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item>
        <Divider sx={{ width: 600 }} textAlign="center">
          <Typography variant="h6">Delete account</Typography>
        </Divider>
      </Grid>
      <Grid item>
        <Typography variant="h6">
          Warning! This action can't be undone. All your data will be deleted.
        </Typography>
      </Grid>
      <Grid item>
        <Button
          type="button"
          onClick={handleShowModal}
          variant="outlined"
          color="error"
        >
          Delete
        </Button>
      </Grid>
      {showModal ? (
        <DeleteModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleDelete={handleDelete}
          modalTitle="Delete account?"
          modalQuestion="Are you sure you want to delete your account? This action cannot
          be undone."
        />
      ) : (
        ""
      )}
      <Grid item>
        <ErrorAlert
          openErr={openErr}
          errMessage={errMessage}
          handleClose={handleErrMessageClose}
        />
      </Grid>
    </Grid>
  );
};

export default DeleteAccount;
