import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes, FaUserCircle, FaMedal } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const isAdmin = user?.isAdmin;
  const isApproved = user?.isApproved;
  const socialScore = user?.socialScore || 0;
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white fixed top-0 left-0 w-full shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo/Home Link */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Community<span className="text-blue-400">Donate</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-blue-400 transition duration-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-400 transition duration-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-400 transition duration-300">
            Contact
          </Link>
          <Link to="/community" className="hover:text-blue-400 transition duration-300">
            Community
          </Link>

          {/* If user is logged in */}
          {isLoggedIn && (
            <>
              {isApproved && (
                <Link to="/donate" className="hover:text-blue-400 transition duration-300">
                  Donate
                </Link>
              )}
              {isAdmin && (
                <Link to="/admin" className="hover:text-red-400 transition duration-300">
                  Admin
                </Link>
              )}

              {/* Social Score Display */}
              <div className="flex items-center bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg shadow-md">
                <FaMedal className="mr-2 text-xl" />
                <span className="font-bold">Score: {socialScore}</span>
              </div>

              {/* Profile Icon with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="focus:outline-none"
                >
                  <FaUserCircle className="text-xl text-blue-400 hover:text-blue-500 transition duration-300" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-md shadow-lg py-2">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-blue-500 hover:bg-gray-200"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* If user is NOT logged in */}
          {!isLoggedIn && (
            <>
              <Link to="/login" className="hover:text-blue-400 transition duration-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-green-400 transition duration-300">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-center py-4 absolute w-full top-full left-0">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-400">
            Home
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-400">
            About
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-400">
            Contact
          </Link>
          <Link to="/community" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-400">
            Community
          </Link>

          {isLoggedIn && (
            <>
              {isApproved && (
                <Link to="/donate" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-400">
                  Donate
                </Link>
              )}
              {isAdmin && (
                <Link to="/admin" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-red-400">
                  Admin
                </Link>
              )}

              {/* Mobile Social Score Display */}
              <div className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg shadow-md my-2">
                <FaMedal className="inline mr-2 text-lg" />
                <span className="font-bold">Score: {socialScore}</span>
              </div>

              {/* Mobile Profile Dropdown */}
              <div className="mt-2">
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 text-blue-400 hover:text-blue-500"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full py-2 text-red-400 hover:text-red-500"
                >
                  Logout
                </button>
              </div>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-blue-400">
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-green-400">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
