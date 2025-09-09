// App.jsx
import React from "react";
import { Routes, Route, Link, Outlet, Navigate } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Redirect "/" → "/signup" */}
      <Route index element={<Navigate to="/signup" replace />} />
      <Route
        path="home"
        element={
          // <ProtectedRoute>
          <Home />
          // </ProtectedRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
