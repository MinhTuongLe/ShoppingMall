import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../../redux/CategorySlice";
import "./CategoryPage.scss";
import "../../App.scss";
import ProductList from "../../components/ProductList/ProductList";
import { Button } from "react-bootstrap";
const CategoryPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    catEachProducts: products,
    catEachProductsStatus: status,
    searchText: searchText,
  } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchProductsByCategory(id, "EACH", searchText));
  }, [id, searchText]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.pageYOffset > window.innerHeight) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="grid wide category-page">
      <div className="grid wide address">
        <Link to="/" className="address-link">
          <i className="fas fa-home"></i>
        </Link>
        <i className="fas fa-chevron-right address-link"></i>
        <span className="address-link">Category</span>
        <i className="fas fa-chevron-right address-link"></i>
        <span className="address-link">
          {products[0] && products[0].category.name}
        </span>
      </div>
      <ProductList products={products} status={status} />
      {showScrollToTop && (
        <Button
          className="scroll-to-top"
          onClick={scrollToTop}
          style={{
            backgroundColor: "#5193b3",
            border: "1px solid #fff",
          }}
        >
          Scroll To Top
        </Button>
      )}
    </div>
  );
};

export default CategoryPage;
