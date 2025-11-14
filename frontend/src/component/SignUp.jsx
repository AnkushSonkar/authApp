import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const baseUrl = "https://authapp-thyi.onrender.com";

const SignUp = () => {
  useEffect(() => {
    document.title = "Sign Up | MyApp";
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const res = await fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.redirect) {
        reset();

        const confirmRedirect = window.confirm(
          `${data.message}. Do you want to go to the login page?`
        );

        if (confirmRedirect) {
          navigate(data.redirect); // "/login"
        }
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md overflow-hidden"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">Sign Up</h1>

        {/* Username */}
        <label htmlFor="username" className="block text-sm font-medium mb-1">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
          autoComplete="username"
          className="w-full px-4 py-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mb-2">{errors.username.message}</p>
        )}

        {/* Email */}
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })}
          autoComplete="email"
          className="w-full px-4 py-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        {/* Password */}
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          autoComplete="new-password"
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Create New Account
        </button>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
