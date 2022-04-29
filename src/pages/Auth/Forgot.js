import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import logo from "../../images/logo.png";
import { forgot } from "../../api/api";
import CircularProgress from "@mui/material/CircularProgress";
import AlertMessage from "../../components/Alerts/AlertMessage";
import { errorStyles } from "../../styles/styles";

const Forgot = () => {
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
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: async values => {
      try {
        setIsLoading(true);
        await forgot(values);
        setIsLoading(false);
        navigate("/verify", {
          state: { from: "/forgot", email: values.email },
        });
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
            spacing={3}
          >
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
            {isLoading ? (
              <Grid item>
                <CircularProgress />
              </Grid>
            ) : (
              <Grid item>
                <Button variant="outlined" type="submit" size="small">
                  Send reset code
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

export default Forgot;
