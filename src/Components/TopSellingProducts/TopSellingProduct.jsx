import { useEffect, useState } from "react";
import "./TopSellingProduct.css";
import {
  FaArrowLeft,
  FaArrowRight,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import evenaddicon from "../../Assets/Images/cart icon 1.png";
import evensubicon from "../../Assets/Images/cart icon 4.png";
import oddaddicon from "../../Assets/Images/cart icon 2.png";
import oddsubicon from "../../Assets/Images/cart icon 3.png";

const TopSellingProduct = ({ products = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const [cart, setCart] = useState([]);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleAddToCart = (productId) => {
    console.log("productId:", productId);
    if (cart.includes(productId)) {
      // Remove product from cart if it already exists (toggle off)
      setCart(cart.filter((id) => id !== productId));
    } else {
      // Add product to cart if it doesn't exist (toggle on)
      setCart([...cart, productId]);
      showPopupMessage();
    }
  };

  const showPopupMessage = () => {
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000); // Hide message after 2 seconds
  };
  const currentProducts = products.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const handleNext = () => {
    if (currentIndex + itemsPerPage < products.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    } else {
      setCurrentIndex(0); // Loop back to the beginning
    }
  };

  const handlePrevious = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <div className="top-selling-container">
      {showMessage && (
        <div className="cart-message">Added to cart successfully!</div>
      )}
      <h2 className="section-heading">Top Selling Products</h2>
      <div className="product-carousel-wrapper">
        <FaArrowLeft
          className="nav-arrow left-arrow-icon"
          onClick={handlePrevious}
        />
        <div className="top-product-grid">
          {currentProducts.map((product, index) => (
            <div
              key={product.id}
              className={`product-item ${
                index % 2 === 0 ? "even-item" : "odd-item"
              }`}
            >
              <div className="product-image-container">
                <img src={product.image} alt={product.name} />
                <div
                  className="cart-icon"
                  onClick={() => handleAddToCart(product.id)}
                >
                  <img
                    src={
                      cart.includes(product.id)
                        ? index % 2 === 0
                          ? "https://i.ibb.co/sP3zZKF/cart-icon-4.png"
                          : "https://i.ibb.co/nLj2jpY/cart-icon-3.png"
                        : index % 2 === 0
                        ? "https://i.ibb.co/5YpSzCP/cart-icon-1.png"
                        : "https://i.ibb.co/5Wfff3K/cart-icon-2.png"
                        
                    }
                    alt="Cart Icon"
                    className="cart-icon-image"
                  />
                </div>
              </div>
              <div className="product-details">
                <p className="product-name">{product.name}</p>
                <p className="product-price">{product.price}</p>
                <div className="rating">
                  {Array.from({ length: 5 }, (_, i) => {
                    if (i < Math.floor(product.rating)) {
                      return <FaStar key={i} className="star-icon filled" />;
                    } else if (
                      i < product.rating &&
                      i === Math.floor(product.rating)
                    ) {
                      return (
                        <FaStarHalfAlt key={i} className="star-icon filled" />
                      );
                    } else {
                      return <FaStar key={i} className="star-icon outlined" />;
                    }
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        <FaArrowRight
          className="nav-arrow right-arrow-icon"
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default TopSellingProduct;
