import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Slider.scss";
import { SliderImages } from "../../assets/images/index";
const Slider = () => {
  return (
    <Carousel
      interval={3000}
      wipe
    >
      {SliderImages.map((image) => (
        <Carousel.Item className="carousel-item">
          <img
            className="d-block w-100"
            src={image}
            alt="First slide"
            style={{ height: "100%", maxHeight: "80vh" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Slider;
