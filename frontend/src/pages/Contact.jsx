import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-[#F3F4F6] text-gray-800">
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-between max-w-6xl mx-auto p-6 w-full lg:py-16  text-center"
      >
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold text-[#1E3A8A]">Get in Touch</h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Have any questions or suggestions? We're here to help! Contact us through the details below or send us a message using the form.
          </p>
        </div>
        {/* <motion.img 
          src="images/contact-image.png" 
          alt="Contact Us"
          className="rounded-lg shadow-lg mt-6 lg:mt-0 lg:w-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        /> */}
      </motion.div>

      {/* Contact Details */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white p-8 shadow-md max-w-5xl mx-auto my-10 rounded-lg"
      >
        <h2 className="text-3xl font-semibold text-[#1E3A8A]">Contact Information</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center">
            <FaMapMarkerAlt size={30} className="text-[#1E3A8A] mr-4" />
            <p className="text-gray-600">123 Community Street, Cityville, Country</p>
          </div>
          <div className="flex items-center">
            <FaPhoneAlt size={30} className="text-[#10B981] mr-4" />
            <p className="text-gray-600">+1 234 567 890</p>
          </div>
          <div className="flex items-center">
            <FaEnvelope size={30} className="text-[#F59E0B] mr-4" />
            <p className="text-gray-600">support@communitydonation.com</p>
          </div>
        </div>
      </motion.section>

      {/* Contact Form */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white p-8 shadow-md max-w-5xl mx-auto my-10 rounded-lg"
      >
        <h2 className="text-3xl font-semibold text-[#1E3A8A] text-center mb-6">Send Us a Message</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Your Name</label>
            <input 
              type="text" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Email Address</label>
            <input 
              type="email" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Message</label>
            <textarea 
              rows="5" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
              placeholder="Write your message..."
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#1E3A8A] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#174A9A] hover:scale-105 transition-transform duration-300"
          >
            Send Message
          </button>
        </form>
      </motion.section>

      {/* Social Media Links */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center py-12"
      >
        <h2 className="text-2xl font-semibold text-[#1E3A8A]">Follow Us</h2>
        <p className="text-gray-600 mt-3">Stay connected with us on social media for updates and news.</p>
        <div className="flex justify-center mt-6 space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={40} className="text-[#1E3A8A] hover:text-[#174A9A] transition duration-300" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={40} className="text-[#1DA1F2] hover:text-[#0E71C8] transition duration-300" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={40} className="text-[#E4405F] hover:text-[#D62D52] transition duration-300" />
          </a>
        </div>
      </motion.section>

    </div>
  );
};

export default Contact;
