import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import DonationCard from "../components/DonationCard";
import Loader from "../components/Loader";


const VITE_SERVER = import.meta.env.VITE_API_URL

const Community = () => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${VITE_SERVER}/donations`);
        setLoading(false)
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    fetchDonations();
  }, []);

  // Filter Donations Based on Search & Category
  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = donation.title.toLowerCase().includes(searchTerm.toLowerCase()) 
    || donation.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || donation.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#F3F4F6] text-gray-800 min-h-screen p-6 flex flex-col items-center">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="bg-white shadow-lg rounded-lg p-8 max-w-5xl w-full text-center"
      >
        <h1 className="text-4xl font-bold text-[#1E3A8A]">Community Donations</h1>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          Discover donations from generous individuals. Help those in need or contribute to making the world a better place. Join our community today!
        </p>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="bg-white shadow-lg rounded-lg p-6 max-w-5xl w-full mt-6"
      >
        <input
          type="text"
          placeholder="🔍 Search donations by title..."
          className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Shortcut Category Filters */}
        <div className="flex flex-wrap gap-3 mt-4">
          {["All", "Clothes", "Electronics", "Furniture", "Appliances", "Mobile", "Sports", "Toys", "Books"].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm rounded-lg font-semibold transition-all 
                ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Donations Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="bg-white shadow-lg rounded-lg p-8 max-w-5xl w-full mt-6"
      >
        <h2 className="text-3xl font-semibold text-[#1E3A8A] text-center mb-6">Available Donations</h2>
        
        {loading? 
        <div className="flex justify-center items-center"><div><Loader zoom="0.6" color="rgba(39, 94, 254, 1)" /></div></div> :
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredDonations.length > 0 ? (
            filteredDonations.map((donation) => (
              <DonationCard key={donation._id} donation={donation} />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">No donations found.</p>
          )}
        </div>}
      </motion.div>

      {/* How It Works Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="bg-white shadow-lg rounded-lg p-8 max-w-5xl w-full mt-6"
      >
        <h2 className="text-3xl font-semibold text-[#1E3A8A]">How It Works</h2>
        <p className="text-gray-600 mt-3">
          1️⃣ Register and get admin approval.<br/>
          2️⃣ List your donation items with images.<br/>  
          3️⃣ Connect with recipients via chat.<br/> 
          4️⃣ Choose a recipient and complete the donation!  
        </p>
      </motion.div>

    </div>
  );
};

export default Community;
