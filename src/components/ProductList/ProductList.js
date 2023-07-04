import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { STATUS } from "../../utils/status";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import "./ProductList.scss";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";

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
        sorted.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sort === "z-a") {
        sorted.sort((a, b) => b.title.localeCompare(a.title));
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

  const handleClearFilter = () => {
    setMinPrice(0)
    setMaxPrice(1000)
  }

  const noProductFound = <h4 className="empty-products">No products found!</h4>;

  return (
    <div className="grid wide" id="productList">
      {products.length === 0 ? (
        noProductFound
      ) : (
        <>
          <div className="products-heading">
            <h1 className="title">{products[0] && "Our Products"}</h1>
            {!isHomePage && (
              <>
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
                  <Button style={{marginLeft:"18px"}} onClick={handleClearFilter}>Clear Filter</Button>
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
              </>
            )}
          </div>
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
                  style={{ marginRight: "1%" }}
                >
                  Previous
                </Button>
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                  <Button
                    key={startPage + index}
                    variant={
                      startPage + index === currentPage ? "warning" : "primary"
                    }
                    style={{ margin: "0 1%" }}
                    onClick={() => handlePageClick(startPage + index)}
                  >
                    {startPage + index}
                  </Button>
                ))}
                <Button
                  variant="secondary"
                  disabled={isLastPage}
                  onClick={handleNextPage}
                  style={{ marginLeft: "1%" }}
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
