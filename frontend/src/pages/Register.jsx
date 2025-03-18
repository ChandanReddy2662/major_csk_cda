import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

const VITE_SERVER = import.meta.env.VITE_API_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    age: "",
    email: "",
    password: "",
    phoneNumber: "", // Added phoneNumber field
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await axios.post(`${VITE_SERVER}/auth/register`, formData);
      setLoading(false)
      setMessage("🎉 Registration successful! Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setLoading(false)
      setMessage(
        error.response?.data?.message || "Registration failed. Please try again."
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
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Username
            </label>
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-semibold">Age</label>
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              name="age"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Password
            </label>
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Phone Number
            </label>
            <input
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="tel" // Use 'tel' for phone numbers
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg"
            type="submit"
          >
            {loading? <div><Loader zoom="0.1" color="black" /></div>: "Register"}
          </motion.button>

          {/* Success/Error Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`text-center font-semibold mt-2 ${
                message.includes("successful")
                  ? "text-green-600"
                  : "text-red-500"
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