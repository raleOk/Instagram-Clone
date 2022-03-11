import React, { useContext } from "react";
import { Typography, Button } from "@mui/material";
import { authContext } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { authLogout } = useContext(authContext);
  const navigate = useNavigate();

  return (
    <>
      <Typography>Welcome!</Typography>
      <Button
        type="button"
        onClick={() => {
          authLogout();
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </>
  );
};

export default Home;
