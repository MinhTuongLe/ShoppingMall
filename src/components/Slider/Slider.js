import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { SliderImages } from "../../assets/images/index";
import { Button } from "react-bootstrap";
const Slider = () => {
  const handleScrollToBody = () => {
    const getProductsList = document.getElementById("productList");
    const productsListOffset = getProductsList.offsetTop;
    window.scrollTo({
      top: productsListOffset,
      behavior: "smooth",
    });
  };
  return (
    <Carousel interval={3000} style={{ height: "85vh" }}>
      {SliderImages.map((image) => (
        <Carousel.Item className="carousel-item">
          <img
            className="d-block w-100"
            src={image}
            alt="First slide"
            style={{ height: "85vh" }}
          />
          <Carousel.Caption>
            <h3>First New Information</h3>
            <p>Nepal's largest premium electronics brand.</p>
            <Button
              onClick={handleScrollToBody}
              style={{
                backgroundColor: "#5193b3",
                border: "1px solid #fff",
                marginBottom: "24px",
                marginTop: "12px",
              }}
            >
              Shop Now
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;
