import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-800">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="relative bg-gradient-to-r from-[#1E3A8A] to-[#60A5FA] py-20 text-center text-white shadow-lg"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Community Donation</h1>
        <p className="text-lg md:text-xl">A platform to give, share, and support those in need.</p>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6">
        
        {/* About Section */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-10 bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <h2 className="text-3xl font-semibold text-[#1E3A8A]">What is Community Donation?</h2>
          <p className="text-gray-600 mt-3 leading-relaxed">
            Community Donation is a platform where people can donate unused or extra items
            to those who need them. Whether it’s clothing, books, furniture, or food, your
            donations can positively impact someone's life.
          </p>
        </motion.section>

        {/* Why is it Needed? */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.9 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-10 bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <h2 className="text-3xl font-semibold text-[#1E3A8A]">Why Do We Need It?</h2>
          <p className="text-gray-600 mt-3 leading-relaxed">
            Many people struggle to afford basic necessities, while others have extra items
            they no longer use. This platform helps bridge that gap by connecting donors with recipients.
            It promotes <span className="text-[#10B981] font-semibold">sustainability, community support, and kindness</span>.
          </p>
        </motion.section>

        {/* Benefits Section - Now with Proper Bullets */}
        <motion.section 
          initial={{ opacity: 0, x: -100 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-10 bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
        >
          <h2 className="text-3xl font-semibold text-[#1E3A8A]">Benefits of Community Donation</h2>
          <ul className="list-disc ml-6 text-gray-600 mt-3 space-y-3">
            <li className="relative">
              <motion.span 
                whileHover={{ scale: 1.1, x: 10 }} 
                transition={{ duration: 0.3 }} 
                className="inline-block transition-transform duration-300 text-[#10B981] font-semibold"
              >
                Reduces waste
              </motion.span> by reusing items.
            </li>
            <li className="relative">
              <motion.span 
                whileHover={{ scale: 1.1, x: 10 }} 
                transition={{ duration: 0.3 }} 
                className="inline-block transition-transform duration-300 text-[#10B981] font-semibold"
              >
                Helps those in financial need.
              </motion.span>
            </li>
            <li className="relative">
              <motion.span 
                whileHover={{ scale: 1.1, x: 10 }} 
                transition={{ duration: 0.3 }} 
                className="inline-block transition-transform duration-300 text-[#10B981] font-semibold"
              >
                Strengthens community bonds.
              </motion.span>
            </li>
            <li className="relative">
              <motion.span 
                whileHover={{ scale: 1.1, x: 10 }} 
                transition={{ duration: 0.3 }} 
                className="inline-block transition-transform duration-300 text-[#10B981] font-semibold"
              >
                Encourages generosity
              </motion.span> and social responsibility.
            </li>
          </ul>
        </motion.section>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a 
            href="/donate" 
            className="bg-[#1E3A8A] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#174A9A] hover:scale-105 transition-transform duration-300"
          >
            Start Donating Now
          </a>
        </motion.div>

      </div>
    </div>
  );
};

export default Home;
