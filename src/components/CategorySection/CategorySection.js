import React from "react";
import './CategorySection.scss'
import '../../App.scss'
import { Link } from "react-router-dom";

const CategorySection = ({ products }) => {
  return (
    <div className="grid wide">
      <h1>{products[0] && products[0].category.name}</h1>
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
    </div>
  );
};

export default CategorySection;
