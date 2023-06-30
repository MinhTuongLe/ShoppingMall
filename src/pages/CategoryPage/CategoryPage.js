import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
      <h1>{products[0] && products[0].category.name}</h1>
      <div
        className="row"
        style={{
          backgroundColor: "#5193b3",
        }}
      >
        {products.map((product) => (
          <Link key={product.id} className="c-2-4" to={`/product/${product.id}`}>
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
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
