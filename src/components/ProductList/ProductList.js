import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProductDetailsData } from "../../redux/ProductDetailsSlice";

const ProductList = ({ products }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentURL = window.location.href;
  let maxProducts = 10;
  if (currentURL.includes("/category")) maxProducts = 20;

  const handleViewProductDetails = (productId, data) => {
    dispatch(setProductDetailsData(data));
    navigate(`/product/${productId}`);
  };

  return (
    <div className="grid wide" id="productList">
      <h1>{products[0] && "Our Products"}</h1>
      <div
        className="row"
        style={{
          backgroundColor: "#5193b3",
        }}
      >
        {products.slice(0, maxProducts).map((product) => (
          <Link
            key={product.id}
            className="c-2-4"
            onClick={(e) => {
              e.preventDefault();
              handleViewProductDetails(product.id, product);
            }}
          >
            <div className="product--image-section">
              <img
                src={product.images}
                alt={product.title}
                className="product--image"
              />
            </div>
            <div>
              <h6 className="product--name">{product.title}</h6>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
