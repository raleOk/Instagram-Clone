import React from "react";
import { Typography, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const Register = () => {
  const validationSchema = yup.object({
    username: yup
      .string("Enter your username.")
      .min(3, "Username must be at least 3 characters long!")
      .max(12, "Username cannot be longer than 12 characters!")
      .required("Username is required!"),
    email: yup
      .string("Enter your email")
      .email("Enter a valid email!")
      .required("Email is required!"),
    password: yup
      .string("Enter your password.")
      .min(6, "Password should be at least 6 characters long!")
      .required("Password is required!"),
    confirmPassword: yup
      .string("Confirm password")
      .oneOf([yup.ref("password"), null], "Passwords must match!")
      .required("Password is required!"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Typography>Register</Typography>
        <TextField
          id="username"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
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
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default Register;
