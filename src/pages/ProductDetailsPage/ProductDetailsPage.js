import React, { useEffect, useState } from "react";
import "./ProductDetailsPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductById } from "../../redux/ProductDetailsSlice";
import { useNavigate, useParams, Link } from "react-router-dom";
import { addToCart } from "../../redux/CartSlice";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";

const ProductDetails = () => {
  const { data: productDetails, status: productDetailsStatus } = useSelector((state) => state.productDetails);
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
  };

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, []);
  if (productDetailsStatus === STATUS.ERROR) return <Error />;
  if (productDetailsStatus === STATUS.LOADING) return <Loader />;
  return (
    <div className="product-details-page">
      <div>
        <Link to="/">
          <i className="fas fa-home"></i>
          <i className="fas fa-chevron-right"></i>
        </Link>
        <Link to="/products">
          <span>Products</span>
          <i className="fas fa-chevron-right"></i>
        </Link>
        {productDetails.category && productDetails.category.id && (
          <Link to={`/category/${productDetails.category.id}`}>
            <span>
              {productDetails.category.name && productDetails.category.name}
            </span>
            <i className="fas fa-chevron-right"></i>
          </Link>
        )}
        {productDetails.title && (
          <Link to={`/category/${productDetails.category.id}`}>
            {productDetails.title}
          </Link>
        )}
      </div>
      {productDetails.id && <h1>{productDetails.id}</h1>}
      {productDetails.title && <h1>{productDetails.title}</h1>}
      <div>
        {productDetails.images &&
          productDetails.images.map((image, index) => (
            <img key={index} src={image} alt={`Product ${index}`} />
          ))}
      </div>
      {productDetails.description && <h1>{productDetails.description}</h1>}
      {productDetails.price && <h1>{productDetails.price}</h1>}
      {productDetails.category && productDetails.category.name && (
        <h1>{productDetails.category.name}</h1>
      )}
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
  );
};

export default ProductDetails;
