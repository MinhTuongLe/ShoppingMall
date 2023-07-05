import React from "react";
import "./CategorySection.scss";
import "../../App.scss";
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
    <div className="grid wide category-list" style={{paddingBottom:'3%'}}>
      <h1 className="title">{products[0] && products[0].category.name}</h1>
      <div className="row row-formated">
        {products.slice(0, 5).map((product) => (
          <Link
            key={product.id}
            className="c-2-4 product-section"
            to={`/product/${product.id}`}
          >
            <div className="product-banner">{product.category.name}</div>

            <div className="product--image-section">
              <img
                src={product.images[0]}
                alt="Alternate Image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";
                }}
                className="product--image"
              />
            </div>
            <p className="product--name">{product.title}</p>
          </Link>
        ))}
      </div>
      {isHomePage && (
        <Link to={`./category/${products[0].category.id}`}>
          <Button
            style={{
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
