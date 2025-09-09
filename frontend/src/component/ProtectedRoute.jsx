// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = document.cookie.includes("token=");
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
