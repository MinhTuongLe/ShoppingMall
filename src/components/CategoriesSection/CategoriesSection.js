import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/CategorySlice";
import "./CategoriesSection.scss";
import { Link } from "react-router-dom";
import '../../App.scss'
const CategoriesSection = ({ category }) => {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="grid wide">
      <h1>Categories</h1>
      <div className="row" style={{ backgroundColor: "#5193b3" }}>
        {categories.map((category) => (
          <div
            key={category}
            className="c-2-4"
          >
            <Link
              to={`category/${category}`}
              style={{ textDecoration: "none" }}
            >
              <div>
                <img
                  src={category}
                  alt={category}
                  className="category--image"
                />
              </div>
              <div>
                <h6 className="category--name">{category}</h6>
              </div>
            </Link>
          </div>
        ))}        
      </div>
    </div>
  );
};

export default CategoriesSection;
