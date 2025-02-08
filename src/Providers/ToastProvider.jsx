import React, { createContext, useState, useContext } from "react";
import Toast from "../CommonComponents/Toast/Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: "", visible: false });

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 3000); // Auto hide after 3s
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && <Toast message={toast.message} />}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
