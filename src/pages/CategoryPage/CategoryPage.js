import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {fetchProductsByCategory} from '../../redux/CategorySlice'
import './CategoryPage.scss'
const CategoryPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { catEachProducts: products } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchProductsByCategory(id, 'EACH'))
  }, [id]);

  return (
    <Container style={{ maxWidth: "1400px", marginTop: '200px' }}>
      <h1>{products[0] && products[0].category.name}</h1>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#5193b3",
        }}
      >
        {products.map((product) => (
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

export default CategoryPage;
