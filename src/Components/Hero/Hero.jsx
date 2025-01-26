import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./Hero.css";
import TopSellingProduct from "../TopSellingProducts/TopSellingProduct";

// Sample products data
const products = [
  {
    id: 1,
    name: "Product 1",
    price: "Rs.50",
    rating: 4.5,
    image: "https://i.ibb.co/kgQY3dT/bat-png.png",
  },
  {
    id: 2,
    name: "Product 2",
    price: "Rs.75",
    rating: 4.6,
    image: "https://i.ibb.co/kgQY3dT/bat-png.png",
  },
  {
    id: 3,
    name: "Product 3",
    price: "Rs.60",
    rating: 4.3,
    image: "https://i.ibb.co/kgQY3dT/bat-png.png",
  },
  {
    id: 4,
    name: "Product 4",
    price: "Rs.50",
    rating: 4.5,
    image: "https://i.ibb.co/kgQY3dT/bat-png.png",
  },
  {
    id: 5,
    name: "Product 5",
    price: "Rs.75",
    rating: 4.6,
    image: "https://i.ibb.co/kgQY3dT/bat-png.png",
  },
  {
    id: 6,
    name: "Product 6",
    price: "Rs.60",
    rating: 4.3,
    image: "https://i.ibb.co/kgQY3dT/bat-png.png",
  },
  {
    id: 7,
    name: "Product 7",
    price: "Rs.50",
    rating: 4.5,
    image: "https://i.ibb.co/kgQY3dT/bat-png.png",
  },
  {
    id: 8,
    name: "Product 8",
    price: "Rs.75",
    rating: 4.6,
    image: "https://i.ibb.co/kgQY3dT/bat-png.png",
  },
  {
    id: 9,
    name: "Product 9",
    price: "Rs.60",
    rating: 4.3,
    image: "https://i.ibb.co/kgQY3dT/bat-png.png",
  },
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const [cart, setCart] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  const zoomAnimation = useSpring({
    from: { transform: "scale(1)" },
    to: { transform: "scale(1.1)" },
    config: { duration: 2000 },
    reset: true,
  });

  return (
    <div className="hero container" id="home">
      {showMessage && (
        <div className="cart-message">Added to cart successfully!</div>
      )}
      {/* Centered Product Section */}
      <div className="centered-product-container">
        <div className="rotating-circle">
          <div className="circle-content">
            <div className="top-left-text">
              <h1>
                <span className="highlight">UNLOCK</span> YOUR <br />
                FULL POTENTIAL
              </h1>
            </div>
            <animated.img
              style={zoomAnimation}
              src={products[currentIndex % products.length].image}
              alt={products[currentIndex % products.length].name}
              className="zoom-product-image"
            />
            <div className="bottom-right-text">
              <h1>
                WITH <span className="highlight">ELITE</span> <br />
                SPORTS EQUIPMENT
              </h1>
            </div>
          </div>
        </div>
        <button className="cta-button">Get Your Gear Today</button>
      </div>

      <TopSellingProduct products={products} />
    </div>
  );
}

export default Hero;
