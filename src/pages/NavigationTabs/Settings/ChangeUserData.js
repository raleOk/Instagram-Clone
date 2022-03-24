import React, { useState, useContext } from "react";
import {
  Grid,
  Button,
  TextField,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorAlert from "../../../components/Alerts/ErrorAlert";
import SuccessAlert from "../../../components/Alerts/SuccessAlert";
import { errorStyles } from "../../../styles/styles";
import { updateUserData } from "../../../api/api";
import { UserContext } from "../../../context/userContext";

const ChangeUserData = () => {
  const userContext = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  const [openMessage, setOpenMessage] = useState(false);
  const handleMessageClose = () => {
    setOpenMessage(false);
  };

  const [openErr, setOpenErr] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const handleErrMessageClose = () => {
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

  //todo; add drag and drop avatar features with preview
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
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          item
        >
          <Grid item>
            <Avatar
              src={userContext.user.avatar}
              sx={{ width: 140, height: 140 }}
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
          <ErrorAlert
            openErr={openErr}
            errMessage={errMessage}
            handleClose={handleErrMessageClose}
          />
        </Grid>
        <Grid item>
          <SuccessAlert
            openMessage={openMessage}
            handleClose={handleMessageClose}
            successMessage="Changes successfully saved"
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ChangeUserData;
