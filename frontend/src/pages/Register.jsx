import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const VITE_SERVER = import.meta.env.VITE_API_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    age: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);  

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle password visibility on hover
  const handleMouseEnter = () => setShowPassword(true);
  const handleMouseLeave = () => setShowPassword(false);

  // Validation function
  const handleValidation = () => {
    let newErrors = {};

    // Username validation (6-20 characters)
    if (formData.username.length < 6 || formData.username.length > 20) {
      newErrors.username = "Username must be 6-20 characters.";
    }

    // Age validation (1-100)
    if (!formData.age || formData.age < 1 || formData.age > 100) {
      newErrors.age = "Age must be between 1 and 100.";
    }

    // Email validation (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // Password validation (Uppercase, lowercase, number, special char, min 8)
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must have at least 8 characters, including uppercase, lowercase, number, and special character.";
    }

    // Phone number validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return; // Stop if validation fails

    try {
      setLoading(true);
      await axios.post(`${VITE_SERVER}/auth/register`, formData);
      setLoading(false);
      setMessage("🎉 Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setLoading(false);
      setMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Full Name
            </label>
            <input
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-gray-700 font-semibold">Username</label>
            <input
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-semibold">Age</label>
            <input
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          {/* Password Field with Eye Icon */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 pr-10"
              type={showPassword ? "text" : "password"} // Toggle type on hover
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
            {/* Eye Icon - Hover to Reveal Password */}
            <span
              className="absolute top-10 right-3 cursor-pointer text-gray-500"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Phone Number
            </label>
            <input
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>

          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg"
            type="submit"
          >
            {loading ?
             <div className="flex justify-center">
              <div style={{textAlign:"initial"}}><Loader zoom="0.08" color="black" /></div>
            </div>:
              "Register"}
          </motion.button>

          {/* Success/Error Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-center font-semibold mt-2 ${
                message.includes("successful") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
