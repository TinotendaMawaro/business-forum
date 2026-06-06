import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { mockMembers, mockProducts, mockQuotations, mockTransactions } from '../../data/mockData';
import {
  BarChart3,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Package,
  Eye,
  Download,
  Plus,
  MessageSquare,
  FileText,
  Store,
} from 'lucide-react';

function Dashboard() {
  const { user } = useAuthStore();

  const stats = useMemo(() => {
    const purchases = mockTransactions.filter((txn) => txn.member === user?.name).reduce((sum, txn) => sum + txn.amount, 0);
    const sales = mockTransactions.filter((txn) => txn.type === 'sale' && txn.member === user?.name).reduce((sum, txn) => sum + txn.amount, 0);
    return [
      { label: 'Total Purchases', value: `$${purchases.toLocaleString()}`, icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50' },
      { label: 'Total Sales', value: `$${sales.toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
      { label: 'Active Listings', value: mockProducts.length, icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
      { label: 'RFQs Sent', value: mockQuotations.length, icon: Eye, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];
  }, [user]);

  const quarterlyData = useMemo(
    () => [
      { quarter: 'Q1 2024', sales: 420, percentage: 52 },
      { quarter: 'Q2 2024', sales: 650, percentage: 78 },
      { quarter: 'Q3 2024', sales: 870, percentage: 100 },
      { quarter: 'Q4 2024', sales: 0, percentage: 0 },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}! 👋</h1>
            <p className="text-gray-600">
              {user?.role === 'admin' ? 'Administrator' : 'Member'} since {user?.joinDate || '2024'} • {user?.category || 'General'}
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Link
              to="/marketplace"
              className="flex-1 md:flex-none px-6 py-2 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800 transition flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Browse Marketplace
            </Link>
            <Link
              to="/quotations"
              className="flex-1 md:flex-none px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition"
            >
              <span className="inline-flex items-center gap-2"><FileText size={18} /> New RFQ</span>
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-700 to-red-800 text-white rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-90 mb-1">Account Status</div>
              <div className="text-2xl font-bold capitalize">{user?.status || 'Active'}</div>
            </div>
            <div className="text-4xl opacity-20">🎯</div>
          </div>
          {(user?.status === 'pending' || user?.role === 'admin') && (
            <p className="mt-4 text-sm text-red-100">
              {user?.role === 'admin' ? 'Admin account has full platform management access.' : 'Your registration is under review. You will be notified once approved by an administrator.'}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color}`}>
                    <Icon size={28} />
                  </div>
                  <div className="text-sm text-gray-500">
                    <TrendingUp size={16} className="text-green-600" />
                  </div>
                </div>
                <div className="text-gray-600 text-sm font-medium mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Sales by Quarter</h2>
                <p className="text-sm text-gray-600">2024 Performance</p>
              </div>
              <Link to="#" className="text-red-700 hover:text-red-800 font-medium text-sm flex items-center gap-2">
                <Download size={16} /> Export
              </Link>
            </div>
            <div className="space-y-4">
              {quarterlyData.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">{item.quarter}</span>
                    <span className="text-sm font-bold text-gray-900">${item.sales}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-red-700 h-full rounded-full transition-all duration-500" style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t flex justify-between">
              <div>
                <div className="text-sm text-gray-600">Total 2024 Sales</div>
                <div className="text-2xl font-bold text-gray-900">$1,940</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Avg. Quarterly</div>
                <div className="text-2xl font-bold text-green-600">↑ 35%</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/marketplace"
                className="block px-4 py-3 bg-red-50 text-red-700 rounded-lg font-medium hover:bg-red-100 transition text-center"
              >
                📦 Browse Products
              </Link>
              <Link
                to="/suppliers"
                className="block px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition text-center"
              >
                👥 Find Suppliers
              </Link>
              <Link
                to="/my-listings"
                className="block px-4 py-3 bg-purple-50 text-purple-700 rounded-lg font-medium hover:bg-purple-100 transition text-center"
              >
                📝 My Listings
              </Link>
              <Link
                to="/forum"
                className="block px-4 py-3 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition text-center flex items-center justify-center gap-2"
              >
                <MessageSquare size={18} /> Discussion Forum
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Quotations</h2>
            <Link to="/quotations" className="text-red-700 hover:text-red-800 font-medium text-sm">
              View All →
            </Link>
          </div>
          {mockQuotations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Product</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Supplier</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {mockQuotations.slice(0, 5).map((quote) => (
                    <tr key={quote.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{quote.product}</td>
                      <td className="px-4 py-3 text-gray-600">{quote.supplier}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : quote.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{quote.date}</td>
                      <td className="px-4 py-3">
                        <button className="text-red-700 hover:text-red-800 font-medium text-sm">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              No quotations yet.{' '}
              <Link to="/quotations" className="text-red-700 font-bold hover:underline">
                Request one →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
