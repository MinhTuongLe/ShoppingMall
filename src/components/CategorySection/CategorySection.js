import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import './CategorySection.scss'

const CategorySection = ({ products }) => {
  return (
    <Container style={{ maxWidth: "1400px" }}>
      <h1>{products[0] && products[0].category.name}</h1>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#5193b3",
        }}
      >
        {products.slice(0, 5).map((product) => (
          <Col key={product.id} style={{ maxWidth: "20%" }}>
            <div>
              <img
                src={product.images}
                alt={product.name}
                className="product--image"
              />
            </div>
            <div>
              <h6 className="product--name">{product.name}</h6>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategorySection;
