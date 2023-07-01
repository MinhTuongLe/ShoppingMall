import React, { useEffect } from "react";
import "./ProductsPage.scss";
import ProductList from "../../components/ProductList/ProductList";
import { fetchProducts } from "../../redux/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
const ProductsPage = () => {
  const {
    data: products,
    status: productsStatus,
    searchText: searchText,
  } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts(searchText));
  }, [searchText]);
  if (productsStatus === STATUS.ERROR) return <Error />;
  if (productsStatus === STATUS.LOADING) return <Loader />;
  return (
    <div className="products-page">
      <ProductList products={products} status={productsStatus} />
    </div>
  );
};

export default ProductsPage;
