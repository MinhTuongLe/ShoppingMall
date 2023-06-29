import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./ProductList.scss";
const ProductList = ({ products }) => {
  const currentURL = window.location.href;
  let maxProducts = 10;
  if (currentURL.includes("/category")) maxProducts = 20;
  return (
    <Container style={{ maxWidth: "1400px" }}>
      <h1>{products[0] && 'Our Products'}</h1>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#5193b3",
        }}
      >
        {products.slice(0, maxProducts).map((product) => (
          <Col key={product.id} style={{ maxWidth: "20%" }}>
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
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
