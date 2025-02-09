import { useContext, useEffect, useState } from "react";
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
import ProductsApiHelper from "../../Scripts/ProductsApiHelper";
import { useToast } from "../../Providers/ToastProvider";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { UserStatusContext } from "../../Scripts/AppContainer";

const TopSellingProduct = ({ products = [], heading, callBack = () => {} }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const [cart, setCart] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const { showToast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useContext(UserStatusContext);
  // For Guest user flow
  const generateNumericUUID = () => Date.now().toString();
  const sessionId =
    localStorage.getItem("guest_session_id") || generateNumericUUID();
  localStorage.setItem("guest_session_id", sessionId);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentIndex]);

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

  const handleAddToCart = async (event, product) => {
    event.stopPropagation();
    showToast("Item added to cart!");
    if (isLoggedIn) {
      await ProductsApiHelper.handleAddToCart(product);
    } else {
      await ProductsApiHelper.handleAddToCart(product, false, sessionId);
    }

    callBack();
  };

  return (
    <div className="top-selling-container">
      <h2 className="section-heading">{heading}</h2>
      <div className="product-carousel-wrapper">
        <FaArrowLeft
          className="nav-arrow left-arrow-icon"
          onClick={handlePrevious}
        />
        <div className="top-product-grid">
          {currentProducts.map((product, index) => (
            <div
              key={index}
              className={`product-item ${
                index % 2 === 0 ? "even-item" : "odd-item"
              }`}
            >
              <div className="product-image-container">
                <Link to={`/products/${product.id}`}>
                  <img src={product.imageUrl} alt={product.productName} />
                </Link>
                <div className="add-to-cart-icon">
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
                    className="add-to-cart-icon-image"
                    onClick={(event) => handleAddToCart(event, product)}
                  />
                </div>
              </div>
              <div className="product-details">
                <p className="product-name">{product.productName}</p>
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
