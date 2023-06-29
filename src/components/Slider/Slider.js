import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import SliderImage1 from "../../assets/images/slider-img-1.png";
import SliderImage2 from "../../assets/images/slider-img-2.png";
import SliderImage3 from "../../assets/images/slider-img-3.png";
import SliderImage4 from "../../assets/images/slider-img-4.png";
import SliderImage5 from "../../assets/images/slider-img-5.png";
import { Button } from "react-bootstrap";
const Slider = () => {
  const handleScrollToBody = () => {
    const getProductsList = document.getElementById('productList')
    const productsListOffset = getProductsList.offsetTop;
    window.scrollTo({
      top: productsListOffset,
      behavior: 'smooth'
    })
  };
  return (
    <Carousel interval={3000} style={{ height: "85vh" }}>
      <Carousel.Item className="carousel-item">
        <img
          className="d-block w-100"
          src={SliderImage1}
          alt="First slide"
          style={{ height: "85vh" }}
        />
        <Carousel.Caption>
          <h3>First New Information</h3>
          <p>Nepal's largest premium electronics brand.</p>
          <Button onClick={handleScrollToBody}
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
      <Carousel.Item className="carousel-item">
        <img
          className="d-block w-100"
          src={SliderImage2}
          alt="Second slide"
          style={{ height: "85vh" }}
        />
        <Carousel.Caption>
          <h3>Second New Information</h3>
          <p>We deliver happiness & surprises everyday.</p>
          <Button onClick={handleScrollToBody}
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
      <Carousel.Item className="carousel-item">
        <img
          className="d-block w-100"
          src={SliderImage3}
          alt="Third slide"
          style={{ height: "85vh" }}
        />
        <Carousel.Caption>
          <h3>Third New Information</h3>
          <p>Better home applicants.</p>
          <Button onClick={handleScrollToBody}
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
      <Carousel.Item className="carousel-item">
        <img
          className="d-block w-100"
          src={SliderImage4}
          alt="Third slide"
          style={{ height: "85vh" }}
        />
        <Carousel.Caption>
          <h3>Fourth New Information</h3>
          <p>Better home applicants.</p>
          <Button onClick={handleScrollToBody}
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
      <Carousel.Item className="carousel-item">
        <img
          className="d-block w-100"
          src={SliderImage5}
          alt="Third slide"
          style={{ height: "85vh" }}
        />
        <Carousel.Caption>
          <h3>Fifth New Information</h3>
          <p>Better home applicants.</p>
          <Button onClick={handleScrollToBody}
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
    </Carousel>
  );
};

export default Slider;
