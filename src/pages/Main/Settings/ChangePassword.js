import React, { useState } from "react";
import { Grid, Button, TextField, Typography, Divider } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import AlertMessage from "../../../components/Alerts/AlertMessage";
import { errorStyles } from "../../../styles/styles";
import { updatePassword } from "../../../api/api";

const ChangeUsername = () => {
  //load state
  const [isLoading, setIsLoading] = useState(false);

  //success message state and handlers
  const [openMessage, setOpenMessage] = useState(false);

  const handleCloseMessage = () => {
    setOpenMessage(false);
  };

  //error message state and handlers
  const [openErr, setOpenErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleCloseErrorMessage = () => {
    setOpenErr(false);
  };

  const validationSchema = yup.object({
    oldPassword: yup
      .string("Enter your password.")
      .min(8, "Password should be at least 8 characters long!")
      .matches(
        /[a-z]/,
        "Password should have at least one lowercase character!"
      )
      .matches(
        /[A-Z]/,
        "Password should have at least one uppercase character!"
      )
      .matches(/[0-9]/, "Password should have at least number!")
      .required("Password is required!"),
    password: yup
      .string("Enter your password.")
      .min(8, "Password should be at least 8 characters long!")
      .matches(
        /[a-z]/,
        "Password should have at least one lowercase character!"
      )
      .matches(
        /[A-Z]/,
        "Password should have at least one uppercase character!"
      )
      .matches(/[0-9]/, "Password should have at least number!")
      .required("Password is required!"),
    passwordConfirm: yup
      .string("Confirm password")
      .oneOf([yup.ref("password"), null], "Passwords must match!")
      .required("Password is required!"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async values => {
      try {
        setIsLoading(true);
        await updatePassword(values);

        setIsLoading(false);
        setOpenMessage(true);
        return;
      } catch (err) {
        const errMsg = err.response.data.message;
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
          <Divider sx={{ width: 600 }} textAlign="center">
            <Typography variant="h6">Change password</Typography>
          </Divider>
        </Grid>
        <Grid item>
          <TextField
            id="oldPassword"
            name="oldPassword"
            label="Old password"
            type="password"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
            }
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
            FormHelperTextProps={errorStyles}
          />
        </Grid>
        <Grid item>
          <TextField
            id="password"
            name="password"
            label="New password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            FormHelperTextProps={errorStyles}
          />
        </Grid>
        <Grid item>
          <TextField
            id="passwordConfirm"
            name="passwordConfirm"
            label="Confirm new password"
            type="password"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            error={
              formik.touched.passwordConfirm &&
              Boolean(formik.errors.passwordConfirm)
            }
            helperText={
              formik.touched.passwordConfirm && formik.errors.passwordConfirm
            }
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
              Change password
            </Button>
          </Grid>
        )}
        <Grid item>
          <AlertMessage
            openAlert={openErr}
            handleClose={handleCloseErrorMessage}
            handleMessage={errMessage}
            alertAttributes={{ severity: "error", color: "error" }}
          />
        </Grid>
        <Grid item>
          <AlertMessage
            openAlert={openMessage}
            handleClose={handleCloseMessage}
            handleMessage="Password successfully changed!"
            alertAttributes={{ severity: "success", color: "info" }}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ChangeUsername;
