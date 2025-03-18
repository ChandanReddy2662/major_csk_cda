// src/pages/Admin/AdminUsers.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import Loader from "../../components/Loader";

const VITE_SERVER = import.meta.env.VITE_API_URL;

const AdminUsers = () => {
  const { authTokens } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${VITE_SERVER}/users`, {
          headers: { Authorization: `Bearer ${authTokens}` },
        });
        setLoading(false)
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [authTokens]);

  const handleApprove = async (userId) => {
    try {
      await axios.put(
        `${VITE_SERVER}/admin/users/${userId}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${authTokens}` },
        }
      );
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isApproved: true } : user
        )
      );
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto p-6"
    >
      <h2 className="text-4xl font-bold text-[#1E3A8A] mb-6 text-center">
        👥 Manage Users
      </h2>
      {loading?<div className="flex h-screen justify-center items-center"><Loader zoom="0.4" color="blue" /></div>:
      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full border border-gray-200"
      >
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3">Username</th>
            <th className="border p-3">Email</th>
            <th className="border p-3">Approved</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <motion.tr
              key={user._id}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="text-center hover:bg-gray-100"
            >
              <td className="border p-3">{user.username}</td>
              <td className="border p-3">{user.email}</td>
              <td className="border p-3">
                {user.isApproved ? "✅ Yes" : "❌ No"}
              </td>
              <td className="border p-3">
                {!user.isApproved ? (
                  <button
                    onClick={() => handleApprove(user._id)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Approve
                  </button>
                ): <p className="bg-green-300 p-1 rounded-md">Approved</p> }
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>}
    </motion.div>
  );
};

export default AdminUsers;