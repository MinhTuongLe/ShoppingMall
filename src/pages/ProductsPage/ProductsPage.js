import React, { useEffect, useState } from "react";
import "./ProductsPage.scss";
import ProductList from "../../components/ProductList/ProductList";
import { fetchProducts } from "../../redux/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import "../../App.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const {
    data: products,
    status: productsStatus,
    searchText: searchText,
  } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts(searchText));
  }, [searchText]);

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
  if (productsStatus === STATUS.ERROR) return <Error />;
  if (productsStatus === STATUS.LOADING) return <Loader />;

  return (
    <div className="products-page">
      <div className="grid wide address">
        <Link to="/" className="address-link">
          <i className="fas fa-home"></i>
        </Link>
        <i className="fas fa-chevron-right address-link"></i>
        <span className="address-link">Products</span>
      </div>
      <ProductList products={products} status={productsStatus} />
      {showScrollToTop && (
        <Button
          className="scroll-to-top"
          onClick={scrollToTop}
        >
          Scroll To Top
        </Button>
      )}
    </div>
  );
};

export default ProductsPage;
