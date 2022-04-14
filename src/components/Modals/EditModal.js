import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, Button, Modal, Grid, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Loader from "../Loaders/Loader";
import { modalStyles } from "../../styles/styles";
import { errorStyles } from "../../styles/styles";

const DeleteModal = props => {
  const { showModal, handleCloseModal, handleEdit, postCaption } = props;

  //loading state
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = yup.object({
    caption: yup
      .string("Enter the caption")
      .min(1, "Enter a caption!")
      .max(200, "Reached maximum character limit!")
      .required("Caption is required!"),
  });

  const formik = useFormik({
    initialValues: {
      caption: postCaption,
    },
    validationSchema,
    onSubmit: values => {
      setIsLoading(true);
      handleEdit(values);
      setIsLoading(false);
    },
  });

  return (
    <Modal open={showModal} onClose={handleCloseModal}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={modalStyles}>
          {isLoading ? (
            <Loader />
          ) : (
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <Typography variant="h6">
                  <EditIcon /> Edit caption below
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  id="caption"
                  name="caption"
                  value={formik.values.caption}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.caption && Boolean(formik.errors.caption)
                  }
                  helperText={formik.touched.caption && formik.errors.caption}
                  FormHelperTextProps={errorStyles}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                  multiline
                  rows={5}
                />
              </Grid>
              <Grid
                item
                container
                irection="row"
                justifyContent="center"
                alignItems="center"
                spacing={14}
              >
                <Grid item>
                  <Button type="submit" size="small">
                    Save changes
                  </Button>
                </Grid>
                <Grid item>
                  <Button type="button" size="small" onClick={handleCloseModal}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Box>
      </form>
    </Modal>
  );
};

export default DeleteModal;
