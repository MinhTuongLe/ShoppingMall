import React, { useEffect, useState } from "react";
import "./ProductDetailsPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductById } from "../../redux/ProductDetailsSlice";
import { useNavigate, useParams, Link } from "react-router-dom";
import { addToCart } from "../../redux/CartSlice";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "../../App.scss";
import { Button } from "react-bootstrap";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { data: productDetails, status: productDetailsStatus } = useSelector(
    (state) => state.productDetails
  );
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const increaseQuantity = () => {
    setQuantity((preQuantity) => {
      let newQuantity = preQuantity + 1;
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((preQuantity) => {
      let newQuantity = preQuantity - 1;
      if (newQuantity < 1) {
        newQuantity = 1;
      }
      return newQuantity;
    });
  };

  const addToCartHandler = (product) => {
    let totalPrice = quantity * product.price;
    const tempProduct = {
      ...product,
      quantity: quantity,
      totalPrice,
    };
    dispatch(addToCart(tempProduct));
    navigate("/cart");
    toast.success(`Successfully add to cart!`, { autoClose: 1000 });
  };

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

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

  const noProductFound = <h4 className="empty-products">No products found!</h4>;

  if (productDetailsStatus === STATUS.ERROR) return <Error />;
  if (productDetailsStatus === STATUS.LOADING) return <Loader />;
  return (
    <div className="product-details-page">
      <div className="grid wide address">
        <Link to="/" className="address-link">
          <i className="fas fa-home"></i>
        </Link>
        <i className="fas fa-chevron-right address-link"></i>
        <Link to="/products" className="address-link">
          <span>Products</span>
        </Link>
        <i className="fas fa-chevron-right address-link"></i>
        {productDetails.category && productDetails.category.id && (
          <Link
            to={`/category/${productDetails.category.id}`}
            className="address-link"
          >
            <span>
              {productDetails.category.name && productDetails.category.name}
            </span>
          </Link>
        )}
        <i className="fas fa-chevron-right address-link"></i>
        {productDetails.title && (
          <span className="address-link">{productDetails.title}</span>
        )}
      </div>
      {productDetails.id &&
      productDetails.title &&
      productDetails.images &&
      productDetails.description &&
      productDetails.price &&
      productDetails.category &&
      productDetails.category.name ? (
        <div className="product-details-section">
          <div className="grid wide">
            <div className="row row-formated" style={{justifyContent: 'space-between'}}>
              <div className="c-5">
                {productDetails.images && (
                  <Carousel
                    interval={2500}
                  >
                    {productDetails.images.map((image, index) => (
                      <Carousel.Item key={index}>
                        <img
                          style={{ width: "100%", maxHeight: "78vh" }}
                          src={image}
                          alt="Alternate Image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";
                          }}
                        />
                        <Carousel.Caption>
                          <h3>Image {index + 1}</h3>
                        </Carousel.Caption>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                )}
              </div>
              <div className="c-5">
                {productDetails.title && <h1>Name: {productDetails.title}</h1>}
                {productDetails.description && (
                  <h1>Description: {productDetails.description}</h1>
                )}
                {productDetails.price && <h1>Price: {productDetails.price}</h1>}

                <div className="product-quantity">
                  <h3>Quantity:</h3>
                  <div className="adjust-product-quantity">
                    <button onClick={() => increaseQuantity()}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <h3>{quantity}</h3>
                    <button onClick={() => decreaseQuantity()}>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </div>
                </div>
                <Button onClick={() => addToCartHandler(productDetails)}>
                  <i className="fa-solid fa-cart-shopping cart-icon"></i>
                  <span>Add to Cart</span>
                </Button>
              </div>
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
      ) : (
        noProductFound
      )}
    </div>
  );
};

export default ProductDetails;
