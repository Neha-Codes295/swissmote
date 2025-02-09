import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/**
 * Login Component - Handles user authentication and guest login functionality
 * Provides a form interface for username/password login and a guest login option
 */
const Login = () => {
  // State management for form inputs and error handling
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Destructure form data for easier access
  const { username, password } = formData;

  /**
   * Handles input changes for form fields
   * @param {Object} e - Event object
   */
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  /**
   * Handles the main login form submission
   * @param {Object} e - Event object
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", data.token);
      navigate("/event-dashboard");
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  /**
   * Handles guest login functionality
   */
  const handleGuestLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/guest-login");
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setError("Error logging in as guest. Please try again.");
    }
  };

  // Common input field styles
  const inputStyles = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500";
  const buttonStyles = "w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        {/* Error message display */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        {/* Login form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleInputChange}
              className={inputStyles}
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handleInputChange}
              className={inputStyles}
              required
            />
          </div>
          
          <button
            type="submit"
            className={`${buttonStyles} bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500`}
          >
            Login
          </button>
        </form>

        {/* Guest login section */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Or</p>
          <button
            onClick={handleGuestLogin}
            className={`${buttonStyles} bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 mt-2`}
          >
            Login as Guest
          </button>
        </div>

        {/* Registration link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;