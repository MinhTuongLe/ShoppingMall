import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { STATUS } from "../../utils/status";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import "./ProductList.scss";
import { formatCurrency } from "../../utils/formatCurrency";
import { useDispatch } from "react-redux";
import { fetchProductById } from "../../redux/ProductDetailsSlice";

const ProductList = ({ products, status }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentURL = window.location.href;
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState("latest");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = sortedProducts.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );
    setFilteredProducts(filtered);
  }, [minPrice, maxPrice, sortedProducts]);

  useEffect(() => {
    if (sort === "latest") {
      setSortedProducts([...products]);
    } else {
      const sorted = [...products];
      if (sort === "lowest-price") {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sort === "highest-price") {
        sorted.sort((a, b) => b.price - a.price);
      } else if (sort === "a-z") {
        sorted.sort((a, b) =>
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        );
      } else if (sort === "z-a") {
        sorted.sort((a, b) =>
          b.title.toLowerCase().localeCompare(a.title.toLowerCase())
        );
      }
      setSortedProducts(sorted);
    }
  }, [sort, products]);

  useEffect(() => {
    const maxProductPrice = Math.max(
      ...products.map((product) => product.price)
    );
    setMaxPrice(maxProductPrice);
  }, [products]);

  let productsPerPage = 10;
  let isHomePage = true;
  if (currentURL.includes("/category") || currentURL.includes("/products")) {
    productsPerPage = 20;
    isHomePage = false;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
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
    navigate(`/products/${productId}`);
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

  const handleClearFilter = () => {
    setMinPrice(0);
    setMaxPrice(1000);
  };

  const noProductFound = (
    <div className="grid wide">
      <h4 className="empty-products">No products found!</h4>
    </div>
  );

  return (
    <div className="grid wide" id="productList">
      {products.length === 0 ? (
        noProductFound
      ) : (
        <>
          <div className="products-heading">
            <h1 className="title">{products[0] && "Our Products"}</h1>
            {!isHomePage && (
              <div className="configure-section">
                <div className="price-range-section">
                  <label>Price Range:</label>
                  <div className="filter-section">
                    <div className="filter-input-section">
                      {formatCurrency(minPrice)}
                      <input
                        style={{ marginLeft: "12px" }}
                        type="range"
                        value={minPrice}
                        min={0}
                        max={1000}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                      />
                    </div>
                    <div className="filter-input-section">
                      {formatCurrency(maxPrice)}
                      <input
                        style={{ marginLeft: "12px" }}
                        type="range"
                        value={maxPrice}
                        min={0}
                        max={1000}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <Button className="button-clear" onClick={handleClearFilter}>
                    Clear
                  </Button>
                </div>
                <div className="sort-section">
                  <label>Sort by:</label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="latest">Latest</option>
                    <option value="lowest-price">Lowest Price</option>
                    <option value="highest-price">Highest Price</option>
                    <option value="a-z">A - Z</option>
                    <option value="z-a">Z - A</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="row row-formated">
            {currentProducts.map((product) => (
              <Link
                key={product.id}
                className="c-2-4 product-section xl-3 lg-4 md-6 sm-6"
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
                <p className="product--name">{product.title}</p>
              </Link>
            ))}
            {!isHomePage && (
              <div className="pagination">
                <span
                  className="button-navigate"
                  style={{ color: isFirstPage ? "#ccc" : "" }}
                  disabled={isFirstPage}
                  onClick={handlePreviousPage}
                >
                  <i class="fa-solid fa-caret-left"></i>
                </span>

                {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                  <span
                    key={startPage + index}
                    className={`button-page-number ${
                      startPage + index === currentPage ? "page-active" : ""
                    }`}
                    onClick={() => handlePageClick(startPage + index)}
                  >
                    {startPage + index}
                  </span>
                ))}
                <span
                  className="button-navigate"
                  style={{ color: isLastPage ? "#ccc" : "" }}
                  disabled={isLastPage}
                  onClick={handleNextPage}
                >
                  <i class="fa-solid fa-caret-right"></i>
                </span>
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
                Show All
              </Button>
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
