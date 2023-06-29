import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/CategorySlice";
import "./CategoriesSection.scss";
import { Link } from "react-router-dom";
const CategoriesSection = ({ category }) => {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <Container style={{ maxWidth: "1400px" }}>
      <h1>Categories</h1>
      <Row style={{ display: "flex", justifyContent: "center", backgroundColor: "#5193b3" }}>
        {categories.slice(0, 5).map((category) => (
          <Col
            key={category.id}
            style={{ maxWidth:'20%' }}
          >
            <Link
              to={`category/${category.id}`}
              style={{ textDecoration: "none" }}
            >
              <div>
                <img
                  src={category.image}
                  alt={category.name}
                  className="category--image"
                />
              </div>
              <div>
                <h6 className="category--name">{category.name}</h6>
              </div>
            </Link>
          </Col>
        ))}        
      </Row>
    </Container>
  );
};

export default CategoriesSection;
