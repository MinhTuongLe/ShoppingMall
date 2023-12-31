import React, { useEffect, useState } from "react";
import "../../App.scss";
import { useDispatch, useSelector } from "react-redux";
import { CountryDropdown } from "react-country-region-selector";
import { clearCart, getCartTotal, getOrderTotal } from "../../redux/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { Button } from "react-bootstrap";
import "./CheckoutDetailsPage.scss";
import { formatCurrency } from "../../utils/formatCurrency";
import Footer from "../../components/Footer/Footer";
const CheckoutDetailsPage = () => {
  const {
    data: cartItems,
    totalAmount,
    totalProducts,
    deliveryCharge,
  } = useSelector((state) => state.cart);
  const { status: loginStatus } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [recipientName, setRecipientName] = useState("");
  const [address, setAddress] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();
    try {
      dispatch(clearCart());
      dispatch(getCartTotal());
      toast.success("Successfully checkout!", { autoClose: 1000 });
      navigate("/");
    } catch (error) {
      toast.error("Failed checkout!", { autoClose: 1000 });
    }
  };

  useEffect(() => {
    dispatch(getOrderTotal());
  }, []);

  const emptyCartMsg = <h4 style={{ color: "#5193b3" }}>No items found!</h4>;
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

  return (
    <div className="checkout-details-page">
      <div className="checkout-details-section">
        <div className="grid wide address">
          <Link to="/" className="address-link">
            <i className="fas fa-home"></i>
          </Link>
          <i className="fas fa-chevron-right address-link"></i>
          <Link to="/cart" className="address-link">
            <span>Cart</span>
          </Link>
          <i className="address-link fas fa-chevron-right"></i>
          <span className="address-link">Checkout-details</span>
        </div>
        <div className="grid wide" style={{ padding: "0 1%" }}>
          <div
            className="row row-formated"
            style={{ justifyContent: "space-between", paddingBottom: "5%" }}
          >
            {cartItems.length === 0 ? (
              emptyCartMsg
            ) : (
              <>
                <h1 style={{ color: "#5193b3", marginTop: "1%" }}>
                  Checkout Details
                </h1>
                <div
                  className="c-5 test-6 lg-12 md-12 sm-12"
                  style={{ marginTop: "1%" }}
                >
                  <form
                    onSubmit={handleSubmitForm}
                    className="checkout-form-left"
                  >
                    <div className="checkout-details-list">
                      <h2>Delivery Information</h2>
                      <div className="checkout-details-item">
                        <label>Recipient Name</label>
                        <input
                          required
                          type="text"
                          placeholder="Recipient Name"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                        />
                      </div>
                      <div className="checkout-details-item">
                        <label>Address</label>
                        <input
                          required
                          type="text"
                          placeholder="Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                      <div className="checkout-details-item">
                        <label>Discount code</label>
                        <input
                          required
                          type="text"
                          placeholder="Discount code"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                        />
                      </div>
                      <div className="checkout-details-item">
                        <label>Phone</label>
                        <input
                          required
                          type="text"
                          placeholder="Phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="checkout-details-item">
                        <label>Country</label>
                        <CountryDropdown
                          required
                          valueType="short"
                          value={country}
                          style={{ padding: "3px 10px" }}
                          onChange={(val) => setCountry(val)}
                        />
                      </div>
                      <Button className="button-checkout" type="submit">
                        Checkout
                      </Button>
                    </div>
                  </form>
                </div>
                <div
                  style={{ marginTop: "1%" }}
                  className="c-5 test-6 lg-12 md-12 sm-12"
                >
                  <form className="checkout-form-right">
                    <h2>Checkout Summary</h2>
                    <div className="checkout-summary">
                      <div className="checkout-summary-list">
                        <div className="checkout-summary-item">
                          <span>Selected {totalProducts} item(s). Price:</span>
                          <span>{formatCurrency(totalAmount)}</span>
                        </div>
                        <div className="checkout-summary-item">
                          <span>Discount:</span>
                          <span>-{formatCurrency(0)}</span>
                        </div>
                        <div className="checkout-summary-item">
                          <span>Delivery Cost:</span>
                          <span>{formatCurrency(deliveryCharge)}</span>
                        </div>
                        <div className="checkout-summary-item">
                          <span>Grand Total:</span>
                          <span>
                            {formatCurrency(totalAmount + deliveryCharge)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {cartItems.map((cartItem) => (
                      <div className="items-list-section">
                        <div className="items-list">
                          <div className="item">
                            <h4>{cartItem.title}</h4>
                          </div>
                          <div className="item">
                            <span>Quantity: {cartItem.quantity}</span>
                          </div>
                          <div className="item">
                            <span>Price: {formatCurrency(cartItem.price)}</span>
                          </div>
                          <div className="item">
                            <span>
                              Sub Total: {formatCurrency(cartItem.totalPrice)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
        {showScrollToTop && (
          <Button className="scroll-to-top" onClick={scrollToTop}>
            Scroll To Top
          </Button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutDetailsPage;
