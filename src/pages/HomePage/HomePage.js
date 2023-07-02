import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import Slider from "../../components/Slider/Slider";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  fetchProductsByCategory,
} from "../../redux/CategorySlice";
import { fetchProducts } from "../../redux/ProductSlice";
import CategorySection from "../../components/CategorySection/CategorySection";
import ProductList from "../../components/ProductList/ProductList";
import Loader from "../../components/Loader/Loader";
import '../../App.scss'

const HomePage = () => {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.category);
  const { data: products, status: productStatus } = useSelector(
    (state) => state.product
  );
  const { catAllProducts: productsByCategory, catAllProductsStatus } =
    useSelector((state) => state.category);

  const [isLoading, setIsLoading] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const categoryIds = [1, 2, 3, 4, 5];
  useEffect(() => {
    dispatch(fetchProducts(""));
    dispatch(fetchCategories());

    Promise.all(
      categoryIds.map((categoryId) =>
        dispatch(fetchProductsByCategory(categoryId, "ALL"))
      )
    )
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

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
    <div className="homepage">
      <Slider />
      {!isLoading && (
        <>
          <ProductList products={products} status={productStatus} />
          {categories.map((category, index) => (
            <section key={index}>
              {productsByCategory[index] && (
                <CategorySection
                  products={productsByCategory[index]}
                  status={catAllProductsStatus}
                />
              )}
            </section>
          ))}
          {showScrollToTop && (
            <button className="scroll-to-top" onClick={scrollToTop}>
              Scroll To Top
            </button>
          )}
        </>
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default HomePage;
