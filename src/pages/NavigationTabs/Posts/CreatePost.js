import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Grid, MobileStepper, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import PostUpload from "../../../components/FileUpload/PostUpload";
import Loader from "../../../components/Loaders/Loader";
import { errorStyles } from "../../../styles/styles";
import { createPost } from "../../../api/api";

const CreatePost = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePreview = file => {
    setPreview(file);
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleMediaValue = file => {
    formik.values.media = file;
  };

  const supportedFormats = ["image/jpg", "image/jpeg", "image/png"];
  const validationSchema = yup.object({
    media: yup
      .mixed("Enter image or videos")
      .test(
        "fileType",
        "Unsupported file type!",
        value => !(value === null) || supportedFormats.includes(value.type)
      )
      .test(
        "fileSize",
        "File is too large",
        value => !(value === null) || value.size > 5_000_000
      )
      .required("Upload post contect please!"),
    caption: yup
      .string("Enter the caption")
      .min(1, "Enter a caption!")
      .max(500, "Reached maximum character limit!")
      .required("Caption is required!"),
  });

  const formik = useFormik({
    initialValues: {
      media: null,
      caption: "",
    },
    validationSchema,
    onSubmit: async values => {
      try {
        handleNext();
        setIsLoading(true);
        const response = await createPost(values);

        console.log(response.data);
        setIsLoading(false);
        navigate("/profile");
      } catch (err) {
        console.log(err);
      }
    },
  });

  const firstStep = (
    <PostUpload
      initialState={preview}
      handlePreview={handlePreview}
      handleMediaValue={handleMediaValue}
      handleNext={handleNext}
    />
  );

  const secondStep = isLoading ? (
    <Loader />
  ) : (
    <Grid
      item
      container
      direction="row"
      justifyContent="center"
      alignItems="start"
      spacing={2}
    >
      <Grid item>
        <PostUpload
          id="media"
          name="media"
          initialState={preview}
          handlePreview={handlePreview}
          handleMediaValue={handleMediaValue}
          error={formik.touched.media && Boolean(formik.errors.media)}
          helperText={formik.touched.media && formik.errors.media}
          FormHelperTextProps={errorStyles}
        />
      </Grid>
      <Grid item>
        <TextField
          id="caption"
          name="caption"
          value={formik.values.caption}
          onChange={formik.handleChange}
          error={formik.touched.caption && Boolean(formik.errors.caption)}
          helperText={formik.touched.caption && formik.errors.caption}
          FormHelperTextProps={errorStyles}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );

  const handleNextButton =
    activeStep === 0 ? (
      <Button size="small" onClick={handleNext} disabled={preview === null}>
        Next
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </Button>
    ) : (
      <form onSubmit={formik.handleSubmit}>
        <Button size="small" type="submit" disabled={preview === null}>
          Create post
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      </form>
    );

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{ mt: 2 }}
    >
      <Grid item>{activeStep === 0 ? firstStep : secondStep}</Grid>

      <Grid item container justifyContent="center">
        <MobileStepper
          variant="progress"
          steps={3}
          position="static"
          activeStep={activeStep}
          sx={{ maxWidth: 400, flexGrow: 1 }}
          nextButton={handleNextButton}
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={preview !== null}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Grid>
    </Grid>
  );
};

export default CreatePost;
