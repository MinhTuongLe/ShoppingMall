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
  const { data: productDetails, status: productDetailsStatus } = useSelector(
    (state) => state.productDetails
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

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
  }, []);

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

  const noProductFound = <h4 className="empty-products">No products found!</h4>;

  if (productDetailsStatus === STATUS.ERROR) return <Error />;
  if (productDetailsStatus === STATUS.LOADING) return <Loader />;
  return (
    <>
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
        <>
          <div className="product-details-page grid wide">
            <div className="row">
              <div className="c-5">
                <div>
                  {productDetails.images && (
                    <Carousel interval={2500} style={{ height: "85vh" }}>
                      {productDetails.images.map((image, index) => (
                        <Carousel.Item className="carousel-item">
                          <img
                            className="d-block w-100"
                            src={image}
                            alt="First slide"
                            style={{ height: "85vh" }}
                          />
                          <Carousel.Caption>
                            <h3>Image {index + 1}</h3>
                          </Carousel.Caption>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  )}
                </div>
              </div>
              <div className="c-7">
                {productDetails.title && <h1>{productDetails.title}</h1>}
                {productDetails.description && (
                  <h1>{productDetails.description}</h1>
                )}
                {productDetails.price && <h1>{productDetails.price}</h1>}

                <div>
                  <h3>Quantity:</h3>
                  <div>
                    <button onClick={() => increaseQuantity()}>
                      <i className="fa-solid fa-plus"></i>
                    </button>
                    <h3>{quantity}</h3>
                    <button onClick={() => decreaseQuantity()}>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </div>
                </div>
                <button onClick={() => addToCartHandler(productDetails)}>
                  <i className="fa-solid fa-cart-shopping cart-icon"></i>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        noProductFound
      )}
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
    </>
  );
};

export default ProductDetails;
