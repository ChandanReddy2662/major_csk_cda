import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Chat from "../components/Chat";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { FaUsers, FaHandHoldingHeart, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import Loader from "../components/Loader";


const VITE_SERVER = import.meta.env.VITE_API_URL

const DonationItemPage = () => {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);
  const [message, setMessage] = useState("");
  const { user, authTokens } = useAuth();
  const navigate = useNavigate();
  const [isDonor, setIsDonor] = useState(false);
  const [recipientList, setRecipientList] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  
  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const response = await axios.get(`${VITE_SERVER}/donations/${id}`);
        setDonation(response.data);
        setIsDonor(response.data.donor._id === user.id);
      } catch (error) {
        console.error("Error fetching donation:", error);
      }
    };

    const fetchRecipients = async () => {
      if (!isDonor) return;
      try {
        const chatResponse = await axios.get(`${VITE_SERVER}/chats/users/${id}`, {
          headers: { Authorization: `Bearer ${authTokens}` },
        });
        setRecipientList(chatResponse.data);
      } catch (error) {
        console.error("Error fetching recipients", error);
      }
    };

    fetchDonation();
    fetchRecipients();
  }, [isDonor]);

  const handleDonate = async () => {
    try {
      await axios.put(
        `${VITE_SERVER}/donations/${id}/recipient`,
        { recipientId: selectedRecipient },
        { headers: { Authorization: `Bearer ${authTokens}` } }
      );
      setMessage("Donation successfully given 🎉");
      setTimeout(() => navigate("/community"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  const handleUserChange = (e) => {
    setSelectedChatUser(recipientList.find((user) => user.userId === e.target.value));
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this donation?")) {
      try {
        await axios.delete(`${VITE_SERVER}/donations/${id}`, {
          headers: { Authorization: `Bearer ${authTokens}` },
        });
        alert("Donation deleted successfully!");
        navigate("/community"); // Redirect after deletion
      } catch (error) {
        console.error("Error deleting donation:", error);
        alert("Failed to delete the donation.");
      }
    }
  };
  

  if (!donation) return <div className="w-full h-screen flex justify-center items-center"><div className="py-10 text-lg"><Loader zoom="0.6" color='blue' /></div></div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.8 }}
      className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {/* Left Column - Donation Details */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-md rounded-lg p-6 text-center"
      >
        <h2 className="text-3xl font-bold text-blue-800 mb-4 text-center">{donation.title}</h2>
        <div className="text-center w-full flex justify-center">
          
         <img src={donation.image} alt={donation.title} className="w-48 object-cover rounded-lg shadow-md mb-4" />
        </div>

        {/* Info Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg flex items-center">
            <FaMapMarkerAlt className="text-blue-600 text-xl mr-3" />
            <p className="text-gray-700">{donation.location}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center">
            <FaEnvelope className="text-blue-600 text-xl mr-3" />
            <p className="text-gray-700">{donation.email}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center">
            <FaPhone className="text-blue-600 text-xl mr-3" />
            <p className="text-gray-700">{donation.phoneNumber}</p>
          </div>
        </div>

        <p className="text-gray-700 mt-4">{donation.description}</p>

        {/* Donation Controls */}
        {isDonor ? (
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Select Recipient</h3>
            <select
              value={selectedRecipient?.userId}
              onChange={(e) => setSelectedRecipient(e.target.value)}
              className="w-full p-3 border rounded-lg mt-2"
            >
              <option value="none">Select Recipient</option>
              {recipientList.map((recipient) => (
                <option value={recipient.userId} key={recipient.userId}>
                  {recipient.username}
                </option>
              ))}
            </select>
            <motion.button 
              onClick={handleDonate}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-3 w-full"
            >
              Donate Now
            </motion.button>

            <motion.button 
              onClick={handleDelete}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-3 w-full"
            >
              Delete Donation
            </motion.button>
          </div>
        ) : (
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg mt-4 w-full"
          >
            Interested
          </motion.button>
        )}
      </motion.div>

      {/* Right Column - Chat Section */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-md rounded-lg p-6"
      >
        {/* Chat Users Section */}
        {isDonor && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <FaUsers className="text-blue-600 mr-2" /> Chat with Recipients
            </h3>
            <select
              value={selectedChatUser?.userId}
              onChange={handleUserChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="none">Select User</option>
              {recipientList.map((user) => (
                <option value={user.userId} key={user.userId}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Chat Component (Fixed Scrollable Area) */}
        <div className="h-80">
          {isDonor ? (
            selectedChatUser ? (
              <Chat 
                chatId={`donation-${donation._id}-${selectedChatUser.userId}-${user.id}`} 
                recipientId={selectedChatUser.userId} 
                recipientName={selectedChatUser.username}  
                donationId={donation._id} 
              />
            ) : (
              <div className="text-center text-gray-500">No Chat Selected</div>
            )
          ) : (
            <Chat 
              chatId={`donation-${donation._id}-${user.id}-${donation.donor._id}`} 
              donationId={donation._id} 
              recipientName={donation.donor.username} 
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DonationItemPage;
