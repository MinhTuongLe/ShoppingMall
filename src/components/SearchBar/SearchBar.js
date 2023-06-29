import React from "react";
import "./SearchBar.scss";
const SearchBar = () => {
  return (
    <div className="search-section">
      <input
        style={{ border: "none" }}
        className="search-field"
        type="text"
        placeholder="Search here ..."
      />
      <div className="button-search">
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
};

export default SearchBar;
