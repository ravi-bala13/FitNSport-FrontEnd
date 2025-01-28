import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Hero.css";
import TopSellingProduct from "../TopSellingProducts/TopSellingProduct";

// Sample products data
const products = [
  {
    id: 1,
    name: "Proflex Cricket Bat",
    price: "Rs.500/-",
    rating: 4.5,
    image: "https://i.ibb.co/kgQY3dT/bat-png.png",
  },
  {
    id: 2,
    name: "Lightweight Cricket Bat",
    price: "Rs.750/-",
    rating: 4.6,
    image: "https://i.ibb.co/kgQY3dT/bat-png.png",
  },
  {
    id: 3,
    name: "Stitched Ball Bat",
    price: "Rs.1000/-",
    rating: 4.3,
    image: "https://i.ibb.co/kgQY3dT/bat-png.png",
  },
  {
    id: 4,
    name: "Gully Kashmir Willow Scoop Bat",
    price: "Rs.1500/-",
    rating: 4.5,
    image: "https://i.ibb.co/kgQY3dT/bat-png.png",
  },
  {
    id: 5,
    name: "Proflex Teen Bat",
    price: "Rs.1750/-",
    rating: 4.6,
    image: "https://i.ibb.co/kgQY3dT/bat-png.png",
  },
  {
    id: 6,
    name: "Premium Kashmir Willow Bat",
    price: "Rs.2000/-",
    rating: 4.3,
    image: "https://i.ibb.co/kgQY3dT/bat-png.png",
  },
  {
    id: 7,
    name: "Teen Stiched Ball Bat",
    price: "Rs.2500/-",
    rating: 4.5,
    image: "https://i.ibb.co/kgQY3dT/bat-png.png",
  },
  {
    id: 8,
    name: "Premium Kashmiri Willow Short Handle Bat",
    price: "Rs.3000/-",
    rating: 4.6,
    image: "https://i.ibb.co/kgQY3dT/bat-png.png",
  },
  {
    id: 9,
    name: "Gully Kashmir Willow Long Handle Bat",
    price: "Rs.4000/-",
    rating: 4.3,
    image: "https://i.ibb.co/kgQY3dT/bat-png.png",
  },
];

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const zoomAnimation = useSpring({
    from: { transform: "scale(1)" },
    to: { transform: "scale(1.1)" },
    config: { duration: 2000 },
    reset: true,
  });

  const handleNavigate = () => {
    navigate("/cricket"); // Navigate to CricketProduct page
  };

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
        <button className="cta-button" onClick={handleNavigate}>
          Get Your Gear Today
        </button>
      </div>

      <TopSellingProduct products={products} />
    </div>
  );
}

export default Hero;
