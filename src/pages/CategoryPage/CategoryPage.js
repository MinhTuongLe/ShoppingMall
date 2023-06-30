import React, { useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../../redux/CategorySlice";
import "./CategoryPage.scss";
import "../../App.scss";
import ProductList from "../../components/ProductList/ProductList";
const CategoryPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { catEachProducts: products } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchProductsByCategory(id, "EACH"));
  }, [id]);

  return (
    <div className="grid wide category-page">
      <div>
        <Link to="/">
          <i className="fas fa-home"></i>
          <i className="fas fa-chevron-right"></i>
        </Link>
        <Link to="/">
          <span>Category</span>
          <i className="fas fa-chevron-right"></i>
        </Link>
        <Link>{products[0] && products[0].category.name}</Link>
      </div>
      <ProductList products={products} />
    </div>
  );
};

export default CategoryPage;
