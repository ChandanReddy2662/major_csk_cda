import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaBirthdayCake, FaEdit, FaCheck, FaDonate, FaTrophy, FaPhone } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im"; // Spinner for loading
import Loader from "../components/Loader";

const VITE_SERVER = import.meta.env.VITE_API_URL;

const Profile = () => {
  const { authTokens } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [donationsMade, setDonationsMade] = useState([]);
  const [donationsReceived, setDonationsReceived] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for button

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${VITE_SERVER}/users/profile`, {
          headers: { Authorization: `Bearer ${authTokens}` },
        });
        setProfile(response.data);
        setUpdatedProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    const fetchDonations = async () => {
      try {
        const madeResponse = await axios.get(`${VITE_SERVER}/donations/made`, {
          headers: { Authorization: `Bearer ${authTokens}` },
        });
        const receivedResponse = await axios.get(`${VITE_SERVER}/donations/received`, {
          headers: { Authorization: `Bearer ${authTokens}` },
        });

        setDonationsMade(madeResponse.data);
        setDonationsReceived(receivedResponse.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchProfile();
    fetchDonations();
  }, [authTokens]);

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true); // Show loading spinner
    try {
      await axios.put(`${VITE_SERVER}/users/update`, updatedProfile, {
        headers: { Authorization: `Bearer ${authTokens}` },
      });
      setProfile(updatedProfile);
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setLoading(false); // Hide loading spinner
  };

  if (!profile) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-lg py-10">
        <Loader zoom="0.6" color="blue" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg mt-10"
    >
      {/* Profile Header */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg shadow-lg flex justify-between items-center"
      >
        <h2 className="text-3xl font-bold">👤 My Profile</h2>
        <button
          onClick={!editing ? handleEditClick : handleSave}
          className="flex items-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg relative"
          disabled={loading}
        >
          {loading ? (
            <ImSpinner2 className="animate-spin mx-auto" />
          ) : editing ? (
            <>
              <FaCheck className="mr-2" />
              Save
            </>
          ) : (
            <>
              <FaEdit className="mr-2" />
              Edit
            </>
          )}
        </button>
      </motion.div>

      {/* Main Profile Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Left Column */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold mb-3">✨ Personal Info</h3>
          {[
            { field: "name", icon: <FaUser className="text-blue-500" />, label: "Full Name" },
            { field: "username", icon: <FaUser className="text-green-500" />, label: "Username" },
            { field: "age", icon: <FaBirthdayCake className="text-pink-500" />, label: "Age" },
            { field: "email", icon: <FaEnvelope className="text-red-500" />, label: "Email" },
            { field: "phonenumber", icon: <FaPhone className="text-purple-500" />, label: "Phone Number" }, // Added Phone Number
          ].map(({ field, icon, label }) => (
            <div key={field} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg mb-3 shadow">
              <span className="flex items-center space-x-2">
                {icon}
                <span className="text-gray-700 font-semibold">{label}</span>
              </span>
              {editing ? (
                <input
                  type={field === "age" || field === "phone" ? "number" : "text"}
                  name={field}
                  value={updatedProfile[field] || ""}
                  onChange={handleChange}
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-600 font-medium">{profile[field]}</p>
              )}
            </div>
          ))}
        </motion.div>

        {/* Right Column - Social Score */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-md text-center"
        >
          <h3 className="text-xl font-semibold text-gray-800 flex justify-center items-center">
            <FaTrophy className="mr-2 text-yellow-500" /> Social Score
          </h3>
          <motion.p
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-blue-600 font-extrabold text-5xl mt-2"
          >
            {profile.socialScore} 🏆
          </motion.p>
        </motion.div>
      </div>
       {/* Donations Section */}
       <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">💰 My Donations</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Donations Made */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <h4 className="text-lg font-semibold text-gray-700 flex items-center">
              <FaDonate className="mr-2 text-green-600" /> Donations Made
            </h4>
            {donationsMade.length > 0 ? (
              donationsMade.map((donation) => (
                <div key={donation._id} className="flex items-center bg-gray-100 shadow p-3 rounded-lg mt-2">
                  <img src={donation.image} alt={donation.title} className="h-6 w-6 rounded-full mr-3" />
                  <div>
                    <p className="text-gray-800 font-semibold">{donation.title}</p>
                    <p className="text-gray-600 text-sm">{donation.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No donations made yet.</p>
            )}
          </motion.div>

          {/* Donations Received */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <h4 className="text-lg font-semibold text-gray-700 flex items-center">
              <FaDonate className="mr-2 text-red-600" /> Donations Received
            </h4>
            {donationsReceived.length > 0 ? (
              donationsReceived.map((donation) => (
                <div key={donation._id} className="flex items-center bg-gray-100 shadow p-3 rounded-lg mt-2">
                <img src={donation.image} alt={donation.title} className="h-6 w-6 rounded-full mr-3" />
                <div>
                  <p className="text-gray-800 font-semibold">{donation.title}</p>
                  <p className="text-gray-600 text-sm">{donation.description}</p>
                </div>
              </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No donations received yet.</p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
