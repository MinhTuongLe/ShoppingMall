import React, { useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "../../App.scss";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/CategorySlice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="header">
      <div className="header-top">
        <div className="header-top--wide">
          <h1>
            <Link className="brand" to="/">
              Shopping<span>Mall</span>
            </Link>
          </h1>
          <SearchBar />
          <div className="cart-field">
            <i class="fa-solid fa-cart-shopping"></i>
            <span>Cart</span>
            <span>0</span>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="header-bottom--wide">
          <ul className="categories-list">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  className="categories-list--item"
                  to={`category/${category}`}
                >
                  {" "}
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
