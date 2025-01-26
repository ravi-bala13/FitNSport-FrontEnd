import React from "react";
import "./Footer.css";
import blogImage from "../../Assets/Images/blog1.jpg"; // Update this path as needed
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa"; // Social icons
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const pagesNotToRenderFooter = ["/signin"];
  return pagesNotToRenderFooter.includes(location.pathname) ? (
    <></>
  ) : (
    <footer className="footer-container">
      {/* Blogs Section */}
      <div className="footer-blogs">
        <h1>BLOGS</h1>
        <img src="https://i.ibb.co/CJkfBhY/blog1.jpg" alt="Blog" className="blog-image" />
        <p className="blog-subtext">Be Curious, Be Passionate</p>
      </div>

      {/* Links Section */}
      <div className="footer-links">
        <a href="/home">HOME</a>
        <a href="/products">PRODUCT</a>
        <a href="/about">ABOUT US</a>
        <a href="/support">SUPPORT</a>
        <a href="/blog">BLOG</a>
        <a href="/contact">CONTACT US</a>
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
