import React, { useEffect, useState } from "react";
import "../../App.scss";
import { useDispatch, useSelector } from "react-redux";
import { CountryDropdown } from "react-country-region-selector";
import { clearCart, getOrderTotal } from "../../redux/CartSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialAddressState = {
  name: "",
  address: "",
  discountCode: "",
  country: "",
  phone: "",
};

const CheckoutDetailsPage = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });

  const {
    data: cartItems,
    totalItems,
    totalAmount,
    totalProducts,
    deliveryCharge,
  } = useSelector((state) => state.cart);
  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmitForm = (e) => {
    e.preventDefault();
    navigate("/");
    try {
      dispatch(clearCart());
      toast.success("Successfully checkout!", { autoClose: 1000 });
    } catch (error) {
      toast.error("Failed checkout!", { autoClose: 1000 });
    }
  };
  useEffect(() => {
    dispatch(getOrderTotal());
  }, []);
  const emptyCartMsg = <h4>No items found</h4>;
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
                        value={shippingAddress.name}
                        onChange={(e) => handleShipping(e)}
                      />
                    </div>
                    <div>
                      <label>Address</label>
                      <input
                        required
                        type="text"
                        placeholder="Address"
                        value={shippingAddress.address}
                        onChange={(e) => handleShipping(e)}
                      />
                    </div>
                    <div>
                      <label>Discount code</label>
                      <input
                        required
                        type="text"
                        placeholder="Discount code"
                        value={shippingAddress.discountCode}
                        onChange={(e) => handleShipping(e)}
                      />
                    </div>
                    <div>
                      <label>Phone</label>
                      <input
                        required
                        type="text"
                        placeholder="Phone"
                        value={shippingAddress.phone}
                        onChange={(e) => handleShipping(e)}
                      />
                    </div>
                    <label>Country</label>
                    <CountryDropdown
                      required
                      valueType="short"
                      value={shippingAddress.country}
                      onChange={(val) =>
                        handleShipping({
                          target: {
                            name: "country",
                            value: val,
                          },
                        })
                      }
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
