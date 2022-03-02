import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, TextField, Link, Alert, Snackbar } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import logo from "../images/logo.png";
import { register } from "../api/api";

const Register = () => {
  const navigate = useNavigate();
  const errorStyles = {
    sx: { width: 180 },
  };

  const [openErr, setOpenErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const supportedFormats = ["image/jpg", "image/jpeg", "image/png", undefined];
  const validationSchema = yup.object({
    username: yup
      .string("Enter your username.")
      .min(6, "Username must be 6-20 characters long!")
      .max(20, "Username must be 6-20 characters long!")
      .matches(/^[A-Za-z0-9 ]+$/, "No special characters allowed!")
      .required("Username is required!"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email!")
      .required("Email is required!"),
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
    avatar: yup
      .mixed("Enter picture")
      .test("fileType", "Only jpg/jpeg/png files are supported!", value =>
        supportedFormats.includes(value.type)
      )
      .test(
        "fileSize",
        "File is too large",
        value => !(value === undefined) || value.size > 1_000_000
      ),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      avatar: 0,
    },
    validationSchema,
    onSubmit: async values => {
      try {
        await register(values);
        localStorage.setItem("userEmail", JSON.stringify(values.email));
        navigate("/verify");
      } catch (err) {
        if (err.response.data.errors === undefined) {
          setErrMessage(err.response.data.message);
          setOpenErr(true);
          return;
        } else {
          const errors = err.response.data.errors;
          setErrMessage(errors[Object.keys(errors)[0]]);
          setOpenErr(true);
        }
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
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
                FormHelperTextProps={errorStyles}
              />
            </Grid>
            <Grid item>
              <TextField
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                FormHelperTextProps={errorStyles}
              />
            </Grid>
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
            <Grid item>
              <TextField
                id="avatar"
                name="avatar"
                type="file"
                variant="standard"
                onChange={e => {
                  formik.values.avatar = e.target.files[0];
                }}
                error={formik.touched.avatar && Boolean(formik.errors.avatar)}
                helperText={formik.touched.avatar && formik.errors.avatar}
                FormHelperTextProps={errorStyles}
              />
            </Grid>
            <Grid item>
              <Button variant="outlined" type="submit" size="small">
                Register
              </Button>
            </Grid>
            <Grid item>
              <Link underline="always" variant="body2" href="/login">
                Already have an account? Log in!
              </Link>
            </Grid>
            <Grid item>
              <Snackbar
                open={openErr}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                onClose={() => {
                  setOpenErr(false);
                }}
              >
                <Alert severity="error" color="error">
                  {errMessage}
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Register;
