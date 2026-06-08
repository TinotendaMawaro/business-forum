import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from './store/authStore';

// Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './pages/admin/Dashboard';
import { AdminDashboard, AdminMembers, AdminListings, AdminAdvertisements, AdminReports } from './pages/admin/Dashboard';
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
      <div className="min-h-screen bg-white text-slate-900 selection:bg-red-500/30">
        {isAuthenticated && user?.role !== 'admin' && <Navbar user={user} onLogout={logout} />}

        <ScrollToTop />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<ProductsServices />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth Routes */}
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} />} />
          <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/dashboard'} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Member Routes */}
          <Route element={isAuthenticated ? <Outlet /> : <Navigate to="/login" />}>
            <Route path="/dashboard" element={user?.role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Dashboard />} />
            <Route path="/marketplace" element={user?.role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Marketplace />} />
            <Route path="/suppliers" element={user?.role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <SupplierDirectory />} />
            <Route path="/my-listings" element={user?.role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <MyListings />} />
            <Route path="/quotations" element={user?.role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Quotations />} />
            <Route path="/profile" element={user?.role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Profile />} />
            <Route path="/forum" element={user?.role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <DiscussionForum />} />
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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default App;
