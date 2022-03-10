import React, { useState } from "react";
import { Grid, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorAlert from "../../../components/Alerts/ErrorAlert";
import SuccessAlert from "../../../components/Alerts/SuccessAlert";
import { errorStyles } from "../../../styles/styles";
import { updateUsername } from "../../../api/api";

const ChangeUsername = () => {
  const userId = localStorage.getItem("id");

  const [isLoading, setIsLoading] = useState(false);

  const [openMessage, setOpenMessage] = useState(false);
  const handleMessageClose = () => {
    setOpenMessage(false);
  };

  const [openErr, setOpenErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const handleErrMessageClose = () => {
    setOpenErr(false);
  };

  const validationSchema = yup.object({
    username: yup
      .string("Enter your username.")
      .min(6, "Username must be 6-20 characters long!")
      .max(20, "Username must be 6-20 characters long!")
      .matches(/^[A-Za-z0-9 ]+$/, "No special characters allowed!")
      .required("Username is required!"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema,
    onSubmit: async values => {
      try {
        setIsLoading(true);
        const res = await updateUsername(values, userId);
        const newUsername = res.data.data.username;

        localStorage.setItem("username", newUsername);
        setIsLoading(false);
        setOpenMessage(true);
        return;
      } catch (err) {
        const errMsg = err.response.data.errors.username;
        setIsLoading(false);
        setErrMessage(errMsg);
        setOpenErr(true);
        return;
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <TextField
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            FormHelperTextProps={errorStyles}
          />
        </Grid>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid item>
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              size="small"
            >
              Change username
            </Button>
          </Grid>
        )}
        <Grid item>
          <ErrorAlert
            openErr={openErr}
            errMessage={errMessage}
            handleClose={handleErrMessageClose}
          />
        </Grid>
        <Grid item>
          <SuccessAlert
            openMessage={openMessage}
            handleClose={handleMessageClose}
            successMessage="Username successfully changed"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ChangeUsername;
