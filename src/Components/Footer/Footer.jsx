import React, { useState } from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; // Social icons
import { useLocation, Link } from "react-router-dom"; // Import Link from react-router-dom

const Footer = () => {
  const location = useLocation();
  const pagesNotToRenderFooter = ["/signin"];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Add state for dropdown visibility
  
  // Toggle dropdown visibility
  const handleDropdownToggle = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return pagesNotToRenderFooter.includes(location.pathname) ? (
    <></>
  ) : (
    <footer className="footer-container">
      {/* Blogs Section */}
      <div className="footer-blogs">
        <h1>BLOGS</h1>
        <a
          href="https://www.linkedin.com/pulse/gukesh-dommaraju-young-chess-prodigy-who-redefining-excellence-z5pge?utm_source=share&utm_medium=member_android&utm_campaign=share_via"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://i.ibb.co/CJkfBhY/blog1.jpg"
            alt="Blog"
            className="blog-image"
          />
        </a>
        <p className="blog-subtext">Be Curious, Be Passionate</p>

        {/* Explore More Button */}
        <button className="explore-more-btn" onClick={handleDropdownToggle}>
          {isDropdownOpen ? "Show Less" : "Explore More"}
        </button>

        {/* Dropdown List */}
        {isDropdownOpen && (
          <div className="blog-dropdown">
            <ul>
              <li>
                <a
                  href="https://www.linkedin.com/pulse/santhi-soundarajan-from-struggles-triumph-journey-hard-z16fc?utm_source=share&utm_medium=member_android&utm_campaign=share_via"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Santhi Soundarajan: From Struggles to Triumph
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/pulse/pel%C3%A9s-journey-from-poverty-greatness-inspiration-kids-fitnsport-app-q7cdc?utm_source=share&utm_medium=member_android&utm_campaign=share_via"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pelé's Journey from Poverty to Greatness
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/pulse/celebrating-yusuf-pathan-journey-hard-work-dedication-inspiration-fmy5c?utm_source=share&utm_medium=member_android&utm_campaign=share_via"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Celebrating Yusuf Pathan: Hard Work & Dedication
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Links Section */}
      <div className="footer-links">
        <Link to="/">HOME</Link>
        <Link to="/cricket">PRODUCT</Link>
        <Link to="/how-to-choose-sport">ABOUT US</Link>
        <Link to="/faq">SUPPORT</Link>
        {/* External link for BLOG */}
        <a
          href="https://www.linkedin.com/pulse/santhi-soundarajan-from-struggles-triumph-journey-hard-z16fc?utm_source=share&utm_medium=member_android&utm_campaign=share_via"
          target="_blank"
          rel="noopener noreferrer"
        >
          BLOG
        </a>
        <Link to="/contactus">CONTACT US</Link>
      </div>

      {/* Subscription Section */}
      <div className="footer-subscription">
        <input type="email" placeholder="EMAIL ID" className="email-input" />
      </div>

      {/* Footer Logo */}
      <div className="footer-logo">FITNSPORTZ</div>

      {/* Social Icons */}
      <div className="footer-icons">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
