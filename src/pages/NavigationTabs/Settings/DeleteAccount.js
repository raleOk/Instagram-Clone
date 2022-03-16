import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import DeleteModal from "../../../components/Modals/DeleteModal";

const DeleteAccount = () => {
  //modal state
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
        <Typography variant="h5">Delete account</Typography>
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
        />
      ) : (
        ""
      )}
    </Grid>
  );
};

export default DeleteAccount;
