import React from "react";
import { Alert, Snackbar } from "@mui/material";

const AlertMessage = props => {
  const { openAlert, handleMessage, handleClose, alertAttributes } = props;

  return (
    <>
      <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          severity={alertAttributes.severity}
          color={alertAttributes.color}
        >
          {handleMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AlertMessage;
