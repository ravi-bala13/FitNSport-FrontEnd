import React, { useState, useEffect } from "react"; // Ensure useEffect is imported here
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Import star icons
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom
import "./CricketDetail.css";
import apiCaller from "../../Scripts/ApiCaller";
import ProductsApiHelper from "../../Scripts/ProductsApiHelper";
import TopSellingProduct from "../TopSellingProducts/TopSellingProduct";
import Toast from "../../CommonComponents/Toast/Toast";
import { useToast } from "../../Providers/ToastProvider";

const CricketBatDetails = () => {
  const allProducts = [
    {
      id: 1,
      productName: "Proflex Cricket Bat",
      price: "Rs.500/-",
      rating: 4.5,
      imageUrl: "https://i.ibb.co/kgQY3dT/bat-png.png",
      specifications: [],
      preciseDescription:
        "Lightweight Kashmir willow cricket bat designed for kids aged 4-5 years. Perfect for beginners to start their cricket journey with confidence and comfort.",
      enhancedDescription:
        "Ideal for young cricket enthusiasts aged 4-5 years and 4 ft - 4 ft 3 in tall, this Size 1 cricket bat is crafted from premium Kashmir willow for durability and precision. The lightweight design ensures effortless handling and control, making it the perfect choice for beginners. It features a comfortable grip, making it suitable for friendly games, practice sessions, or fun backyard cricket. Its compact size and sturdy build help budding players develop their batting skills while having fun. Buy now to give your little one the ultimate cricket experience!",
    },
    {
      id: 2,
      productName: "Lightweight Cricket Bat",
      price: "Rs.750/-",
      rating: 4.6,
      imageUrl: "https://i.ibb.co/kgQY3dT/bat-png.png",
      specifications: [],
      preciseDescription:
        "Lightweight Kashmir willow cricket bat designed for kids aged 4-5 years. Perfect for beginners to start their cricket journey with confidence and comfort.",
      enhancedDescription:
        "Ideal for young cricket enthusiasts aged 4-5 years and 4 ft - 4 ft 3 in tall, this Size 1 cricket bat is crafted from premium Kashmir willow for durability and precision. The lightweight design ensures effortless handling and control, making it the perfect choice for beginners. It features a comfortable grip, making it suitable for friendly games, practice sessions, or fun backyard cricket. Its compact size and sturdy build help budding players develop their batting skills while having fun. Buy now to give your little one the ultimate cricket experience!",
    },
    {
      id: 3,
      productName: "Stiched Ball Bat",
      price: "Rs.1000",
      rating: 4.3,
      imageUrl: "https://i.ibb.co/kgQY3dT/bat-png.png",
      specifications: [],
      preciseDescription:
        "Lightweight Kashmir willow cricket bat designed for kids aged 4-5 years. Perfect for beginners to start their cricket journey with confidence and comfort.",
      enhancedDescription:
        "Ideal for young cricket enthusiasts aged 4-5 years and 4 ft - 4 ft 3 in tall, this Size 1 cricket bat is crafted from premium Kashmir willow for durability and precision. The lightweight design ensures effortless handling and control, making it the perfect choice for beginners. It features a comfortable grip, making it suitable for friendly games, practice sessions, or fun backyard cricket. Its compact size and sturdy build help budding players develop their batting skills while having fun. Buy now to give your little one the ultimate cricket experience!",
    },
    {
      id: 4,
      productName: "Gully Kashmir Willow Scoop Bat",
      price: "Rs.1500",
      rating: 4.5,
      imageUrl: "https://i.ibb.co/kgQY3dT/bat-png.png",
      specifications: [],
      preciseDescription:
        "Lightweight Kashmir willow cricket bat designed for kids aged 4-5 years. Perfect for beginners to start their cricket journey with confidence and comfort.",
      enhancedDescription:
        "Ideal for young cricket enthusiasts aged 4-5 years and 4 ft - 4 ft 3 in tall, this Size 1 cricket bat is crafted from premium Kashmir willow for durability and precision. The lightweight design ensures effortless handling and control, making it the perfect choice for beginners. It features a comfortable grip, making it suitable for friendly games, practice sessions, or fun backyard cricket. Its compact size and sturdy build help budding players develop their batting skills while having fun. Buy now to give your little one the ultimate cricket experience!",
    },
    {
      id: 5,
      productName: "Proflex Teen Bat",
      price: "Rs.1750/-",
      rating: 4.6,
      imageUrl: "https://i.ibb.co/kgQY3dT/bat-png.png",
      specifications: [],
      preciseDescription:
        "Lightweight Kashmir willow cricket bat designed for kids aged 4-5 years. Perfect for beginners to start their cricket journey with confidence and comfort.",
      enhancedDescription:
        "Ideal for young cricket enthusiasts aged 4-5 years and 4 ft - 4 ft 3 in tall, this Size 1 cricket bat is crafted from premium Kashmir willow for durability and precision. The lightweight design ensures effortless handling and control, making it the perfect choice for beginners. It features a comfortable grip, making it suitable for friendly games, practice sessions, or fun backyard cricket. Its compact size and sturdy build help budding players develop their batting skills while having fun. Buy now to give your little one the ultimate cricket experience!",
    },
    {
      id: 6,
      productName: "Premium Kashmir Willow Bat",
      price: "Rs.2000/-",
      rating: 4.3,
      imageUrl: "https://i.ibb.co/kgQY3dT/bat-png.png",
      specifications: [],
      preciseDescription:
        "Lightweight Kashmir willow cricket bat designed for kids aged 4-5 years. Perfect for beginners to start their cricket journey with confidence and comfort.",
      enhancedDescription:
        "Ideal for young cricket enthusiasts aged 4-5 years and 4 ft - 4 ft 3 in tall, this Size 1 cricket bat is crafted from premium Kashmir willow for durability and precision. The lightweight design ensures effortless handling and control, making it the perfect choice for beginners. It features a comfortable grip, making it suitable for friendly games, practice sessions, or fun backyard cricket. Its compact size and sturdy build help budding players develop their batting skills while having fun. Buy now to give your little one the ultimate cricket experience!",
    },
    {
      id: 7,
      productName: "Teen Stiched Ball Bat",
      price: "Rs.2500/-",
      rating: 4.5,
      imageUrl: "https://i.ibb.co/kgQY3dT/bat-png.png",
      specifications: [],
      preciseDescription:
        "Lightweight Kashmir willow cricket bat designed for kids aged 4-5 years. Perfect for beginners to start their cricket journey with confidence and comfort.",
      enhancedDescription:
        "Ideal for young cricket enthusiasts aged 4-5 years and 4 ft - 4 ft 3 in tall, this Size 1 cricket bat is crafted from premium Kashmir willow for durability and precision. The lightweight design ensures effortless handling and control, making it the perfect choice for beginners. It features a comfortable grip, making it suitable for friendly games, practice sessions, or fun backyard cricket. Its compact size and sturdy build help budding players develop their batting skills while having fun. Buy now to give your little one the ultimate cricket experience!",
    },
    {
      id: 8,
      productName: "Premium Kashmiri Willow Short Handle Bat",
      price: "Rs.3000/-",
      rating: 4.6,
      imageUrl: "https://i.ibb.co/kgQY3dT/bat-png.png",
      specifications: [],
      preciseDescription:
        "Lightweight Kashmir willow cricket bat designed for kids aged 4-5 years. Perfect for beginners to start their cricket journey with confidence and comfort.",
      enhancedDescription:
        "Ideal for young cricket enthusiasts aged 4-5 years and 4 ft - 4 ft 3 in tall, this Size 1 cricket bat is crafted from premium Kashmir willow for durability and precision. The lightweight design ensures effortless handling and control, making it the perfect choice for beginners. It features a comfortable grip, making it suitable for friendly games, practice sessions, or fun backyard cricket. Its compact size and sturdy build help budding players develop their batting skills while having fun. Buy now to give your little one the ultimate cricket experience!",
    },
    {
      id: 9,
      productName: "Gully Kashmir Willow Long Handle Bat",
      price: "Rs.4000/-",
      rating: 4.3,
      imageUrl: "https://i.ibb.co/kgQY3dT/bat-png.png",
      specifications: [],
      preciseDescription:
        "Lightweight Kashmir willow cricket bat designed for kids aged 4-5 years. Perfect for beginners to start their cricket journey with confidence and comfort.",
      enhancedDescription:
        "Ideal for young cricket enthusiasts aged 4-5 years and 4 ft - 4 ft 3 in tall, this Size 1 cricket bat is crafted from premium Kashmir willow for durability and precision. The lightweight design ensures effortless handling and control, making it the perfect choice for beginners. It features a comfortable grip, making it suitable for friendly games, practice sessions, or fun backyard cricket. Its compact size and sturdy build help budding players develop their batting skills while having fun. Buy now to give your little one the ultimate cricket experience!",
    },
  ];

  const { productId } = useParams();
  const [product, setProduct] = useState({
    size: "SH",
    title: "Premium Kashmiri Willow Short Handle Bat",
    preciseDescription:
      "Professional-grade bat for players aged 15+ years, suitable for heights 5ft 6in - 6ft 1in. Crafted for explosive power and precision.",
    enhancedDescription:
      "Engineered with premium willow for optimal performance in competitive matches and intense practice. Lightweight and durable, ensuring unmatched control.",
    specifications: [
      {
        heading: "Specifications",
        details: [
          "Height: 33 1/2 inches",
          "Width: 4 1/4 inches",
          "Weight: Heavy",
          "Material: Premium Willow",
        ],
      },
      {
        heading: "Additional Features",
        details: [
          "Grip: Ergonomic Grip for Comfortable Handling",
          "Balance: Optimally Balanced for Swift Movements",
          "Power: Designed for Maximum Boundary Shots",
        ],
      },
    ],
    price: "Rs. 3000",
    imageUrl: "https://i.ibb.co/kgQY3dT/bat-png.png",
  });
  // const product = allProducts[productId - 1];
  const [relatedProducts, setRelatedProducts] = useState([product]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlistMessage, setWishlistMessage] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const productSizes = [1, 2, 3, 4, 5, 6, "H", "SH", "LH"];
  const { showToast } = useToast();

  useEffect(() => {
    const getProductDetails = async () => {
      let product = await ProductsApiHelper.getProductDetails(productId);
      setProduct(product);
    };
    getProductDetails();

    const getRelatedProducts = async () => {
      let products = await ProductsApiHelper.getRelatedProducts(productId);
      setRelatedProducts(products);
    };
    getRelatedProducts();
  }, []);

  const handleAddToWishlist = () => {
    const wishlistItem = {
      productName: product.productName,
      price: product.price,
      imageUrl: product.imageUrl,
      size: productId, // You can use productId or other details as needed
    };

    // Get the current wishlist from localStorage
    const currentWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Add the new item to the wishlist
    currentWishlist.push(wishlistItem);

    // Save the updated wishlist back to localStorage
    localStorage.setItem("wishlist", JSON.stringify(currentWishlist));

    showToast("Item added to wishlist!");
  };

  const handleAddToCart = async () => {
    showToast("Item added to cart!");
    ProductsApiHelper.handleAddToCart(product);
  };

  return (
    <div className="product-detail-page">
      {wishlistMessage && (
        <div className="popup-message">{wishlistMessage}</div>
      )}
      {cartMessage && <div className="popup-message">{cartMessage}</div>}

      <header className="product-header">
        <img
          src={product.imageUrl}
          alt={product.productName}
          className="product-image"
        />
        <div className="product-info">
          <h1>{product.productName}</h1>
          <p>{product.preciseDescription}</p>
          <div className="product-price">Price: Rs. {product.price}</div>
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
        <p>{product.enhancedDescription}</p>

        {product.specifications.map((spec, index) => (
          <div key={index}>
            <h3>{spec.heading}</h3>
            <ul>
              {spec.details.map((detail, idx) => (
                <li key={idx}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* <section className="related-products"> */}
      <div className="related-products-list">
        <TopSellingProduct
          products={relatedProducts}
          heading={"Related Products"}
        />
      </div>
      {/* </section> */}
    </div>
  );
};

export default CricketBatDetails;
