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
  const emptyCartMsg = <h4>No items found!</h4>;
  return (
    <div className="cart-page">
      <div className="grid wide address">
        <Link to="/" className="address-link">
          <i className="fas fa-home"></i>
        </Link>
        <i className="fas fa-chevron-right address-link"></i>
        <span className="address-link">Cart</span>
      </div>
      <div className="grid wide">
        <div className="row row-formated">
          <h1 style={{ color: "#5193b3" }}>My Cart</h1>
          {cartItems.length === 0 ? (
            emptyCartMsg
          ) : (
            <>
              <div style={{ backgroundColor: "orangered" }} className="c-7">
                <div>
                  {cartItems.map((cartItem) => (
                    <div className="cart-item--group__left">
                      <div className="cart-item--image">
                        <Link to={`/product/${cartItem.id}`}>
                          <img
                            style={{ width: "100px" }}
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
                      <div className="cart-item--group__right">
                        <h3>{cartItem.title}</h3>
                        <div>
                          <h3>Quantity:</h3>
                          <div>
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
                            <h3>{cartItem.quantity}</h3>
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
                        <div>
                          <div>
                            <h3>Price:</h3>
                            <h3>{cartItem.price}</h3>
                          </div>
                          <div>
                            <h3>Sub Total:</h3>
                            <h3>{cartItem.totalPrice}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
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
              <div style={{ backgroundColor: "skyblue" }} className="c-5">
                <div>
                  <h2>Order Summary</h2>
                  <div>
                    <div>
                      <h3>Selected {totalItems} item(s). Price</h3>
                      <h3>{totalAmount}</h3>
                    </div>
                    <div>
                      <h3>Discount</h3>
                      <h3>-0</h3>
                    </div>
                    <div>
                      <h3>Delivery Cost</h3>
                      <h3>{deliveryCharge}</h3>
                    </div>
                  </div>
                  <div>
                    <h3>Grand Total:</h3>
                    <h3>{totalAmount + deliveryCharge}</h3>
                  </div>
                </div>
                <Button onClick={handleCheckout}>Proceed to Checkout</Button>
                <Link to="/">
                  <Button>Continue Shopping</Button>
                </Link>
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
  );
};

export default CartPage;
