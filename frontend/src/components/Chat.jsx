import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const VITE_SERVER = import.meta.env.VITE_API_URL;

const Chat = ({ chatId, donationId, recipientId, recipientName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socketRef = useRef();
  const messagesEndRef = useRef(null);
  const { user, authTokens } = useAuth();
  const userId = user.id;

  useEffect(() => {
    const fetchUserChat = async () => {
      try {
        const response = await axios.get(`${VITE_SERVER}/chats/${donationId}/${recipientId ? recipientId : userId}`, {
          headers: { Authorization: `Bearer ${authTokens}` },
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    };

    fetchUserChat();
    socketRef.current = io(import.meta.env.VITE_SOCKET);

    socketRef.current.emit('joinChat', { chatId });

    socketRef.current.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [chatId, recipientId]);

  // **Scroll chat messages to the latest one**
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        donationId,
        chatId,
        message: newMessage,
        userId,
        timestamp: new Date().toISOString(), // Send timestamp with message
      };

      socketRef.current.emit('sendMessage', messageData);
      setNewMessage('');
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-blue-700 mb-2 text-center">
        Chat with {recipientName}
      </h3>

      {/* Chat Messages Container (Scrollable) */}
      <div className="h-64 md:h-80 overflow-y-auto bg-gray-100 p-3 rounded-lg">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-2 p-2 rounded-lg max-w-[75%] sm:max-w-[60%] ${
              message.sender === userId 
                ? 'bg-blue-500 text-white ml-auto' 
                : 'bg-gray-300 text-black mr-auto'
            }`}
          >
            <span className="block text-xs font-semibold">
              {message.sender === userId ? 'You' : recipientName}
            </span>
            <p>{message.content}</p>
            <span className="block text-[10px] text-gray-800 mt-1">
              {new Date(message.timestamp).toLocaleString()}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="flex flex-col sm:flex-row items-center mt-3 gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border p-2 rounded-lg w-full sm:w-auto flex-grow focus:outline-none"
          placeholder="Type a message..."
        />
        <button 
          onClick={sendMessage} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full sm:w-auto"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
