import React, { useCallback, useState } from "react";
import {
  Input,
  Avatar,
  Typography,
  IconButton,
  Grid,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDropzone } from "react-dropzone";

const PostUpload = props => {
  const { initialState, handleNext, handlePreview, handleMediaValue } = props;

  const [filePreview, setFilePreview] = useState(initialState);

  const onDrop = useCallback(
    files => {
      const avatarPath = Object.assign(files[0], {
        preview: URL.createObjectURL(files[0]),
      });
      setFilePreview(avatarPath.preview);
      handlePreview(avatarPath.preview);
      handleMediaValue(avatarPath);
      handleNext();
    },
    [handlePreview, handleMediaValue, handleNext]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });

  const handleRemovePreview = () => {
    setFilePreview(null);
    handlePreview(null);
    handleMediaValue(null);
  };

  return (
    <Grid item container direction="row" justifyContent="center">
      {filePreview === null ? (
        <Grid item>
          <Avatar
            variant="square"
            sx={{
              width: 250,
              height: 250,
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#DEDEDE",
            }}
            {...getRootProps()}
          >
            <Typography color="black">Drag photos and videos here</Typography>
            <Input {...getInputProps()} />
          </Avatar>
        </Grid>
      ) : (
        <>
          <Grid item>
            <Tooltip
              title="Drag & drop new image or remove the existing one!"
              placement="left"
              arrow
            >
              <Avatar
                variant="square"
                sx={{
                  width: 250,
                  height: 250,
                }}
                src={filePreview}
                {...getRootProps()}
              >
                <Input {...getInputProps()} />
              </Avatar>
            </Tooltip>
          </Grid>
          <Grid item>
            <IconButton
              type="button"
              variant="outlined"
              onClick={handleRemovePreview}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default PostUpload;
