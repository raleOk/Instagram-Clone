import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import logo from "../../images/logo.png";
import { reset } from "../../api/api";
import CircularProgress from "@mui/material/CircularProgress";
import AlertMessage from "../../components/Alerts/AlertMessage";
import { errorStyles } from "../../styles/styles";

const Reset = () => {
  const navigate = useNavigate();

  //load state
  const [isLoading, setIsLoading] = useState(false);

  //error message state and handlers
  const [openErr, setOpenErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleCloseErrorMessage = () => {
    setOpenErr(false);
  };

  const validationSchema = yup.object({
    password: yup
      .string("Enter your password")
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
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async values => {
      try {
        setIsLoading(true);
        await reset(values);

        setIsLoading(false);
        navigate("/login");
        return;
      } catch (err) {
        setIsLoading(false);
        setErrMessage(err.response.data.message);
        setOpenErr(true);
      }
    },
  });

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      <Grid item>
        <img src={logo} alt="logo" />
      </Grid>
      <Grid item>
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
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                FormHelperTextProps={errorStyles}
              />
            </Grid>
            <Grid item>
              <TextField
                id="passwordConfirm"
                name="passwordConfirm"
                label="Confirm password"
                type="password"
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
                error={
                  formik.touched.passwordConfirm &&
                  Boolean(formik.errors.passwordConfirm)
                }
                helperText={
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm
                }
                FormHelperTextProps={errorStyles}
              />
            </Grid>
            {isLoading ? (
              <Grid item>
                <CircularProgress />
              </Grid>
            ) : (
              <Grid item>
                <Button variant="outlined" type="submit" size="small">
                  Reset password
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
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Reset;
