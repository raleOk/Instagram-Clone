import React, { useCallback, useState } from "react";
import { Input, Avatar, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

const FileUpload = props => {
  const { handlePreview } = props;
  const [filePreview, setFilePreview] = useState([]);

  const onDrop = useCallback(
    files => {
      setFilePreview(
        Object.assign(files[0], {
          preview: URL.createObjectURL(files[0]),
        })
      );
      handlePreview(files[0]);
    },
    [handlePreview]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });

  return (
    <>
      {filePreview.length === 0 ? (
        <Avatar
          sx={{
            width: 150,
            height: 150,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#DEDEDE",
            position: "relative",
          }}
          {...getRootProps()}
        >
          <Typography color="black">
            Drag & drop files here, or click to select a file
          </Typography>
          <Input {...getInputProps()} />
        </Avatar>
      ) : (
        <Avatar
          sx={{
            width: 150,
            height: 150,
          }}
          src={filePreview.preview}
          {...getRootProps()}
        >
          <Input {...getInputProps()} />
        </Avatar>
      )}
    </>
  );
};

export default FileUpload;
