import React, { useEffect } from "react";
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

const HomePage = () => {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.category);
  const { data: products, status: productStatus } = useSelector((state) => state.product);
  const { catAllProducts: productsByCategory, catAllProductsStatus } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    categories.forEach((category) => {
      dispatch(fetchProductsByCategory(category.id, "ALL"));
    });
  }, [dispatch, categories]);

  return (
    <div className="homepage">
      <Slider />
      <ProductList products={products}/>
      {categories.map((category, index) => (
        <section key={category.id}>
          {productsByCategory[index] && (
            <CategorySection
              products={productsByCategory[index]}
              status={catAllProductsStatus[index]}
            />
          )}
        </section>
      ))}
    </div>
  );
};

export default HomePage;
