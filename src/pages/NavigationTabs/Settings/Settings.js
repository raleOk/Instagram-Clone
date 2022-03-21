import React from "react";
import ChangeUserData from "./ChangeUserData";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

const Settings = () => {
  return (
    <>
      <ChangeUserData />
      <ChangePassword />
      <DeleteAccount />
    </>
  );
};

export default Settings;
