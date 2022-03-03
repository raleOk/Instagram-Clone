import React from "react";
import { Alert, Snackbar } from "@mui/material";

const ErrorAlert = props => {
  const { openErr, errMessage, handleClose } = props;

  return (
    <>
      <Snackbar
        open={openErr}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert severity="error" color="error">
          {errMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ErrorAlert;
