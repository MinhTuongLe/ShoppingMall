import React, { useEffect } from "react";
import "./ProductDetailsPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductById } from "../../redux/ProductDetailsSlice";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { data: productDetails } = useSelector((state) => state.productDetails);
  const dispatch = useDispatch();
  const id = useParams();
  console.log(id);

  useEffect(() => {
    dispatch(fetchProductById(id.id));
  }, []);

  return (
    <div className="product-details-page">
      <h1>{productDetails.id}</h1>
      <h1>{productDetails.title}</h1>
      <div>
        {productDetails.images.map((image) => (
          <img src={image} />
        ))}
      </div>
      <h1>{productDetails.description}</h1>
      <h1>{productDetails.price}</h1>
      <h1>{productDetails.category.name}</h1>
    </div>
  );
};

export default ProductDetails;
