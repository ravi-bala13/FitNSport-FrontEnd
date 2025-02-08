import React, { useState, useEffect } from "react";
import "./Toast.css"; // Import CSS for animation

const Toast = ({ message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 2500); // Hide animation before removal
    return () => clearTimeout(timer);
  }, []);

  return <div className={`toast ${show ? "show" : ""}`}>{message}</div>;
};

export default Toast;
