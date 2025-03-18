import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import Loader from "../../components/Loader";


const VITE_SERVER = import.meta.env.VITE_API_URL

const AdminDonations = () => {
  const { authTokens } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Donations
  useEffect(() => {

    const fetchRecipients = async (donations) => {
      const updatedDonations = await Promise.all(
        donations.map(async (donation) => {
          if (donation.recipient) {
            try {
              const userResponse = await axios.get(`${VITE_SERVER}/admin/user/${donation.recipient}`, {
                headers: { Authorization: `Bearer ${authTokens}` },
              });
              return { ...donation, recipient: userResponse.data };
            } catch (error) {
              console.error("Error fetching recipient:", error);
            }
          }
          return donation;
        })
      );
      setDonations(updatedDonations);
    };
    const fetchDonations = async () => {
      try {
        const response = await axios.get(`${VITE_SERVER}/admin/donations`, {
          headers: { Authorization: `Bearer ${authTokens}` },
        });
        
        fetchRecipients(response.data)
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [authTokens]);


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto p-6"
    >
      <h2 className="text-4xl font-bold text-[#1E3A8A] mb-6 text-center">🎁 Manage Donations</h2>

      {loading ? (
        <div className="flex h-screen justify-center items-center"><Loader zoom="0.4" color="blue" /></div>
      ) : donations.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No donations found.</p>
      ) : (
        <motion.table
          className="w-full border border-gray-200 bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border p-3">Title</th>
              <th className="border p-3">Donor</th>
              <th className="border p-3 text-center">Recipient</th>
              <th className="border p-3">Category</th>
              <th className="border p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id} className="hover:bg-gray-50">
                <td className="border p-3">{donation.title}</td>
                <td className="border p-3">{donation.donor.username}</td>
                <td className="border p-3">{donation.recipient?donation.recipient.username:"Available"}</td>
                <td className="border p-3">{donation.category}</td>
                <td className="border p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                      donation.isTaken === true ? "bg-green-500" :
                      donation.isTaken === false ? "bg-red-500" : "bg-yellow-500"
                    }`}
                  >
                    {donation.isTaken?"Taken":"Available"}
                  </span>
                </td>
                {/* <td className="border p-3 text-center">
                  {donation.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateDonationStatus(donation._id, "approved")}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateDonationStatus(donation._id, "rejected")}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </motion.table>
      )}
    </motion.div>
  );
};

export default AdminDonations;
