import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByCategory } from "../../redux/CategorySlice";
import "./CategoryPage.scss";
import "../../App.scss";
import ProductList from "../../components/ProductList/ProductList";
const CategoryPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { catEachProducts: products, catEachProductsStatus: status, searchText: searchText } =
    useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchProductsByCategory(id, "EACH", searchText ));
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
      <ProductList products={products} status={status}/>
      {showScrollToTop && (
            <button className="scroll-to-top" onClick={scrollToTop}>
              Scroll To Top
            </button>
          )}
    </div>
  );
};

export default CategoryPage;
