import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Hero.css";
import TopSellingProduct from "../TopSellingProducts/TopSellingProduct";
import ProductsApiHelper from "../../Scripts/ProductsApiHelper";

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [topSellingProducts, setTopSellingProducts] = useState([
    {
      id: 1,
      productName: "Proflex Cricket Bat",
      price: "Rs.500/-",
      rating: 4.5,
      imageUrl: "https://i.ibb.co/kgQY3dT/bat-png.png",
    },
  ]);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const zoomAnimation = useSpring({
    from: { transform: "scale(1)" },
    to: { transform: "scale(1.1)" },
    config: { duration: 2000 },
    reset: true,
  });

  useEffect(() => {
    const getTopSellingProducts = async () => {
      let products = await ProductsApiHelper.getTopSellingProducts();
      setTopSellingProducts(products);
    };
    getTopSellingProducts();
  }, []);

  const handleNavigate = () => {
    navigate("/cricket"); // Navigate to CricketProduct page
  };

  return (
    <div className="hero container" id="home">
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
              src={
                topSellingProducts[currentIndex % topSellingProducts.length]
                  .imageUrl
              }
              alt={
                topSellingProducts[currentIndex % topSellingProducts.length]
                  .name
              }
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
      <TopSellingProduct
        products={topSellingProducts}
        heading={"TOP SELLING PRODUCT"}
      />
    </div>
  );
}

export default Hero;
