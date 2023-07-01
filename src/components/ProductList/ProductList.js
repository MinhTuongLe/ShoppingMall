import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { STATUS } from "../../utils/status";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const ProductList = ({ products, status }) => {
  const navigate = useNavigate();
  const currentURL = window.location.href;
  let isHomePage = true;
  let maxProducts = 10;
  if (currentURL.includes("/category") || currentURL.includes("/products")) {
    maxProducts = Infinity;
    isHomePage = false;
  }
  if (status === STATUS.ERROR) return <Error />;
  if (status === STATUS.LOADING) return <Loader />;
  const handleViewProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };
  const noProductFound = <h4>No products found!</h4>;

  return (
    <div className="grid wide" id="productList">
      {products.length === 0 ? (
        noProductFound
      ) : (
        <>
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
          {isHomePage && (
            <Link to="/products">
              <Button
                style={{
                  backgroundColor: "#5193b3",
                  border: "1px solid #fff",
                  marginBottom: "24px",
                  marginTop: "12px",
                }}
              >
                Show All Products
              </Button>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
