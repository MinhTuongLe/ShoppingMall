import React, { useEffect } from 'react';
import './ProductDetailsPage.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setProductDetailsData } from '../../redux/ProductDetailsSlice';

const ProductDetails = () => {
  const { data: productDetails } = useSelector(state => state.productDetails);
  return (
    <div className='product-details-page'>
      <h1>{productDetails.id}</h1>
      <h1>{productDetails.title}</h1>
    </div>
  );
};

export default ProductDetails;
