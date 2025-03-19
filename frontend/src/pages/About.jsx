import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaHandsHelping, FaRecycle, FaGlobe, FaHeart } from "react-icons/fa";
import Loader from "../components/Loader";


const About = () => {
  return (
    <div className="bg-[#F3F4F6] text-gray-800">\
      {/* Hero Section with Image */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1 }}
        className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto p-6 lg:py-16"
      >
        <div className="lg:w-1/2">
          <h1 className="text-4xl font-bold text-[#1E3A8A]">
            About Community Donation
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Community Donation is an initiative designed to make charitable giving easy, efficient, and impactful. 
            By connecting donors with individuals in need, we create a space where generosity thrives, essential resources find new homes, and waste is reduced. 
            Our platform empowers people to give back to society in a meaningful way.
          </p>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Whether you have extra household items, clothes, books, or food supplies, you can donate them to people who truly need them. 
            Our integrated chat system allows recipients to communicate with donors directly, ensuring smooth and transparent exchanges. 
            With every contribution, we build a stronger and more connected community.
          </p>
        </div>
        <motion.img 
          src="images/image.png" 
          alt="Community Help"
          className="rounded-lg shadow-lg mt-6 lg:mt-0 lg:w-90  "
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
      </motion.div>

      {/* Why Was This Initiative Started? */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white p-8 shadow-md max-w-5xl mx-auto my-10 rounded-lg"
      >
        <h2 className="text-3xl font-semibold text-[#1E3A8A]">
          Why Was This Initiative Started?
        </h2>
        <p className="text-gray-600 mt-3 leading-relaxed">
          Every year, tons of useful items go to waste, while millions of people struggle to afford basic necessities. 
          Our platform was created to bridge this gap by making it simple, safe, and effective for individuals to donate and receive essential goods. 
          We aim to promote sustainability, reduce waste, and foster a culture of kindness.
        </p>
      </motion.section>

      {/* Core Values Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-12"
      >
        <h2 className="text-3xl font-semibold text-center text-[#1E3A8A] mb-6">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { icon: <FaUsers size={40} className="text-[#1E3A8A]" />, title: "Community", desc: "Bringing people together to support each other." },
            { icon: <FaHandsHelping size={40} className="text-[#10B981]" />, title: "Generosity", desc: "Encouraging acts of kindness and giving." },
            { icon: <FaRecycle size={40} className="text-[#F59E0B]" />, title: "Sustainability", desc: "Reducing waste through reuse and donation." },
            { icon: <FaGlobe size={40} className="text-[#3B82F6]" />, title: "Accessibility", desc: "Ensuring easy donation access for everyone." },
            { icon: <FaHeart size={40} className="text-[#EF4444]" />, title: "Empathy", desc: "Creating a culture of care and support." },
          ].map((value, index) => (
            <motion.div 
              key={index}
              className="p-6 bg-white shadow-md rounded-lg flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {value.icon}
              <h3 className="text-xl font-semibold mt-3">{value.title}</h3>
              <p className="text-gray-600 mt-2">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white p-8 shadow-md max-w-5xl mx-auto my-10 rounded-lg"
      >
        <h2 className="text-3xl font-semibold text-[#1E3A8A]">
          How It Works
        </h2>
        <p className="text-gray-600 mt-3">
          <strong>Step 1:</strong> Register and get approval from the admin.  
          <br />
          <strong>Step 2:</strong> List your donation items with details and images.  
          <br />
          <strong>Step 3:</strong> Connect with potential recipients through the chat feature.  
          <br />
          <strong>Step 4:</strong> Select a recipient and finalize the donation!  
        </p>
      </motion.section>

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center my-12"
      >
        <a 
          href="/register" 
          className="bg-[#1E3A8A] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#174A9A] hover:scale-105 transition-transform duration-300"
        >
          Join the Community
        </a>
      </motion.div>

    </div>
  );
};

export default About;
