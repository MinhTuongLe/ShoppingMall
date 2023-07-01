import React from "react";
import './CategorySection.scss'
import '../../App.scss'
import { Link } from "react-router-dom";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import { STATUS } from "../../utils/status";
import { Button } from "react-bootstrap";

const CategorySection = ({ products, status }) => {
  const currentURL = window.location.href;
  let isHomePage = true;
  if (currentURL.includes("/category") || currentURL.includes("/products")) {
    isHomePage = false;
  }
  if (status === STATUS.ERROR) return <Error />;
  if (status === STATUS.LOADING) return <Loader />;
  return (
    <div className="grid wide">
      <h1>{products[0] && products[0].category.name}</h1>
      <div
      className="row row-formated"
        style={{
          backgroundColor: "#5193b3",
        }}
      >
        {products.slice(0, 5).map((product) => (
          <Link key={product.id} className="c-2-4" to={`/product/${product.id}`}>
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
            <Link to={`./category/${products[0].category.id}`}>
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
    </div>
  );
};

export default CategorySection;
