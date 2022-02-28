import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Button, TextField, Link, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import logo from "../images/logo.png";
import { verify, resend } from "../api/api";
import { authContext } from "../auth/useAuth";

const Verify = () => {
  const { authLogin } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = JSON.parse(localStorage.getItem("userEmail"));
  const errorStyles = {
    sx: { width: 180 },
  };

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
    onSubmit: async values => {
      if (location.state === null) {
        try {
          values.email = userEmail;
          const response = await verify(values);
          const data = await response.data;
          const token = data.token;

          authLogin();
          localStorage.setItem("token", JSON.stringify(token));
          navigate("/");
          return;
        } catch (err) {
          console.log(err);
          return;
        }
      }

      if (location.state.from === "/forgot") {
        try {
          values.email = location.state.email;
          await verify(values);
          navigate("/reset");
        } catch (err) {
          console.log(err);
        }
      }
    },
  });

  const handleResend = () => {
    resend({ email: userEmail });
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
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
              <img src={logo} alt="logo" />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                Email with verification code has been sent to you. Please enter
                the code below.
              </Typography>
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
                FormHelperTextProps={errorStyles}
              />
            </Grid>
            <Grid item>
              <Link
                component="button"
                underline="always"
                variant="body2"
                type="button"
                onClick={handleResend}
              >
                Didn't get the email? Send again.
              </Link>
            </Grid>
            <Grid item>
              <Button type="submit" variant="outlined" size="small">
                Verify
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Verify;
