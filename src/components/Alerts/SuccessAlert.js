import React from "react";
import { Alert, Snackbar } from "@mui/material";

const SuccessAlert = props => {
  const { openMessage, handleClose, successMessage } = props;

  return (
    <>
      <Snackbar
        open={openMessage}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity="success" color="info">
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SuccessAlert;
