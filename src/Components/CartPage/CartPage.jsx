import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css"; // Ensure this file contains necessary styles
import productimg from "../../Assets/Images/bat1.png";
import TopSellingProduct from "../TopSellingProducts/TopSellingProduct";
import Wishlist from "../Wishlist/Wishlist";
import OrderConfirmationPage from "../OrderConfirmationPage/OrderConfirmationPage";
import ProductsApiHelper from "../../Scripts/ProductsApiHelper";

const CartPage = () => {
  const [reload, setReload] = useState(false);
  console.log("reload:", reload);
  const [activeTab, setActiveTab] = useState("cart");
  const [cartItems, setcartItems] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]); // Current products to display
  const [currentIndex, setCurrentIndex] = useState(0); // Index for the current product in the carousel
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedUPIOption, setSelectedUPIOption] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false); // To track order placement status
  const navigate = useNavigate();

  useEffect(() => {
    const getCartProducts = async () => {
      let products = await ProductsApiHelper.getCartProducts();
      setcartItems(products);
    };
    getCartProducts();

    const getTopSellingProducts = async () => {
      let products = await ProductsApiHelper.getTopSellingProducts();
      setTopSellingProducts(products);
    };
    getTopSellingProducts();
  }, [reload]);

  const handlePlaceOrder = () => {
    // Navigate to order confirmation page when order is placed
    setOrderPlaced(true);
    navigate("/orderconfirm"); // Navigate to Order Confirmation page
  };

  const handleContinueShopping = () => {
    setOrderPlaced(false); // Hide the order placed message
    navigate("/products"); // Redirect to the products page
  };

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Customer Name",
      details: "House no, House Name, Street Name, District, State.",
      pincode: "000 000",
      phone: "+00 0000000000",
    },
    {
      id: 2,
      name: "Customer Name",
      details: "House no, House Name, Street Name, District, State.",
      pincode: "000 000",
      phone: "+00 0000000000",
    },
  ]);

  const handleRemove = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const handleAddAddress = () => {
    navigate("/myprofile");
  };

  const handleEdit = (address) => {
    navigate("/myprofile", { state: { address } });
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleUPIOptionChange = (event) => {
    setSelectedUPIOption(event.target.value);
  };
  const handlePayNow = () => {
    alert("Payment processing...");
    // Add your payment processing logic here
  };

  const handleProceedToPay = () => {
    if (activeTab === "cart" && cartItems.length > 0) {
      setActiveTab("address");
    } else if (activeTab === "address" && addresses.length > 0) {
      setActiveTab("payment");
    } else {
      alert(
        "Please ensure you have at least one item in the cart or one address added."
      );
    }
  };
  // Display message if the cart is empty
  const renderCartEmptyMessage = () => (
    <div>
      <h1>Your Cart is Empty</h1>
      <Wishlist reload={reload} />
      <TopSellingProduct
        products={topSellingProducts}
        heading={"TOP SELLING PRODUCTS"}
      />
    </div>
  );

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0)); // Prevent going below index 0
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, currentProducts.length - 1)
    ); // Prevent going beyond last product
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const handleMoveToWishlist = async (product) => {
    ProductsApiHelper.handleAddToWishList(product);
    var justToWait = await ProductsApiHelper.handleRemoveFromCart(product.id);
    setReload((prev) => !prev);
  };

  const handleRemoveFromCart = async (productId) => {
    await ProductsApiHelper.handleRemoveFromCart(productId);
    setReload((prev) => !prev);
  };

  // Function to update the quantity in state
  const handleQuantityChange = (id, newQuantity) => {
    setcartItems((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          let difference = newQuantity - product.quantity;
          if (product.quantity < newQuantity) {
            // ProductsApiHelper.handleAddToCart(product);
          } else if (product.quantity > newQuantity) {
            // ProductsApiHelper.handleRemoveFromCart(product.id);
          }
          return { ...product, quantity: newQuantity };
        } else {
          return product;
        }
      })
    );
  };

  const renderTabContent = () => {
    if (activeTab === "cart") {
      if (cartItems.length === 0) {
        return renderCartEmptyMessage(); // Show empty cart message
      }
      return (
        <div className="cart-content">
          {cartItems.map((product) => (
            <div key={product.id} className="product-box">
              <div className="product-selection">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(product.id)}
                  onChange={() => handleCheckboxChange(product.id)}
                />
              </div>
              <div className="product-image">
                <img src={product.imageUrl} alt={product.productName} />
              </div>
              <div className="product-details">
                <p>{product.productName}</p>
                <p>{product.description}</p>
                <label>
                  SIZE:
                  <select>
                    {["1", "2", "3", "4", "5", "6", "H", "SH", "LH"].map(
                      (size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      )
                    )}
                  </select>
                </label>
                <label>
                  QTY:
                  <select
                    value={product.quantity}
                    onChange={(e) => {
                      handleQuantityChange(product.id, e.target.value);
                    }}
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                </label>
                <p>{product.price}</p>
                <div className="action-buttons">
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    Remove
                  </button>
                  <button
                    className="wishlist-button"
                    onClick={() => handleMoveToWishlist(product)}
                  >
                    Move to Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (activeTab === "address") {
      return (
        <div className="address-content">
          <h2>Select Delivery Address</h2>
          {addresses.map((address) => (
            <div key={address.id} className="address-box">
              <label>
                <input
                  type="checkbox"
                  name="selectedAddress"
                  value={address.id}
                  checked={selectedOption === address.id} // Ensure this reflects the selected address
                  onChange={() => setSelectedOption(address.id)} // Set the selected address
                />
                <div className="address-details">
                  <p>{address.name}</p>
                  <p>{address.details}</p>
                  <p>Pincode - {address.pincode}</p>
                  <p>Phone no: {address.phone}</p>
                </div>
              </label>
              <div className="address-actions">
                <button
                  className="remove-button"
                  onClick={() => handleRemove(address.id)}
                >
                  Remove
                </button>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(address)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
          <button className="add-address-button" onClick={handleAddAddress}>
            Add New Address
          </button>
        </div>
      );
    } else if (activeTab === "payment") {
      return (
        <div className="payment-content">
          <h2>Payment Options</h2>
          <div
            className={`payment-option ${
              selectedOption === "cod" ? "selected" : ""
            }`}
          >
            <label>
              <input
                type="radio"
                name="payment"
                value="cod"
                onChange={handleOptionChange}
              />
              <span>Pay On Delivery</span>
            </label>
          </div>
          <div
            className={`payment-option ${
              selectedOption === "upi" ? "selected" : ""
            }`}
          >
            <label>
              <input
                type="radio"
                name="payment"
                value="upi"
                onChange={handleOptionChange}
              />
              <span>Pay Via UPI</span>
            </label>
            {selectedOption === "upi" && (
              <div className="upi-options">
                <div className="upi-option">
                  <label>
                    <input
                      type="radio"
                      name="upi"
                      value="gpay"
                      onChange={handleUPIOptionChange}
                    />
                    <span>GPay</span>
                  </label>
                  {selectedUPIOption === "gpay" && (
                    <input
                      type="text"
                      placeholder="Enter GPay UPI ID"
                      className="upi-input"
                    />
                  )}
                </div>
                <div className="upi-option">
                  <label>
                    <input
                      type="radio"
                      name="upi"
                      value="phonepe"
                      onChange={handleUPIOptionChange}
                    />
                    <span>PhonePe</span>
                  </label>
                  {selectedUPIOption === "phonepe" && (
                    <input
                      type="text"
                      placeholder="Enter PhonePe UPI ID"
                      className="upi-input"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            className={`payment-option ${
              selectedOption === "card" ? "selected" : ""
            }`}
          >
            <label>
              <input
                type="radio"
                name="payment"
                value="card"
                onChange={handleOptionChange}
              />
              <span>Credit/Debit Card</span>
            </label>
            {selectedOption === "card" && (
              <div className="card-inputs">
                <input type="text" placeholder="Card Number" />
                <input type="text" placeholder="Card Holder Name" />
                <input type="text" placeholder="Expiry Date" />
                <input type="text" placeholder="CVV" />
              </div>
            )}
          </div>
          <button className="pay-now-button" onClick={handlePayNow}>
            PAY NOW
          </button>
        </div>
      );
    }
  };

  return (
    <div className="cart-page">
      {orderPlaced ? (
        <OrderConfirmationPage />
      ) : (
        <>
          <header className="cart-header">
            <nav>
              <span
                className={activeTab === "cart" ? "active" : ""}
                onClick={() => setActiveTab("cart")}
              >
                Cart
              </span>
              <span
                className={activeTab === "address" ? "active" : ""}
                onClick={() => setActiveTab("address")}
              >
                Address
              </span>
              <span
                className={activeTab === "payment" ? "active" : ""}
                onClick={() => setActiveTab("payment")}
              >
                Payment
              </span>
            </nav>
          </header>
        </>
      )}

      <div className="tab-content">{renderTabContent()}</div>
      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="price-details">
          <div>
            <p>Total MRP :</p>
            <p>Rs. 1000/-</p>
          </div>
          <div>
            <p>Discount on MRP :</p>
            <p>Rs. 100/-</p>
          </div>
          <div>
            <p>Coupon Discount :</p>
            <p>
              <button className="applycoupon">APPLY COUPON</button>
            </p>
          </div>
          <div>
            <p>Shipping Fee :</p>
            <p>Rs. 50/-</p>
          </div>
          <div>
            <p>Order Total :</p>
            <p>Rs. 950/-</p>
          </div>
        </div>
      </div>
      {activeTab === "cart" && (
        <div>
          <button
            className="proceed-to-pay-button"
            onClick={handleProceedToPay}
          >
            PROCEED TO PAY
          </button>
          <Wishlist reload={reload} />
        </div>
      )}
      {activeTab === "address" && (
        <div>
          <button
            className="proceed-to-pay-button"
            onClick={handleProceedToPay}
          >
            PROCEED TO PAY
          </button>
        </div>
      )}
      {/* Place Order button only on the Payment tab */}
      {activeTab === "payment" && (
        <div>
          <button
            className="place-order-button"
            onClick={handlePlaceOrder}
            disabled={!selectedOption}
          >
            Place Order
          </button>
        </div>
      )}
      <TopSellingProduct
        products={topSellingProducts}
        heading={"TOP SELLING PRODUCTS"}
        callBack={() => setReload((prev) => !prev)}
      />
    </div>
  );
};

export default CartPage;
