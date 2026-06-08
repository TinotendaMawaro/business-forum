import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Users, ShoppingBag, Megaphone, FileText, LogOut, Settings, Home, Menu, X } from 'lucide-react';
import useAuthStore from '../../store/authStore';

function AdminSidebar() {
  const { logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Members', path: '/admin/members' },
    { icon: ShoppingBag, label: 'Listings', path: '/admin/listings' },
    { icon: Megaphone, label: 'Advertisements', path: '/admin/advertisements' },
    { icon: BarChart3, label: 'Reports', path: '/admin/reports' },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-white p-2 shadow md:hidden"
      >
        <Menu size={22} className="text-slate-700" />
      </button>

      <div
        className={`fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-slate-200 bg-white shadow-sm z-50 transition-transform duration-200 md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-rose-500 text-sm font-bold text-white" />
            <div>
              <div className="text-sm font-bold tracking-tight text-slate-900">Platform</div>
              <div className="text-xs font-medium text-slate-500">Admin</div>
            </div>
          </Link>
          <button onClick={() => setOpen(false)} className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-50">
            <X size={20} />
          </button>
        </div>

        <nav className="px-4 py-6">
          <div className="mb-2 px-4 text-[11px] font-semibold uppercase tracking-widest text-slate-500">Menu</div>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-red-600"
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="border-t border-slate-200 p-4">
          <Link to="/profile" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-red-600">
            <Settings size={18} />
            <span>Settings</span>
          </Link>
          <button onClick={logout} className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-50">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
