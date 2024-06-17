"use client";
import { Dproducts } from "@/data/Dproducts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";


const ProductsSlider = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  const products = Dproducts;
  var settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    autoplay: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          padding: "10px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="" data-aos="zoom-in">
      <div className=" slider-container bg-white text-black py-16 w-full max-w-[1440px] mx-auto">
        <Slider {...settings}>
          {products.map((product, index) => (
            <div key={index} className="mb-4 w-full">
              <img
                src={product.url}
                alt={product.name}
                className="h-20 mx-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductsSlider;
