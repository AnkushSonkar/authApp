import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Home | MyApp";

    // ✅ Call backend to validate token
    const checkAuth = async () => {
      try {
        const res = await fetch("https://authapp-3l1r.onrender.com/home", {
          method: "GET",
          credentials: "include", // send cookies
        });

        if (!res.ok) {
          navigate("/login"); // redirect if unauthorized
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const res = await fetch("https://authapp-3l1r.onrender.com/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-blue-600">MyApp</h1>
          <nav className="space-x-6 hidden md:flex">
            <button
              onClick={() => navigate("/home")}
              className="text-gray-700 hover:text-blue-600"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="text-gray-700 hover:text-blue-600"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-red-500"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">User Dashboard</span>
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          This is a protected route. You can manage your profile, explore
          features, or log out securely from here.
        </p>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
