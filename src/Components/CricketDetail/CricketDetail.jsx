import React, { useState, useEffect } from "react"; // Ensure useEffect is imported here
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Import star icons
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import "./CricketDetail.css";
import apiCaller from "../../Scripts/ApiCaller";
import ProductsApiHelper from "../../Scripts/ProductsApiHelper";

const CricketBatDetails = () => {
  const relatedProducts = [
    {
      id: 1,
      name: "ProFlex Ball",
      price: "Rs. 500",
      imageUrl: "https://i.ibb.co/kgQY3dT/bat-png.png",
    },
    {
      id: 2,
      name: "ProFlex Gloves",
      price: "Rs. 1200",
      imageUrl: "https://i.ibb.co/kgQY3dT/bat-png.png",
    },
    {
      id: 3,
      name: "ProFlex Pads",
      price: "Rs. 1500",
      imageUrl: "https://i.ibb.co/kgQY3dT/bat-png.png",
    },
    {
      id: 4,
      name: "ProFlex Helmet",
      price: "Rs. 2500",
      imageUrl: "https://i.ibb.co/kgQY3dT/bat-png.png",
    },
  ];

  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const productSizes = [1, 2, 3, 4, 5, 6, "H", "SH", "LH"];

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await apiCaller(
          "get",
          `/api/products/getProductDetails/${productId}`
        );
        if (response && response.message === "success") {
          let product = response.results;
          setProduct(product);
        } else {
          console.log("response.message:", response);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    getProductDetails();
  }, []);

  const handleAddToWishlist = () => {
    const wishlistItem = {
      productName,
      price,
      imageUrl,
      size: productId, // You can use productId or other details as needed
    };

    // Get the current wishlist from localStorage
    const currentWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Add the new item to the wishlist
    currentWishlist.push(wishlistItem);

    // Save the updated wishlist back to localStorage
    localStorage.setItem("wishlist", JSON.stringify(currentWishlist));

    setWishlistMessage("Added to Wishlist");
    setTimeout(() => setWishlistMessage(""), 3000);
  };

  const handleAddToCart = async () => {
    setCartMessage("Added to Cart Successfully");
    setTimeout(() => setCartMessage(""), 3000);

    ProductsApiHelper.handleAddToCart(product);
  };

  // if (loading) return <div className="loading">Loading...</div>;
  // if (error) return <div className="error">Error: {error}</div>;

  const {
    productName,
    preciseDescription,
    enhancedDescription,
    price,
    imageUrl,
    specifications = [],
  } = product;

  return (
    <div className="product-detail-page">
      {wishlistMessage && (
        <div className="popup-message">{wishlistMessage}</div>
      )}
      {cartMessage && <div className="popup-message">{cartMessage}</div>}

      <header className="product-header">
        <img
          src={product.imageUrl}
          alt={productName}
          className="product-image"
        />
        <div className="product-info">
          <h1>{productName}</h1>
          <p>{preciseDescription}</p>
          <div className="product-price">Price: Rs. {price}</div>
          <div className="rating">
            {Array.from({ length: 5 }, (_, i) =>
              i < 4.5 ? (
                <FaStar key={i} className="star-icon filled" />
              ) : (
                <FaStarHalfAlt key={i} className="star-icon filled" />
              )
            )}
          </div>
          <div className="product-controls">
            <div className="quantity-selector">
              <button
                className="minus-btn"
                onClick={() => setQuantity(Math.max(quantity - 1, 1))}
              >
                -
              </button>
              <div>{quantity}</div>
              <button
                className="plus-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <div className="size-selector">
              {productSizes.map((e) => (
                <div className="product-sizes">{e}</div>
              ))}
            </div>

            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="add-to-wishlist" onClick={handleAddToWishlist}>
              Add to Wishlist
            </button>
          </div>
        </div>
      </header>

      <section className="product-description">
        <h3>Description</h3>
        <p>{enhancedDescription}</p>

        <h3>Specifications</h3>
        {specifications.map((spec, index) => (
          <div key={index}>
            <h4>{spec.heading}</h4>
            <ul>
              {spec.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="related-products">
        <h3>Related Products</h3>
        <div className="related-products-list">
          {relatedProducts.map((product) => (
            <div key={product.id} className="related-product">
              <img src={product.imageUrl} alt={product.name} />
              <div className="product-info">
                <h4>{product.name}</h4>
                <p>{product.price}</p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CricketBatDetails;
