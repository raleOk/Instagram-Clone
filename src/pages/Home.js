import React, { useContext } from "react";
import { Typography, Button } from "@mui/material";
import { authContext } from "../auth/useAuth";

const Home = () => {
  const { authLogout } = useContext(authContext);

  return (
    <>
      <Typography>Welcome!</Typography>
      <Button type="button" onClick={authLogout}>
        Logout
      </Button>
    </>
  );
};

export default Home;
