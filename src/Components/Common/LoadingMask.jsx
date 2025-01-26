import React from "react";
import "./LoadingMask.css";

const LoadingMask = () => {
  return (
    <div className={`loading-mask-overlay show`}>
      <img src="https://i.ibb.co/ZVf7Rdm/logo-run.png" alt="Loading..." className="loading-gif" />
    </div>
  );
};

export default LoadingMask;
