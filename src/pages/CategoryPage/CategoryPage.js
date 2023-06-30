import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../../redux/CategorySlice";
import "./CategoryPage.scss";
import "../../App.scss";
const CategoryPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { catEachProducts: products } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchProductsByCategory(id, "EACH"));
  }, [id]);

  return (
    <div className="grid wide category-page">
      <h1>{products[0] && products[0].category}</h1>
      <div
        className="row"
        style={{
          backgroundColor: "#5193b3",
        }}
      >
        {products.map((product) => (
          <div key={product.id} className="c-2-4">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
