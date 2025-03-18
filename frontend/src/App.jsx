import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import DonateItem from "./pages/DonateItem";
import Community from "./pages/Community";
import DonationItemPage from "./pages/DonationItemPage";
import Profile from "./pages/Profile";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Import Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminDonations from "./pages/admin/AdminDonations";
import Admin from "./pages/admin/Admin";
// import LoadingAnimation from "./components/LoadingAnimation";
import Loader from "./components/Loader";

function App() {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const isAdmin = user?.isAdmin;
  const isApproved = user?.isApproved;

  // ✅ General User Protected Route
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    if (!isApproved && !isAdmin) {
      return <Navigate to="/community" replace />;
    }
    return children;
  };

  // ✅ Admin Protected Route
  const AdminRoute = ({ children }) => {
    if (!isLoggedIn || !isAdmin) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar />
        <div className="mt-10">
      <Routes>
          
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community />} />
          <Route path="/donation/:id" element={<DonationItemPage />} />

          {/* User Protected Routes */}
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/donate" element={<ProtectedRoute><DonateItem /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin/*" element={<AdminRoute><AdminRoutes /></AdminRoute>} />
        
      </Routes>
        </div>
    </Router>
  );
}

// ✅ Separate Component for Admin Routes
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="donations" element={<AdminDonations />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

// ✅ Wrap App with AuthProvider
const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
