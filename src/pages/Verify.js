import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  Link,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";
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

  const [openMessage, setOpenMessage] = useState(false);
  const [openErr, setOpenErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const validationSchema = yup.object({
    token: yup
      .string()
      .test("len", "Verificaiton code must be 4 characters long.", value => {
        return value.length === 4 || undefined;
      })
      .required("Please enter verification code."),
  });

  const formik = useFormik({
    initialValues: {
      token: Number(""),
    },
    validationSchema,
    onSubmit: async values => {
      if (location.state === null) {
        try {
          values.email = userEmail;
          const response = await verify(values);
          const token = await response.data.token;

          authLogin();
          localStorage.setItem("token", JSON.stringify(token));
          navigate("/");
          return;
        } catch (err) {
          if (err.response.data.errors === undefined) {
            setErrMessage(err.response.data.message);
            setOpenErr(true);
          } else {
            setErrMessage(err.response.data.errors.email);
            setOpenErr(true);
          }
          return;
        }
      }

      if (location.state.from === "/forgot") {
        try {
          values.email = location.state.email;
          const response = await verify(values);
          const token = await response.data.token;

          localStorage.setItem("token", JSON.stringify(token));
          navigate("/reset");
        } catch (err) {
          if (err.response.data.errors === undefined) {
            setErrMessage(err.response.data.message);
            setOpenErr(true);
          } else {
            setErrMessage(err.response.data.errors.email);
            setOpenErr(true);
          }
          return;
        }
      }
    },
  });

  const handleResend = async () => {
    if (location.state === null) {
      try {
        await resend({ email: userEmail });
        setOpenMessage(true);
        return;
      } catch (err) {
        setErrMessage(err.response.data.message);
        setOpenErr(true);
        return;
      }
    }

    if (location.state.from === "/forgot") {
      try {
        await resend({ email: location.state.email });
        setOpenMessage(true);
      } catch (err) {
        setErrMessage(err.response.data.message);
        setOpenErr(true);
      }
    }
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
            <Grid item>
              <Snackbar
                open={openMessage}
                autoHideDuration={3000}
                onClose={() => {
                  setOpenMessage(false);
                }}
              >
                <Alert severity="success" color="info">
                  Verification code sent!
                </Alert>
              </Snackbar>
            </Grid>
            <Grid item>
              <Snackbar
                open={openErr}
                autoHideDuration={5000}
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

export default Verify;
