import React, { useEffect, useState } from "react";
import "./CartPage.scss";
import "../../App.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  clearCart,
  modifyCartQuantity,
  getCartTotal,
  saveURL,
} from "../../redux/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { selectIsLoggedIn } from "../../redux/AuthSlice";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { Button } from "react-bootstrap";
import { formatCurrency } from "../../utils/formatCurrency";
import Footer from "../../components/Footer/Footer";
const CartPage = () => {
  const {
    data: cartItems,
    totalItems,
    totalAmount,
    deliveryCharge,
  } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { status: loginStatus } = useSelector((state) => state.auth);

  const currentURL = window.location.href;
  const handleCheckout = () => {
    if (isLoggedIn) {
      navigate("/checkout-details");
    } else {
      dispatch(saveURL(currentURL));
      navigate("/login");
    }
  };
  useEffect(() => {
    dispatch(getCartTotal());
    dispatch(saveURL(""));
  }, [useSelector((state) => state.cart)]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > window.innerHeight) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loginStatus === STATUS.ERROR) return <Error />;
  if (loginStatus === STATUS.LOADING) return <Loader />;
  const emptyCartMsg = <h4 style={{ color: "#5193b3" }}>No items found!</h4>;
  return (
    <div className="cart-page">
      <div className="cart-section">
        <div className="grid wide address">
          <Link to="/" className="address-link">
            <i className="fas fa-home"></i>
          </Link>
          <i className="fas fa-chevron-right address-link"></i>
          <span className="address-link">Cart</span>
        </div>
        <div className="grid wide" style={{ padding: "1%" }}>
          <div
            className="row row-formated"
            style={{ justifyContent: "space-between" }}
          >
            <h1 style={{ color: "#5193b3" }}>My Cart</h1>
            {cartItems.length === 0 ? (
              emptyCartMsg
            ) : (
              <>
                <div className="c-6 cart-items-list xl-7 lg-12 md-12 sm-12">
                  <div className="grid">
                    {cartItems.map((cartItem) => (
                      <div className="row">
                        <div className="cart-item--group__left c-3 sm-12">
                          <Link to={`/products/${cartItem.id}`}>
                            <img
                              style={{ width: "100%" }}
                              src={cartItem.images}
                              alt="Alternate Image"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";
                              }}
                              className="item--image"
                            />
                          </Link>
                          <Button
                            style={{
                              width: "40px",
                              backgroundColor: "#f54768",
                            }}
                            onClick={() => {
                              dispatch(removeFromCart(cartItem.id));
                              toast.success("Successfully remove from cart!", {
                                autoClose: 1000,
                              });
                            }}
                          >
                            <i class="fa-solid fa-trash"></i>
                          </Button>
                        </div>
                        <div className="cart-item--group__right c-9 sm-12">
                          <h4 className="cart-item--label">{cartItem.title}</h4>
                          <div className="quantity-section">
                            <label className="cart-item--label">
                              Quantity:
                            </label>
                            <div className="adjust-quantity-section">
                              <Button
                                onClick={() => {
                                  dispatch(
                                    modifyCartQuantity({
                                      id: cartItem.id,
                                      type: "INCREASE",
                                    })
                                  );
                                  toast.success("Successfully increase item!", {
                                    autoClose: 1000,
                                  });
                                }}
                              >
                                <i class="fa-solid fa-plus"></i>
                              </Button>
                              <span
                                className="cart-item--label"
                                style={{ margin: "0 16px" }}
                              >
                                {cartItem.quantity}
                              </span>
                              <Button
                                onClick={() => {
                                  dispatch(
                                    modifyCartQuantity({
                                      id: cartItem.id,
                                      type: "DECREASE",
                                    })
                                  );
                                  toast.success("Successfully decrease item!", {
                                    autoClose: 1000,
                                  });
                                }}
                              >
                                <i class="fa-solid fa-minus"></i>
                              </Button>
                            </div>
                          </div>
                          <div className="calc-section">
                            <div className="product-price">
                              <span className="cart-item--label">
                                Price: {formatCurrency(cartItem.price)}
                              </span>
                            </div>
                            <div className="product-subtotal">
                              <span className="cart-item--label">
                                Sub Total: {formatCurrency(cartItem.totalPrice)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <hr className="product-line"></hr>
                      </div>
                    ))}
                  </div>
                  <Button
                    style={{ backgroundColor: "#f54768" }}
                    onClick={() => {
                      dispatch(clearCart());
                      toast.success("Successfully clear cart!", {
                        autoClose: 1000,
                      });
                    }}
                  >
                    Clear Cart
                  </Button>
                </div>
                <div className="c-4 order-information-list xl-5 lg-12 md-12 sm-12">
                  <h2>Order Summary</h2>
                  <div className="order-informaton-section">
                    <hr className="product-line"></hr>
                    <div className="order-item-list">
                      <div className="order-item">
                        <span
                          style={{ marginBottom: "12px" }}
                          className="cart-item--label"
                        >
                          Selected {totalItems} item(s). Price:
                        </span>
                        <span
                          style={{ marginBottom: "12px" }}
                          className="cart-item--label"
                        >
                          {formatCurrency(totalAmount)}
                        </span>
                      </div>
                      <div className="order-item">
                        <span
                          style={{ marginBottom: "12px" }}
                          className="cart-item--label"
                        >
                          Discount:
                        </span>
                        <span
                          style={{ marginBottom: "12px" }}
                          className="cart-item--label"
                        >
                          -{formatCurrency(0)}
                        </span>
                      </div>
                      <div className="order-item">
                        <span
                          style={{ marginBottom: "12px" }}
                          className="cart-item--label"
                        >
                          Delivery Cost:
                        </span>
                        <span
                          style={{ marginBottom: "12px" }}
                          className="cart-item--label"
                        >
                          {formatCurrency(deliveryCharge)}
                        </span>
                      </div>
                    </div>
                    <hr className="product-line"></hr>
                    <div className="order-item">
                      <span
                        style={{ marginBottom: "12px" }}
                        className="cart-item--label"
                      >
                        Grand Total:
                      </span>
                      <span className="cart-item--label">
                        {formatCurrency(totalAmount + deliveryCharge)}
                      </span>
                    </div>
                  </div>
                  <Button onClick={handleCheckout} style={{ marginTop: "5%" }}>
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        {showScrollToTop && (
          <Button
            className="scroll-to-top"
            onClick={scrollToTop}
            style={{
              backgroundColor: "#5193b3",
              border: "1px solid #fff",
            }}
          >
            Scroll To Top
          </Button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
