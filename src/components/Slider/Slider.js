import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import SliderImage1 from "../../assets/images/slider-img-1.png";
import SliderImage2 from "../../assets/images/slider-img-2.png";
import SliderImage3 from "../../assets/images/slider-img-3.png";
import { Button } from "react-bootstrap";
const Slider = () => {
  return (
    <Carousel interval={3000}>
      <Carousel.Item>
        <img className="d-block w-100" src={SliderImage1} alt="First slide" />
        <Carousel.Caption>
          <h3>First New Information</h3>
          <p>Nepal's largest premium electronics brand.</p>
          <Button>Shop Now</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={SliderImage2} alt="Second slide" />

        <Carousel.Caption>
          <h3>Second New Information</h3>
          <p>We deliver happiness & surprises everyday.</p>
          <Button>Shop Now</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={SliderImage3} alt="Third slide" />

        <Carousel.Caption>
          <h3>Third New Information</h3>
          <p>Better home applicants.</p>
          <Button>Shop Now</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
