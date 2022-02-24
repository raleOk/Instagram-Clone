import React from "react";
import { Link } from "react-router-dom";
import { Grid, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import InstagramIcon from "@mui/icons-material/Instagram";
import { verify } from "../api/axios";

const Verify = () => {
  const validationSchema = yup.object({
    token: yup
      .string()
      .test("len", "Verificaiton code must be 4 characters long.", value => {
        return value.length === 4;
      })
      .required("Please enter verification code."),
  });

  const formik = useFormik({
    initialValues: {
      token: 0,
    },
    validationSchema,
    onSubmit: values => {
      values.email = JSON.parse(localStorage.getItem("userEmail"));
      verify(values);
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
            id="token"
            name="token"
            label="Verification code"
            type="number"
            variant="outlined"
            onChange={formik.handleChange}
            error={formik.touched.token && Boolean(formik.errors.token)}
            helperText={formik.touched.token && formik.errors.token}
          />
        </Grid>
        <Grid item>
          <Link to={"/verify"}>Didn't get the email? Send again.</Link>
        </Grid>
        <Grid item>
          <Button type="submit" variant="outlined" size="small">
            Verify
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Verify;
