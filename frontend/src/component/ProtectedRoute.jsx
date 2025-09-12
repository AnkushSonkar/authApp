// ProtectedRoute.jsx
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [checked, setChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/home`, {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        console.error("Auth verification error:", err);
        setIsAuth(false);
      } finally {
        setChecked(true);
      }
    };

    verifyAuth();
  }, []);

  if (!checked) {
    return <div>Loading...</div>; // or some spinner
  }

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
