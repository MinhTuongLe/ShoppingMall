import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { STATUS } from "../../utils/status";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import "./ProductList.scss";

const ProductList = ({ products, status }) => {
  const navigate = useNavigate();
  const currentURL = window.location.href;
  const [currentPage, setCurrentPage] = useState(1);

  let productsPerPage = 10;
  let isHomePage = true;
  if (currentURL.includes("/category") || currentURL.includes("/products")) {
    productsPerPage = 20;
    isHomePage = false;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const maxDisplayedPages = 5;
  let startPage = Math.max(currentPage - Math.floor(maxDisplayedPages / 2), 1);
  let endPage = startPage + maxDisplayedPages - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxDisplayedPages + 1, 1);
  }

  if (status === STATUS.ERROR) return <Error />;
  if (status === STATUS.LOADING) return <Loader />;

  const handleViewProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (!isFirstPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  const noProductFound = <h4 className="empty-products">No products found!</h4>;

  return (
    <div className="grid wide" id="productList">
      {products.length === 0 ? (
        noProductFound
      ) : (
        <>
          <h1 className="title">{products[0] && "Our Products"}</h1>
          <div className="row row-formated">
            {currentProducts.map((product) => (
              <Link
                key={product.id}
                className="c-2-4 product-section"
                onClick={(e) => {
                  e.preventDefault();
                  handleViewProductDetails(product.id);
                }}
              >
                <div className="product-banner">{product.category.name}</div>
                <div className="product--image-section">
                  <img
                    src={product.images[0]}
                    alt="Alternate Image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg";
                    }}
                    className="product--image"
                  />
                </div>
                <h6 className="product--name">{product.title}</h6>
              </Link>
            ))}
            {!isHomePage && (
              <div className="pagination">
                <Button
                  variant="secondary"
                  disabled={isFirstPage}
                  onClick={handlePreviousPage}
                  style={{marginRight:"1%"}}
                >
                  Previous
                </Button>
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                  <Button
                    key={startPage + index}
                    variant={
                      startPage + index === currentPage ? "warning" : "primary"
                    }
                    style={{margin:"0 1%"}}
                    onClick={() => handlePageClick(startPage + index)}
                  >
                    {startPage + index}
                  </Button>
                ))}
                <Button
                  variant="secondary"
                  disabled={isLastPage}
                  onClick={handleNextPage}
                  style={{marginLeft:"1%"}}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
          {isHomePage && (
            <Link to="/products">
              <Button
                style={{
                  marginBottom: "24px",
                  marginTop: "12px",
                }}
              >
                Show All Products
              </Button>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
