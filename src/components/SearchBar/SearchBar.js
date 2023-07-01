import React, { useState } from "react";
import "./SearchBar.scss";
import { useDispatch } from "react-redux";
import { searchFilterChange } from "../../redux/ProductSlice";
import { searchFilterChangeCategory } from "../../redux/CategorySlice";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const currentURL = window.location.href;

  const handleSearchTextChanged = (e) => {
    setSearchText(e.target.value);
    dispatch(searchFilterChange(e.target.value));
    dispatch(searchFilterChangeCategory(e.target.value))
  };

  const handleButtonSearchClicked = () => {
    if (!currentURL.includes("/category")) navigate("/products");
  };
  return (
    <div className="search-section">
      <input
        className="search-field"
        type="text"
        placeholder="Search here ..."
        value={searchText}
        onChange={handleSearchTextChanged}
      />
      <div className="button-search" onClick={handleButtonSearchClicked}>
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
};

export default SearchBar;
