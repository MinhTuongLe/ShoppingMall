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
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displaySubMenu, setDisplaySubMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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

  const handleMenuIconClicked = () => {
    setDisplayMenu(true);
  };

  const handleCategoryIconClicked = () => {
    setDisplaySubMenu(!displaySubMenu);
  };

  const handleOutsideClick = () => {
    if (displaySubMenu) {
      setDisplaySubMenu(false);
    }
  };

  return (
    <div className="header" onClick={handleOutsideClick}>
      <div className="header-top">
        <div className="header-top--wide">
          <h1>
            <Link className="brand" to="/">
              Shopping<span>Mall</span>
            </Link>
          </h1>
          <div className="search-bar">
            <SearchBar />
          </div>
          <section className="switchmode">
            <ShowOnLogout>
              <Link to="/login" className="login">
                <Button>Login</Button>
              </Link>
            </ShowOnLogout>
            <ShowOnLogin>
              <Button
                className="display-name"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={logoutUser}
              >
                {isHovered ? "Logout" : displayName}
              </Button>
            </ShowOnLogin>
          </section>
          <Link className="cart-field" to="/cart">
            <i class="fa-solid fa-cart-shopping cart-icon"></i>
            <span className="cart-desc--text">Cart</span>
            <span className="cart-desc--number">{totalItems}</span>
          </Link>
          <div className="menu-icon" onClick={handleMenuIconClicked}>
            <i class="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="header-bottom--wide">
          <ul className="categories-list">
            {categories.slice(0, 5).map((category) => (
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
      <div>
        <div
          className="menu-items-list"
          style={{
            transform: displayMenu ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <div className="menu-items-list--top">
            <i
              class="fa-solid fa-xmark close-icon"
              onClick={() => setDisplayMenu(false)}
            ></i>
          </div>
          <hr className="menu-item-list--line"></hr>
          <div className="menu-items-list--bottom">
            <ShowOnLogout>
              <Link
                to="/login"
                className="menu-item"
                style={{ justifyContent: "space-around" }}
              >
                <i class="fa-solid fa-user"></i>
                <Button style={{ width: "50%" }}>Login</Button>
              </Link>
            </ShowOnLogout>
            <ShowOnLogin>
              <div className="menu-item" style={{ width: "80%" }}>
                <span className="display-name" onClick={logoutUser}>
                  {displayName}
                </span>
                <i class="fa-solid fa-user user-icon"></i>
              </div>
              <div className="menu-item">
                <Button onClick={logoutUser} style={{ width: "80%" }}>
                  Logout
                </Button>
              </div>
            </ShowOnLogin>
            <Link className="menu-item" to="/cart">
              <i class="fa-solid fa-cart-shopping cart-icon"></i>
              <div className="cart-title">
                <span>Cart</span>
                <span>{totalItems}</span>
              </div>
            </Link>
            <div className="menu-item" onClick={handleCategoryIconClicked}>
              Categories
              {
                <ul className="categories-submenu" style={{height: displaySubMenu ? "40vh" : "0"}}>
                  {categories.slice(0, 5).map((category) => (
                    <li key={category.id}>
                      <Link
                        className="categories-submenu-item"
                        to={`/category/${category.id}`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              }
            </div>
            <div className="search-bar-mobile">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
