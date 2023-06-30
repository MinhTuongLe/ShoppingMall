import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductList = ({ products }) => {
  const navigate = useNavigate();
  const currentURL = window.location.href;
  let isHomePage = true;
  let maxProducts = 10;
  if (currentURL.includes("/category") || currentURL.includes("/products")) {
    maxProducts = Infinity;
    isHomePage = false;
  }

  const handleViewProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="grid wide" id="productList">
      <h1>{products[0] && "Our Products"}</h1>
      <div
        className="row row-formated"
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
              handleViewProductDetails(product.id);
            }}
          >
            <div className="product--image-section">
              <img
                src={product.images[0]}
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
     {isHomePage &&  <Link to="/products">
        <button>Show All Products</button>
      </Link>}
    </div>
  );
};

export default ProductList;
