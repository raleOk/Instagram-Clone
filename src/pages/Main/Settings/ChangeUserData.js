import React, { useState, useContext } from "react";
import { Grid, Button, TextField, Typography, Divider } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import AlertMessage from "../../../components/Alerts/AlertMessage";
import { errorStyles } from "../../../styles/styles";
import { updateUserData } from "../../../api/api";
import { UserContext } from "../../../context/userContext";
import AvatarUpload from "../../../components/FileUpload/AvatarUpload";

const ChangeUserData = () => {
  //context
  const userContext = useContext(UserContext);

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

  const supportedFormats = ["image/jpg", "image/jpeg", "image/png"];

  const validationSchema = yup.object({
    username: yup
      .string("Enter your username.")
      .min(6, "Username must be 6-20 characters long!")
      .max(20, "Username must be 6-20 characters long!")
      .matches(/^[A-Za-z0-9 ]+$/, "No special characters allowed!"),
    avatar: yup
      .mixed("Enter picture")
      .test(
        "fileType",
        "Only jpg/jpeg/png files are supported!",
        value => !(value === "") || supportedFormats.includes(value.type)
      )
      .test(
        "fileSize",
        "File is too large",
        value => !(value === "") || value.size > 1_000_000
      ),
  });

  const formik = useFormik({
    initialValues: {
      username: `${userContext.user.username}`,
      avatar: "",
    },
    validationSchema,
    onSubmit: async values => {
      try {
        setIsLoading(true);
        const response = await updateUserData(values, userContext.user._id);
        const data = response.data;

        userContext.update(data);
        setIsLoading(false);
        setOpenMessage(true);
        return;
      } catch (err) {
        setIsLoading(false);
        //will add dynamic err msgs
        setErrMessage("Something went wrong!");
        setOpenErr(true);
        return;
      }
    },
  });

  const handlePreview = file => {
    formik.values.avatar = file;
  };

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
            <Typography variant="h6">Change avatar & username</Typography>
          </Divider>
        </Grid>
        <Grid item>
          <AvatarUpload
            id="avatar"
            name="avatar"
            handlePreview={handlePreview}
            initialState={userContext.user.avatar}
            error={formik.touched.avatar && Boolean(formik.errors.avatar)}
            helperText={formik.touched.avatar && formik.errors.avatar}
            FormHelperTextProps={errorStyles}
          />
        </Grid>
        <Grid item>
          <TextField
            id="username"
            name="username"
            label="New username"
            variant="outlined"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
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
              Save Changes
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
            handleMessage="Changes successfully saved!"
            alertAttributes={{ severity: "success", color: "info" }}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ChangeUserData;
