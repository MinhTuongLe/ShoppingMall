import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './CategorySection.scss'
import '../../App.scss'
import { Link } from "react-router-dom";

const CategorySection = ({ products }) => {
  return (
    <div className="grid wide">
      <h1>{products[0] && products[0].category}</h1>
      <div
      className="row"
        style={{
          backgroundColor: "#5193b3",
        }}
      >
        {products.slice(0, 5).map((product) => (
          <Link key={product.id} className="c-2-4" to={`/product/${product.id}`}>
            <div className="product--image-section">
              <img
                // src={product.images[0]}
                src="https://fastly.picsum.photos/id/318/640/640.jpg?hmac=5cOMICOxIroPZAdiGA4-M50bvlhNo05T5t_FufYyRtI"
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

export default CategorySection;
