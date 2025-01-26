import React, { useState } from "react";
import "./OrderSummary.css";
import ordersummaryproduct from "../../Assets/Images/bat1.png";

const OrderSummary = () => {
  const [showTrackingDetails, setShowTrackingDetails] = useState(false);
  const [showCancelForm, setShowCancelForm] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [description, setDescription] = useState("");

  const handleTrackingDetailsClick = () => {
    setShowTrackingDetails(!showTrackingDetails);
  };

  const handleCancelClick = () => {
    setShowCancelForm(!showCancelForm);
  };

  const handleReasonChange = (event) => {
    setCancelReason(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Reason for cancellation:", cancelReason);
    console.log("Description:", description);
    setShowCancelForm(false);
  };

  const stages = [
    { id: 1, status: "Order Placed", date: "2025-01-10" },
    { id: 2, status: "Shipped", date: "2025-01-11" },
    { id: 3, status: "Out for Delivery", date: "2025-01-12" },
    { id: 4, status: "Delivered", date: "2025-01-13" },
  ];
  return (
    <div className="order-summary-container">
      <h1>ORDER SUMMARY</h1>
      <div className="cart-content">
        <div className="ordersummary-product-details">
          <img src={ordersummaryproduct} alt="Product" />
          <div>
            <p>ORDER DATE: DD/MM/YYYY</p>
            <p>ORDER ID: 0000000000</p>
            <p>ORDER TOTAL: Rs 000/-</p>
            <p>Willow Bat</p>
            <p>
              "Willow is the only type of wood that can provide the strength and
              compression needed for a cricket bat."
            </p>
            <label>
              SIZE:
              <select>
                {["1", "2", "3", "4", "5", "6", "H", "SH", "LH"].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
            <label>
              QTY:
              <select>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((qty) => (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                ))}
              </select>
            </label>
            <p>Rs. 000/-</p>
            <button onClick={handleCancelClick}>CANCEL</button>
            <button onClick={handleTrackingDetailsClick}>
              TRACKING DETAILS
            </button>
          </div>
        </div>
      </div>

      {showTrackingDetails && (
        <div className="timeline-container">
          <h3>Tracking Your Order</h3>
          {stages.map((stage, index) => (
            <div className="timeline-item" key={stage.id}>
              <div className="date">{stage.date}</div>
              <div
                className={`timeline-bubble ${
                  index === stages.length - 1 ? "active" : ""
                }`}
              >
                {index === stages.length - 1 ? (
                  <></>
                ) : (
                  <div className="center-line"></div>
                )}
              </div>

              <div className="timeline-content">
                <h4>{stage.status}</h4>
                <p>{`Date: ${stage.date}`}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCancelForm && (
        <div className="cancel-form">
          <h2>WHAT MADE YOU TO CANCEL?</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="radio-options">
              {[
                "Ordered Wrong Item",
                "Product Is Not As Expected",
                "Product Came Damaged",
                "Delivery Took Too Long",
                "Other",
              ].map((reason) => (
                <label key={reason}>
                  <input
                    type="radio"
                    value={reason}
                    checked={cancelReason === reason}
                    onChange={handleReasonChange}
                  />
                  {reason}
                </label>
              ))}
            </div>
            <div className="description-box">
              <h3>REASON FOR CANCELLATION?</h3>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Provide more details..."
              />
            </div>
            <button className="ordersummarysubmit" type="submit">
              SUBMIT & CANCEL THE ORDER
            </button>
          </form>
        </div>
      )}

      <div className="ordersummary-price-details">
        <h2>Order Summary</h2>
        <div className="price-details-table">
          <div>
            <p>Total MRP :</p>
            <p>Rs. 0000/-</p>
          </div>
          <div>
            <p>Discount on MRP :</p>
            <p>Rs. 000/-</p>
          </div>
          <div>
            <p>Coupon Discount :</p>
            <p>
              <button className="applycoupon">APPLY COUPON</button>
            </p>
          </div>
          <div>
            <p>Shipping Fee :</p>
            <p>Rs. 000/-</p>
          </div>
          <div>
            <p>Order Total :</p>
            <p>Rs. 000/-</p>
          </div>
        </div>
      </div>

      <hr />

      <div className="payment-method">
        <h2>Payment Method</h2>
        <p>Pay On Delivery</p>
      </div>

      <hr />

      <div className="shipping-address">
        <h2>Shipping Address</h2>
        <p>Name: John Doe</p>
        <p>Address: 123 Main St, Apt 456</p>
        <p>City: New York, NY</p>
        <p>Zip Code: 10001</p>
        <p>Phone: (123) 456-7890</p>
      </div>
    </div>
  );
};

export default OrderSummary;
