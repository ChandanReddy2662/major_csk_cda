// src/pages/Admin/AdminDashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";


const VITE_SERVER = import.meta.env.VITE_API_URL

const AdminDashboard = () => {
  const { authTokens } = useAuth();
  const [stats, setStats] = useState({ users: 0, donations: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${VITE_SERVER}/admin/stats`, {
          headers: { Authorization: `Bearer ${authTokens}` },
        });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats()
  }, [authTokens]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className="container mx-auto p-6"
    >
      <h2 className="text-4xl font-bold text-[#1E3A8A] mb-8 text-center">📊 Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { title: "Total Users", value: stats.users, bg: "bg-blue-600" },
          { title: "Total Donations", value: stats.donations, bg: "bg-purple-600" }
        ].map(({ title, value, bg }, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.3 }}
            className={`${bg} text-white p-6 rounded-lg shadow-lg`}
          >
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="text-4xl mt-2">{value}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
