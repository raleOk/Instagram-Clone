import React from "react";
import { CircularProgress, Box } from "@mui/material/";

const Loader = () => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
