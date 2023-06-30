import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "../../App.scss";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/CategorySlice";
import { Link } from "react-router-dom";
import { getCartTotal } from "../../redux/CartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.category);
  const { totalItems } = useSelector((state) => state.cart);
  const [showCategoryList, setShowCategoryList] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getCartTotal())
  }, []);

  const handleShowCategoryList = () => {
    setShowCategoryList(!showCategoryList);
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
            <ul
              className={`categories-list ${
                showCategoryList ? "height-70vh" : ""
              }`}
            >
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    className="categories-list--item"
                    to={`/category/${category.id}`}
                  >
                    {" "}
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link className="cart-field" to="/cart">
            <i class="fa-solid fa-cart-shopping cart-icon"></i>
            <span className="cart-desc--text">Cart</span>
            <span className="cart-desc--number">{totalItems}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
