import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderConfirmationPage.css'; // Make sure to create this CSS file for styling

const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="order-confirmation">
      <h2>Order Placed Successfully!</h2>
      <p>Your transaction ID is: <strong>FIN00002222</strong></p>
      <p>Further details will be sent to your registered mobile number and email ID.</p>
      <div className="message-box">
        <p>Thank you for shopping with us. We will notify you once your order is dispatched.</p>
      </div>
      <button className="continue-shopping" onClick={handleContinueShopping}>
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderConfirmationPage;
