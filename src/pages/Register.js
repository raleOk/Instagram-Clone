import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import InstagramIcon from "@mui/icons-material/Instagram";

const Register = () => {
  const supportedFormats = ["image/jpg", "image/jpeg", "image/png", undefined];
  const validationSchema = yup.object({
    username: yup
      .string("Enter your username.")
      .min(3, "Username must be 3-20 characters long!")
      .max(20, "Username must be 3-20 characters long!")
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
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <InstagramIcon />
        </Grid>
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
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
              formik.touched.passwordConfirm && formik.errors.passwordConfirm
            }
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
          />
        </Grid>
        <Grid item>
          <Button variant="outlined" type="submit" size="small">
            Register
          </Button>
        </Grid>
        <Grid item>
          <Link to={"/login"}>Already have an account? Log in!</Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default Register;
