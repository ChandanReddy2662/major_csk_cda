import React, { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import io from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
const VITE_SERVER = import.meta.env.VITE_API_URL
const NotificationBell = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [hasNew, setHasNew] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user) return; // Ensure user is logged in before connecting to the socket

    async function fetchUnread(){
      try{
        const notifications = await axios.get(`${VITE_SERVER}/chats/notifications/${user.id}`) 
        console.log(notifications.data) 
        setNotifications(notifications.data)

      }
      catch(err){
        console.log("Error notifications: ", err)
      }
    }
    fetchUnread() 
     // Establish WebSocket connection
    socketRef.current = io(import.meta.env.VITE_SOCKET);
    
    // Join user's notification room
    socketRef.current.emit("joinNotifications", { userId: user.id });

    // Listen for new notifications
    socketRef.current.on("newNotification", (newNotif) => {
        console.log(newNotif)
      setNotifications((prev) => [newNotif, ...prev]);
      setHasNew(true);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [user]);


  useEffect(() => {
    if(notifications.some((value) => value.read === false))
      setHasNew(true)
  }, [notifications])

  const handleOpenDropdown = () => {
    setDropdownOpen(!dropdownOpen);

    if (hasNew) {
      setHasNew(false);
      socketRef.current.emit("markNotificationsAsRead", { userId: user.id });
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell Icon */}
      <button
        onClick={handleOpenDropdown}
        className="relative focus:outline-none"
      >
        <FaBell className="text-xl text-white hover:text-blue-400 transition" />
        {hasNew && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
        )}
      </button>

      {/* Notification Dropdown */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 shadow-lg rounded-md overflow-hidden">
          <div className="px-4 py-2 bg-gray-200 font-bold flex justify-between">
            <span>Notifications</span>
            <button
              className="text-sm text-blue-500 hover:underline"
              onClick={() => setNotifications([])}
            >
              Clear All
            </button>
          </div>
          {notifications.length > 0 ? (
            <div className="max-h-60 overflow-y-auto">
              {notifications.map((notif, index) => (
                <div key={index} className="px-4 py-2 border-b hover:bg-gray-100">
                  <p className="text-sm">{notif.message}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(notif.createdAt).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">No notifications</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
