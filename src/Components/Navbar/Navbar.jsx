import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./Navbar.css";
import { FiMenu } from "react-icons/fi";
import addtocarticon from "../../Assets/Images/addtocart.png";
import logo from "../../Assets/Images/LOGO-transparent1.png";
import signinicon from "../../Assets/Images/signin-icon.png";
import { UserStatusContext } from "../../Scripts/AppContainer";
import User from "../../Scripts/User";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useContext(UserStatusContext);
  const [cartCount, setCartCount] = useState(0); // State for cart count
  const navigate = useNavigate();

  // Initialize the cart count from localStorage or any backend service
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  }, []);

  // Handle cart item updates (optional, if items are dynamically added)
  const handleAddToCart = (item) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...storedCart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.length);
  };

  const handleMenuToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("access-token");
  };

  const handleAddToCartClick = () => {
    navigate("/cart"); // Navigate to CartPage when "Add to Cart" icon is clicked
  };

  return (
    <nav className="navbar">
      <div className="left-bar">
        <div className="logo">
          <Link to="/">
            <img
              src={"https://i.ibb.co/2KgM1X7/LOGO-transparent1.png"}
              alt="Logo"
            />
          </Link>
        </div>
      </div>
      <div className="right-bar">
        <div className="signin-icon">
          <Link to={isLoggedIn ? "/" : "/signin"}>
            <img src="https://i.ibb.co/JkptQRR/signin-icon.png" alt="Sign In" />
          </Link>
          {isLoggedIn && (
            <div className="profile-name">{User.getUserName()}</div>
          )}
        </div>
        <div className="addtocart-icon" onClick={handleAddToCartClick}>
          <img src="https://i.ibb.co/z2t0mKX/addtocart.png" alt="Add to Cart" />
          {cartCount > 0 && (
            <span className="cart-count-badge">{cartCount}</span>
          )}
        </div>
        <div className="menu-icon">
          <FiMenu onClick={handleMenuToggle} />
        </div>
      </div>

      {showDropdown && (
        <div className="dropdown-container" onMouseLeave={handleMenuToggle}>
          <div className="dropdown-section">
            ACCOUNT
            <div className="sub-dropdown-menu">
              <Link to="/myprofile">My Profile</Link>
              <Link to="/myorders">My Orders</Link>
              <Link to="/mywishlist">My Wishlist</Link>
              {isLoggedIn ? (
                <Link onClick={handleLogOut} to="/">
                  Logout
                </Link>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="dropdown-section">
            PRODUCTS
            <div className="sub-dropdown-menu">
              <Link to="/cricket">Cricket</Link>
              <Link to="/basketball">Basketball</Link>
              <Link to="/football">Football</Link>
              <Link to="/badminton">Badminton</Link>
              <Link to="/volleyball">Volleyball</Link>
              <Link to="/tennis">Tennis</Link>
              <Link to="/table-tennis">Table Tennis</Link>
            </div>
          </div>
          <div className="dropdown-section">
            HELP
            <div className="sub-dropdown-menu">
              <Link to="/contactus">Contact Us</Link>
              <Link to="/termsconditions">Terms & Conditions</Link>
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/warranty">Warranty Policy</Link>
              <Link to="/faq">FAQ</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
