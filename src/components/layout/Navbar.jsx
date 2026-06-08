import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogOut, User, Home, Store, Users, FileText, MessageSquare } from 'lucide-react';

function Navbar({ user, onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 font-bold tracking-tight text-slate-900">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-rose-500 text-sm text-white" />
            <span>Platform</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <Link to="/dashboard" className="flex items-center gap-2 transition-colors hover:text-red-600">
              <Home size={16} /> Dashboard
            </Link>
            <Link to="/marketplace" className="flex items-center gap-2 transition-colors hover:text-red-600">
              <Store size={16} /> Marketplace
            </Link>
            <Link to="/suppliers" className="flex items-center gap-2 transition-colors hover:text-red-600">
              <Users size={16} /> Suppliers
            </Link>
            <Link to="/quotations" className="flex items-center gap-2 transition-colors hover:text-red-600">
              <FileText size={16} /> Quotations
            </Link>
            <Link to="/forum" className="flex items-center gap-2 transition-colors hover:text-red-600">
              <MessageSquare size={16} /> Forum
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
                {user?.avatar}
              </div>
              <div className="text-sm">
                <div className="font-semibold text-slate-900">{user?.name}</div>
                <div className="text-xs text-slate-500">{user?.category}</div>
              </div>
            </div>
            <Link to="/profile" className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-red-600">
              <User size={18} />
            </Link>
            <button onClick={onLogout} className="rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-red-600">
              <LogOut size={18} />
            </button>
          </div>

          <button className="md:hidden rounded-lg p-2 text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white/90 md:hidden">
          <div className="space-y-1 px-4 py-4">
            <Link to="/dashboard" className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>
              <Home size={16} /> Dashboard
            </Link>
            <Link to="/marketplace" className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>
              <Store size={16} /> Marketplace
            </Link>
            <Link to="/suppliers" className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>
              <Users size={16} /> Suppliers
            </Link>
            <Link to="/my-listings" className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>
              <Store size={16} /> My Listings
            </Link>
            <Link to="/quotations" className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>
              <FileText size={16} /> Quotations
            </Link>
            <Link to="/forum" className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>
              <MessageSquare size={16} /> Forum
            </Link>
            <Link to="/profile" className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>
              <User size={16} /> Profile
            </Link>
            <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="flex w-full items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
