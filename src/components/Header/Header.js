import React, { useEffect, useState, useRef } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "../../App.scss";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/CategorySlice";
import { Link, useNavigate } from "react-router-dom";
import { getCartTotal } from "../../redux/CartSlice";
import { setActiveUser, removeActiveUser } from "../../redux/AuthSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import ShowOnLogin, { ShowOnLogout } from "../SwitchMode/SwitchMode";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: categories } = useSelector((state) => state.category);
  const { totalItems } = useSelector((state) => state.cart);
  const [displayName, setDisplayName] = useState("");
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getCartTotal());
  }, []);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const temp = user.email.slice(0, user.email.indexOf("@"));
          const userName_ = temp.charAt(0).toUpperCase() + temp.slice(1);
          setDisplayName(userName_);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          setActiveUser({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userId: user.userId,
          })
        );
      } else {
        setDisplayName("");
        dispatch(removeActiveUser());
      }
    });
  }, [dispatch, displayName]);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Successfully logout!", { autoClose: 1000 });
        navigate("/");
      })
      .catch((error) => {
        toast.error("Failed logout!", { autoClose: 1000 });
      });
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
          <section className="switchmode">
            <ShowOnLogout>
              <Link to="/login" className="login">
                Login
              </Link>
            </ShowOnLogout>
            <ShowOnLogin>
              <div className="user-icon"></div>
              <i class="fa-solid fa-user"></i>
              <span className="display-name">
                {displayName.length > 10
                  ? displayName.slice(0, 10) + " ..."
                  : displayName}
              </span>
              <Button
                style={{
                  backgroundColor: "#f54768",
                  border: "1px solid #fff",
                }}
                onClick={logoutUser}
              >
                Logout
              </Button>
            </ShowOnLogin>
          </section>
          <Link className="cart-field" to="/cart">
            <i class="fa-solid fa-cart-shopping cart-icon"></i>
            <span className="cart-desc--text">Cart</span>
            <span className="cart-desc--number">{totalItems}</span>
          </Link>
        </div>
      </div>
      <div className="header-bottom">
        <div className="header-bottom--wide">
          <ul className="categories-list">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  className="categories-list--item"
                  to={`/category/${category.id}`}
                >
                  {category.name}
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
