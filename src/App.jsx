import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import useAuthStore from './store/authStore';

// Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout, { AdminDashboard, AdminMembers, AdminListings, AdminAdvertisements, AdminReports } from './pages/admin/Dashboard';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ForgotPassword, About, ProductsServices, Events, Blog, Contact } from './pages/public/index';
import Dashboard from './pages/member/Dashboard';
import Marketplace from './pages/member/Marketplace';
import SupplierDirectory from './pages/member/SupplierDirectory';
import { Quotations, MyListings, Profile, DiscussionForum } from './pages/member/index';

function App() {
  const { user, isAuthenticated, logout } = useAuthStore();

  const AdminRoutes = () => {
    if (!isAuthenticated || user?.role !== 'admin') {
      return <Navigate to="/login" replace />;
    }
    return <AdminLayout />;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {isAuthenticated && user?.role !== 'admin' && <Navbar user={user} onLogout={logout} />}

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<ProductsServices />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth Routes */}
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Member Routes */}
          <Route element={isAuthenticated ? <Outlet /> : <Navigate to="/login" />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/suppliers" element={<SupplierDirectory />} />
            <Route path="/my-listings" element={<MyListings />} />
            <Route path="/quotations" element={<Quotations />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forum" element={<DiscussionForum />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoutes />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="members" element={<AdminMembers />} />
            <Route path="listings" element={<AdminListings />} />
            <Route path="advertisements" element={<AdminAdvertisements />} />
            <Route path="reports" element={<AdminReports />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {!isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;
