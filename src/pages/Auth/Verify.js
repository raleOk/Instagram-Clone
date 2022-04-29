import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Button, TextField, Link, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import logo from "../../images/logo.png";
import { verify, resend } from "../../api/api";
import CircularProgress from "@mui/material/CircularProgress";
import AlertMessage from "../../components/Alerts/AlertMessage";
import { errorStyles } from "../../styles/styles";
import { UserContext } from "../../context/userContext";

const Verify = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

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
      if (location.state.from === "/register") {
        try {
          setIsLoading(true);
          values.email = location.state.email;
          const response = await verify(values);
          const { user, token } = response.data;

          userContext.login({ user, token });
          setIsLoading(false);
          navigate("/");
          return;
        } catch (err) {
          if (err.response.data.errors === undefined) {
            setIsLoading(false);
            setErrMessage(err.response.data.message);
            setOpenErr(true);
            return;
          } else {
            setIsLoading(false);
            setErrMessage(err.response.data.errors.email);
            setOpenErr(true);
          }
          return;
        }
      }

      if (location.state.from === "/forgot") {
        try {
          setIsLoading(true);
          values.email = location.state.email;
          const response = await verify(values);
          const { token } = response.data;

          userContext.login({ user: null, token });
          navigate("/reset");
          setIsLoading(false);
          return;
        } catch (err) {
          if (err.response.data.errors === undefined) {
            setIsLoading(false);
            setErrMessage(err.response.data.message);
            setOpenErr(true);
            return;
          } else {
            setIsLoading(false);
            setErrMessage(err.response.data.errors.email);
            setOpenErr(true);
          }
          return;
        }
      }
    },
  });

  const handleResend = async () => {
    try {
      await resend({ email: location.state.email });
      setOpenMessage(true);
    } catch (err) {
      setErrMessage(err.response.data.message);
      setOpenErr(true);
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
            {isLoading ? (
              <Grid item>
                <CircularProgress />
              </Grid>
            ) : (
              <>
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
              </>
            )}
            <Grid item>
              <AlertMessage
                openAlert={openMessage}
                handleClose={handleCloseMessage}
                handleMessage="Verification code sent!"
                alertAttributes={{ severity: "success", color: "info" }}
              />
            </Grid>
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

export default Verify;
