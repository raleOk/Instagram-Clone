import React from "react";
import { Grid, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { errorStyles } from "../../../styles/styles";
import { updateAvatar } from "../../../api/api";

const ChangeAvatar = () => {
  const userId = localStorage.getItem("id");

  const supportedFormats = ["image/jpg", "image/jpeg", "image/png"];

  const validationSchema = yup.object({
    avatar: yup
      .mixed("Enter picture")
      .test("fileType", "Only jpg/jpeg/png files are supported!", value =>
        supportedFormats.includes(value.type)
      )
      .test(
        "fileSize",
        "File is too large!",
        value => !(value.size > 1_000_000)
      )
      .required("Choose an image"),
  });

  const formik = useFormik({
    initialValues: {
      avatar: 0,
    },
    validationSchema,
    onSubmit: async values => {
      try {
        const res = await updateAvatar(values, userId);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    },
  });

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
          <Button
            type="submit"
            variant="outlined"
            color="secondary"
            size="small"
          >
            Change avatar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ChangeAvatar;
