import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Users, ShoppingBag, Megaphone, FileText, LogOut, Settings, Home } from 'lucide-react';
import useAuthStore from '../../store/authStore';

function AdminSidebar() {
  const { logout } = useAuthStore();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Members', path: '/admin/members' },
    { icon: ShoppingBag, label: 'Listings', path: '/admin/listings' },
    { icon: Megaphone, label: 'Advertisements', path: '/admin/advertisements' },
    { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-red-800 text-white shadow-lg z-40">
      <div className="p-6 border-b border-red-700">
        <Link to="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white text-red-700 rounded-full flex items-center justify-center font-bold text-xl">
            H
          </div>
          <div>
            <div className="text-sm font-bold">HMFBF Admin</div>
            <div className="text-xs text-red-200">Control Panel</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-700 transition-colors text-white"
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="border-t border-red-700 p-4 space-y-2">
        <Link
          to="/profile"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-700 transition-colors text-white"
        >
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-700 transition-colors text-white text-left"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
