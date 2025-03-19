import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

const VITE_SERVER = import.meta.env.VITE_API_URL;

const DonateItem = () => {
  const { user, authTokens } = useAuth();
  const navigate = useNavigate();
  const categories = ["Clothes", "Electronics", "Furniture", "Appliances", "Mobile", "Sports", "Toys", "Books", "Other"];
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
    email: user?.email || "",
    phoneNumber: user?.phonenumber || "",
    location: "",
    username: user?.username || "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        email: user.email || "",
        phoneNumber: user.phonenumber || "",
        username: user.username || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    // Check if all required fields are filled
    const { title, description, category, image, location } = formData;
    const isValid =
      title.trim() !== "" &&
      description.trim() !== "" &&
      category.trim() !== "" &&
      image !== null &&
      location.trim() !== "";

    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      setLoading(true);
      await axios.post(`${VITE_SERVER}/donations`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${authTokens}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      setMessage("Donation created successfully 🎉");

      setTimeout(() => {
        setMessage("");
        navigate("/community");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className="container mx-auto p-6 max-w-lg"
    >
      <h2 className="text-4xl font-bold text-[#1E3A8A] mb-6 text-center">📦 Donate an Item</h2>

      <motion.form 
        onSubmit={handleSubmit} 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-lg p-6"
      >
        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">Title *</label>
          <input 
            id="title" name="title" type="text" value={formData.title} onChange={handleChange} required
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Item title"
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">Description *</label>
          <textarea 
            id="description" name="description" value={formData.description} onChange={handleChange} required
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Describe the item"
          />
        </div>

        {/* Category Select */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="category">Category *</label>
          <select 
            id="category" name="category" value={formData.category} onChange={handleChange} required
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="image">Upload Image *</label>
          <input 
            id="image" type="file" name="image" accept="image/*" onChange={handleChange} required
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Email Input (Disabled) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email *</label>
          <input 
            id="email" type="email" name="email" value={formData.email} disabled
            className="w-full p-3 border rounded-lg bg-gray-200 cursor-not-allowed"
          />
        </div>

        {/* Phone Number Input (Disabled) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="phoneNumber">Phone Number *</label>
          <input 
            id="phoneNumber" type="tel" name="phoneNumber" value={formData.phoneNumber} disabled
            className="w-full p-3 border rounded-lg bg-gray-200 cursor-not-allowed"
          />
        </div>

        {/* Location Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="location">Location *</label>
          <input 
            id="location" type="text" name="location" value={formData.location} 
            onChange={handleChange} required
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
            placeholder="Your location"
          />
        </div>

        {/* Donate Button */}
        <motion.button 
          type="submit"
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }} 
          className={`text-white font-bold py-3 px-6 rounded-lg w-full ${
            isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          {loading ? <Loader zoom="0.1" color="black" /> : "Donate"}
        </motion.button>

        {/* Success Message */}
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center font-semibold"
          >
            {message}
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
};

export default DonateItem;
