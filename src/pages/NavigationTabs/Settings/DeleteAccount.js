import React from "react";
import { Button } from "@mui/material";
import { deleteUser } from "../../../api/api";

//todo
const DeleteAccount = () => {
  const userId = localStorage.getItem("id");

  const testing = async () => {
    await deleteUser(userId);
  };

  return (
    <Button type="button" onClick={testing}>
      Delete
    </Button>
  );
};

export default DeleteAccount;
