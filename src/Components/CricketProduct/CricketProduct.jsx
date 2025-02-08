import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa"; // Importing necessary icons
import { Link } from "react-router-dom"; // Importing Link for routing
import "./CricketProduct.css";
import ProductsApiHelper from "../../Scripts/ProductsApiHelper";

function CricketProduct() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([
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
  ]);

  useEffect(() => {
    const getAllProducts = async () => {
      setIsLoading(true);
      let products = await ProductsApiHelper.getAllProducts();
      setProducts(products);
      setIsLoading(false);
    };
    getAllProducts();
  }, []);

  const productsPerPage = 8;

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Get the products to display on the current page
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Handlers for pagination buttons
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Helper function to render star ratings
  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    console.log("fullStars:", fullStars);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    console.log("halfStar:", halfStar);
    const emptyStars = 5 - fullStars - halfStar;
    console.log("emptyStars:", emptyStars);

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <FaStar key={`full-${index}`} className="star-icon filled" />
          ))}
        {halfStar ? (
          <FaStarHalfAlt key="half" className="star-icon half-filled" />
        ) : null}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <FaStar key={`empty-${index}`} className="star-icon empty" />
          ))}
      </>
    );
  };

  return (
    <div className="product-grid">
      <h1>CRICKET PRODUCTS</h1>
      <div className="grid-container">
        <div className="grid-items">
          {currentProducts.map((product) => (
            <div key={product.id} className="grid-item">
              <div className="product-card">
                {isLoading ? (
                  <div className="loading-mask">
                    <div className="loading-bar"></div>
                  </div>
                ) : (
                  <>
                    <Link to={`/products/${product.id}`}>
                      <img src={product.imageUrl} alt={product.productName} />
                      <div className="prod-description">
                        <h3>{product.productName}</h3>
                        <p>Rs. {product.price}</p>
                        <div className="rating">
                          {renderRating(product.rating)}
                        </div>
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pagination">
        <div className="arrows">
          <FaArrowLeft
            className={`arrow ${currentPage === 1 ? "disabled" : ""}`}
            onClick={handlePrev}
            disabled={currentPage === 1}
          />
          <FaArrowRight
            className={`arrow ${currentPage === totalPages ? "disabled" : ""}`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
          />
        </div>
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
}

export default CricketProduct;
