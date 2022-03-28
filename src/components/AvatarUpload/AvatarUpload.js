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

const AvatarUpload = props => {
  const { handlePreview, initialState } = props;

  const [filePreview, setFilePreview] = useState(initialState);

  const onDrop = useCallback(
    files => {
      const avatarPath = Object.assign(files[0], {
        preview: URL.createObjectURL(files[0]),
      });
      setFilePreview(avatarPath.preview);
      handlePreview(avatarPath);
    },
    [handlePreview]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });

  const handleRemovePreview = () => {
    setFilePreview(null);
    handlePreview(null);
  };

  return (
    <Grid item container direction="row" justifyContent="center">
      {filePreview === null ? (
        <Grid item>
          <Avatar
            sx={{
              width: 150,
              height: 150,
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#DEDEDE",
            }}
            {...getRootProps()}
          >
            <Typography color="black">
              Drag & drop files here, or click to select a file
            </Typography>
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
                sx={{
                  width: 150,
                  height: 150,
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

export default AvatarUpload;
