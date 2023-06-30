import React, { useEffect } from "react";
import "./ProductDetailsPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductById } from "../../redux/ProductDetailsSlice";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { data: productDetails } = useSelector((state) => state.productDetails);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, []);

  if (!productDetails) {
    return null;
  }

  return (
    <div className="product-details-page">
      {productDetails.id && <h1>{productDetails.id}</h1>}
      {productDetails.title && <h1>{productDetails.title}</h1>}
      <div>
        {productDetails.images &&
          productDetails.images.map((image, index) => (
            <img key={index} src={image} alt={`Product ${index}`} />
          ))}
      </div>
      {productDetails.description && <h1>{productDetails.description}</h1>}
      {productDetails.price && <h1>{productDetails.price}</h1>}
      {productDetails.category && productDetails.category.name && (
        <h1>{productDetails.category.name}</h1>
      )}
    </div>
  );
};

export default ProductDetails;
