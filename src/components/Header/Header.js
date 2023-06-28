import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import "../../App.scss";
import "./Header.scss";
const Header = () => {
  return (
    <div className="header">
      <div className="header-top">
        <div className="header-top--wide">
          <h1 className="brand">
            Shopping<span>Mall</span>
          </h1>
          <SearchBar />
          <div className="cart-field">
            <i class="fa-solid fa-cart-shopping"></i>
            <span>Cart</span>
            <span>0</span>
          </div>
        </div>
      </div>
      <div className="header-bottom" style={{ height: "40%" }}>
        <div className="header-bottom--wide">
          <ul className="categories-list">
            <li className="categories-list--item">Clothes</li>
            <li className="categories-list--item">Electronics</li>
            <li className="categories-list--item">Furniture</li>
            <li className="categories-list--item">Shoes</li>
            <li className="categories-list--item">Orthers</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
