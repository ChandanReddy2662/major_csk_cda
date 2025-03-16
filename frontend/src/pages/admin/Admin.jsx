// src/pages/Admin/Admin.js
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Admin = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="container mx-auto p-6"
    >
      <h2 className="text-4xl font-bold text-[#1E3A8A] mb-8 text-center">Admin Panel</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { to: "/admin/dashboard", label: "📊 Dashboard", bg: "bg-blue-600" },
          { to: "/admin/users", label: "👥 Manage Users", bg: "bg-green-600" },
          { to: "/admin/donations", label: "🎁 Manage Donations", bg: "bg-purple-600" }
        ].map(({ to, label, bg }) => (
          <motion.div 
            key={to}
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.3 }}
          >
            <Link 
              to={to} 
              className={`${bg} text-white text-lg font-semibold p-5 rounded-lg shadow-lg block text-center hover:shadow-2xl`}
            >
              {label}
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Admin;
