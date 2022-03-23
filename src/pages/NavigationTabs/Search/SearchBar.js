import React from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./SearchBarStyles";

const SearchBar = () => {
  const navigate = useNavigate();

  const onSearch = async event => {
    if (event.keyCode === 13) {
      navigate(`/users?search=${event.target.value}&limit=10&page=1`);
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
    </Search>
  );
};

export default SearchBar;
