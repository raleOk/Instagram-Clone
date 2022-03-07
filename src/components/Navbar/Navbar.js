import React from "react";
import { Outlet } from "react-router-dom";
import Tabs from "./Tabs";

const Navbar = () => {
  return (
    <>
      <Tabs />
      <Outlet />
    </>
  );
};

export default Navbar;
