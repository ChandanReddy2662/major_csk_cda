import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const DonationCard = ({ donation }) => {
  return (
    <motion.div 
      className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200"
      whileHover={{ scale: 1.03 }}
    >
      {/* Image Section */}
      <div className="relative flex justify-center items-center p-4">
        <img 
          src={donation.image || "images/donationDefault.png"} 
          alt={donation.title} 
          className="w-48 h-48 object-cover rounded-t-lg "
        />

        {donation.category && (
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            {donation.category}
          </span>
        )}
      </div>


      {/* Content Section */}
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-900">{donation.title}</h2>
        <p className="text-gray-600 mt-2 text-sm">{donation.description.substring(0, 100)}...</p>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-700 mt-3">
          <FaMapMarkerAlt className="text-red-500 mr-2" />
          <span>{donation.location}</span>
        </div>

        {/* Contact Info */}
        <div className="mt-3 space-y-2 text-sm">
          {donation.email && (
            <div className="flex items-center text-gray-700">
              <FaEnvelope className="text-blue-500 mr-2" />
              <span>{donation.email}</span>
            </div>
          )}
          {donation.phoneNumber && (
            <div className="flex items-center text-gray-700">
              <FaPhone className="text-green-500 mr-2" />
              <span>{donation.phoneNumber}</span>
            </div>
          )}
        </div>

        {/* Availability Status */}
        <div className="mt-4 flex items-center">
          {donation.isTaken ? (
            <FaTimesCircle className="text-red-500 mr-2" />
          ) : (
            <FaCheckCircle className="text-green-500 mr-2" />
          )}
          <span className={`text-sm font-medium ${donation.isTaken ? "text-red-600" : "text-green-600"}`}>
            {donation.isTaken ? "Taken" : "Available"}
          </span>
        </div>

        {/* View Details Button */}
        <Link 
          to={`/donation/${donation._id}`} 
          className="block mt-5 bg-[#1E3A8A] hover:bg-[#174A9A] text-white font-bold text-center py-2 px-4 rounded transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default DonationCard;
