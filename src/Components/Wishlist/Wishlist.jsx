import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Wishlist.css";
import ProductsApiHelper from "../../Scripts/ProductsApiHelper";

// Star Rating Component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <FaStar key={`full-${index}`} color="#ffd700" />
        ))}

      {halfStar && <FaStarHalfAlt key="half" color="#ffd700" />}

      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <FaStar key={`empty-${index}`} color="#ccc" />
        ))}
    </div>
  );
};

const Wishlist = ({ reload }) => {
  const [wishlist, setWishlist] = useState([
    { id: 1, name: 'Proflex bat', image: "https://i.ibb.co/kgQY3dT/bat-png.png", price: 'Rs.1000', rating: 4.5 },
    { id: 2, name: 'Junior Cricket Bat', image: "https://i.ibb.co/kgQY3dT/bat-png.png", price: 'Rs.1000', rating: 5 },
    { id: 3, name: 'Proflex bat', image: "https://i.ibb.co/kgQY3dT/bat-png.png", price: 'Rs.1000', rating: 3.5 },
    { id: 4, name: 'Proflex bat', image: "https://i.ibb.co/kgQY3dT/bat-png.png", price: 'Rs.1000', rating: 4 },
    {
      id: 1,
      productName: "Proflex bat",
      imageUrl: "https://i.ibb.co/kgQY3dT/bat-png.png",
      price: "Rs.1000",
      rating: 4.5,
    },
  ]);

  useEffect(() => {
    const getWishListItems = async () => {
      let products = await ProductsApiHelper.getWishListProducts();
      setWishlist(products);
    };
    getWishListItems();
  }, [reload]);

  const [cart, setCart] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddRemoveToCart = (productId) => {
    if (cart.includes(productId)) {
      setCart(cart.filter((id) => id !== productId)); // Remove from cart
      setSuccessMessage("Item removed from cart successfully!");
    } else {
      setCart([...cart, productId]); // Add to cart
      setSuccessMessage("Item added to cart successfully!");
    }

    // Hide the message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="wishlist-container">
      <h1>Your Wishlist</h1>
      <div className="wishlist-grid">
        {wishlist.map((product, index) => (
          <div
            key={product.id}
            className={`wishlist-item ${
              index % 2 === 0 ? "wishlist-even" : "wishlist-odd"
            }`}
            style={{
              backgroundColor: index % 2 === 0 ? "#8EE8C4" : "#aded9e",
            }}
          >
            <div className="wishlist-image-container">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.imageUrl}
                  alt={product.productName}
                  className="wishlist-product-image"
                />
              </Link>
              <div
                className="wishlist-cart-icon"
                onClick={() => handleAddRemoveToCart(product.id)} // Toggle cart
              >
                <img
                  src={
                    cart.includes(product.id)
                      ? "https://i.ibb.co/sP3zZKF/cart-icon-4.png" // Remove icon
                      : "https://i.ibb.co/5YpSzCP/cart-icon-1.png" // Add icon
                  }
                  alt="Cart Icon"
                  className="cart-icon-image"
                />
              </div>
            </div>
            <div className="wishlist-product-info">
              <h3>{product.productName}</h3>
              <p>{product.price}</p>
              <StarRating rating={product.rating} />
            </div>
          </div>
        ))}
      </div>

      {/* Display Success Message */}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default Wishlist;
