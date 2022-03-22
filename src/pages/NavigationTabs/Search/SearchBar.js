import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { getUsers } from "../../../api/api";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchBarStyles";
import ErrorAlert from "../../../components/Alerts/ErrorAlert";

const SearchBar = () => {
  const navigate = useNavigate();

  const [openErr, setOpenErr] = useState(false);

  const handleErrMessageClose = () => {
    setOpenErr(false);
  };

  const onSearch = async event => {
    if (event.keyCode === 13) {
      try {
        const res = await getUsers(event.target.value);
        const { users, pagination } = res.data;

        navigate("/users", {
          state: { users, pagination },
        });
        return;
      } catch (err) {
        setOpenErr(true);
      }
    }
  };

  return (
    <Search onKeyDown={onSearch}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
      <ErrorAlert
        openErr={openErr}
        errMessage={"Something went wrong!"}
        handleClose={handleErrMessageClose}
      />
    </Search>
  );
};

export default SearchBar;
