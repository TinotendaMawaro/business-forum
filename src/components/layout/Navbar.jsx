import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogOut, User, Home, Store, Users, FileText, MessageSquare, Settings } from 'lucide-react';

function Navbar({ user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-700 text-white rounded-full flex items-center justify-center font-bold text-xl">
                H
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-gray-900">Heartfelt Marketplace</div>
                <div className="text-xs text-gray-500 uppercase">Fellowship Business Forum</div>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/dashboard" className="text-gray-700 hover:text-red-700 text-sm font-medium flex items-center gap-2">
                <Home size={18} /> Dashboard
              </Link>
              <Link to="/marketplace" className="text-gray-700 hover:text-red-700 text-sm font-medium flex items-center gap-2">
                <Store size={18} /> Marketplace
              </Link>
              <Link to="/suppliers" className="text-gray-700 hover:text-red-700 text-sm font-medium flex items-center gap-2">
                <Users size={18} /> Suppliers
              </Link>
              <Link to="/quotations" className="text-gray-700 hover:text-red-700 text-sm font-medium flex items-center gap-2">
                <FileText size={18} /> Quotations
              </Link>
              <Link to="/forum" className="text-gray-700 hover:text-red-700 text-sm font-medium flex items-center gap-2">
                <MessageSquare size={18} /> Forum
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold text-sm">
                  {user?.avatar}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.category}</div>
                </div>
              </div>
              <Link to="/profile" className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <User size={20} />
              </Link>
              <button onClick={onLogout} className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <LogOut size={20} />
              </button>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-50 border-t">
            <div className="px-4 py-4 space-y-3">
              <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Home size={18} /> Dashboard
              </Link>
              <Link to="/marketplace" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Store size={18} /> Marketplace
              </Link>
              <Link to="/suppliers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Users size={18} /> Suppliers
              </Link>
              <Link to="/my-listings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Store size={18} /> My Listings
              </Link>
              <Link to="/quotations" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <FileText size={18} /> Quotations
              </Link>
              <Link to="/forum" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <MessageSquare size={18} /> Forum
              </Link>
              <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <User size={18} /> Profile
              </Link>
              <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-red-700 hover:bg-red-50 rounded flex items-center gap-2">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;