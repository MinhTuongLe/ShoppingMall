import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ProductList.scss";
import '../../App.scss'
const ProductList = ({ products }) => {
  const currentURL = window.location.href;
  let maxProducts = 10;
  if (currentURL.includes("/category")) maxProducts = 20;
  return (
    <div className="grid wide" id="productList">
      <h1>{products[0] && 'Our Products'}</h1>
      <div
      className="row"
        style={{
          backgroundColor: "#5193b3",
        }}
      >
        {products.slice(0, maxProducts).map((product) => (
          <div key={product.id} className="c-2-4">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
