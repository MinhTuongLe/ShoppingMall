import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "../../App.scss";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/CategorySlice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.category);

  const [showCategoryList, setShowCategoryList] = useState(false)

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleShowCategoryList = () => {
    setShowCategoryList(!showCategoryList)
  };

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
          <div className="category-field" onClick={handleShowCategoryList}>
            <span>Categories</span>
            <i class="fa-solid fa-caret-down"></i>
            <ul className={`categories-list ${showCategoryList ? 'height-70vh' : ''}`}>
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
          <div className="cart-field">
            <i class="fa-solid fa-cart-shopping cart-icon"></i>
            <span className="cart-desc--text">Cart</span>
            <span className="cart-desc--number">0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
