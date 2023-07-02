import React, { useEffect, useState } from "react";
import "./ProductsPage.scss";
import ProductList from "../../components/ProductList/ProductList";
import { fetchProducts } from "../../redux/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import '../../App.scss'
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
      <ProductList products={products} status={productsStatus} />
      {showScrollToTop && (
            <button className="scroll-to-top" onClick={scrollToTop}>
              Scroll To Top
            </button>
          )}
    </div>
  );
};

export default ProductsPage;
