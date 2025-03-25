import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaTimes, FaUserCircle, FaMedal } from "react-icons/fa";
import NotificationBell from "./NotificationBell";

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
      <div className=" mx-auto flex items-center justify-between py-3 px-6 lg:w-full">
        
        {/* Mobile: Menu Button (Left) */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-2xl focus:outline-none"
          >
            <FaBars />
          </button>
        </div>

        {/* Logo (Left in Large Screens, Center in Small Screens) */}
        <div className="text-xl lg:text-2xl font-bold tracking-wide text-center md:text-left flex-1 md:flex-none md:w-auto">
          <Link to="/">
            Community<span className="text-blue-400">Donate</span>
          </Link>
        </div>

        {/* Right Section: Profile & Bell */}
        <div className="flex items-center space-x-4">
        {isLoggedIn && (
          <div className="bg-yellow-500 text-gray-900 px-3 py-1 rounded-lg shadow-md flex items-center text-sm md:text-base">
            <FaMedal className="mr-1 text-sm md:text-lg" />
            <span className="font-bold"><span className="hidden">Score:</span> {socialScore}</span>
          </div>
        )}
          {isLoggedIn && <NotificationBell />}

          {isLoggedIn && (
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
          )}
          {!isLoggedIn && (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="hover:text-green-400">
                Register
              </Link>
            </>
          )}

        </div>

        {/* Desktop Navigation (Centered in Large Screens) */}
        <div className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
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

          {isLoggedIn && isApproved && (
            <Link to="/donate" className="hover:text-blue-400 transition duration-300">
              Donate
            </Link>
          )}

          {isLoggedIn && isAdmin && (
            <Link to="/admin" className="hover:text-red-400 transition duration-300">
              Admin
            </Link>
          )}
        </div>
      </div>

      {/* Full-Screen Mobile Drawer Menu (Slide from Left) */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-95 transform w-2/3 max-w-xs ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center px-6 py-4">
          <h2 className="text-2xl font-bold text-white">Menu</h2>
          <button onClick={() => setMenuOpen(false)} className="text-3xl text-white">
            <FaTimes />
          </button>
        </div>

        <div className="flex flex-col text-center text-xl space-y-6 mt-10">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">
            Home
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">
            About
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">
            Contact
          </Link>
          <Link to="/community" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">
            Community
          </Link>

          {isLoggedIn && isApproved && (
            <Link to="/donate" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">
              Donate
            </Link>
          )}

          {isLoggedIn && isAdmin && (
            <Link to="/admin" onClick={() => setMenuOpen(false)} className="hover:text-red-400">
              Admin
            </Link>
          )}

          {isLoggedIn && (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">
                Profile
              </Link>
              <button onClick={handleLogout} className="text-red-400 hover:text-red-500">
                Logout
              </button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-blue-400">
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="hover:text-green-400">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
