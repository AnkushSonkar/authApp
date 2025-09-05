// App.jsx
import React from "react";
import { Routes, Route, Link, Outlet, Navigate } from "react-router-dom";
import Home from "./component/Home";
import Login from "./component/Login";
import SignUp from "./component/SignUp";

// function Layout() {
//   return (
//     <div>
//       <nav className="p-4 bg-gray-200 flex justify-center gap-4 items-center">
//         <Link to="/login" className="font-bold text-blue-700 text-2xl">
//           Login
//         </Link>
//         <span className="font-bold">|</span>
//         <Link to="/signup" className="font-bold text-blue-700 text-2xl">
//           Sign Up
//         </Link>
//       </nav>
//       <Outlet />
//     </div>
//   );
// }

function App() {
  return (
    <Routes>
      {/* Redirect "/" → "/signup" */}
      <Route index element={<Navigate to="/signup" replace />} />
      <Route path="home" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
