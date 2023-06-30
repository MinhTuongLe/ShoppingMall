import React, { useEffect } from 'react'
import './ProductsPage.scss'
import ProductList from '../../components/ProductList/ProductList'
import { fetchProducts } from "../../redux/ProductSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductsPage = () => {
  const { data: products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [])
  return (
    <div className='products-page'>
      <ProductList products={products}/>
    </div>
  )
}

export default ProductsPage
