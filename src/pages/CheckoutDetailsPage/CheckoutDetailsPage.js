import React, { useEffect, useState } from "react";
import "../../App.scss";
import { useDispatch, useSelector } from "react-redux";
import { CountryDropdown } from "react-country-region-selector";
import { clearCart, getOrderTotal } from "../../redux/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
const CheckoutDetailsPage = () => {
  const {
    data: cartItems,
    totalAmount,
    totalProducts,
    deliveryCharge,
  } = useSelector((state) => state.cart);
  const {status: loginStatus} = useSelector(state => state.auth)


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
      toast.success("Successfully checkout!", { autoClose: 1000 });
      navigate("/");
    } catch (error) {
      toast.error("Failed checkout!", { autoClose: 1000 });
    }
  };

  useEffect(() => {
    dispatch(getOrderTotal());
  }, []);

  const emptyCartMsg = <h4>No items found</h4>;

  if (loginStatus === STATUS.ERROR) return <Error />;
  if (loginStatus === STATUS.LOADING) return <Loader />;

  return (
    <div className="cart-page">
      <div className="grid wide">
        <div>
          <Link to="/">
            <i className="fas fa-home"></i>
            <i className="fas fa-chevron-right"></i>
          </Link>
          <span>Cart</span>
        </div>
        <div className="row row-formated">
          {cartItems.length === 0 ? (
            emptyCartMsg
          ) : (
            <>
              <h1>Checkout Details</h1>
              <div style={{ backgroundColor: "orangered" }} className="c-6">
                <form onSubmit={handleSubmitForm}>
                  <div>
                    <h3>Delivery Information</h3>
                    <div>
                      <label>Recipient Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Recipient Name"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Address</label>
                      <input
                        required
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Discount code</label>
                      <input
                        required
                        type="text"
                        placeholder="Discount code"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Phone</label>
                      <input
                        required
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <label>Country</label>
                    <CountryDropdown
                      required
                      valueType="short"
                      value={country}
                      onChange={(val) => setCountry(val)}
                    />
                    <button type="submit">Checkout</button>
                  </div>
                </form>
              </div>
              <div style={{ backgroundColor: "skyblue" }} className="c-6">
                <div>
                  <div>
                    <h2>Checkout Summary</h2>
                    <div>
                      <div>
                        <h3>Selected {totalProducts} item(s). Price</h3>
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
                  {cartItems.map((cartItem) => (
                    <div>
                      <div>
                        <h3>{cartItem.title}</h3>
                        <div>
                          <h3>Quantity:</h3>
                          <div>
                            <h3>{cartItem.quantity}</h3>
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetailsPage;
