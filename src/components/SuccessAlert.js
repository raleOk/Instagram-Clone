import React from "react";
import { Alert, Snackbar } from "@mui/material";

const SuccessAlert = props => {
  const { openMessage, handleClose } = props;

  return (
    <>
      <Snackbar
        open={openMessage}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity="success" color="info">
          Verification code sent!
        </Alert>
      </Snackbar>
    </>
  );
};

export default SuccessAlert;
