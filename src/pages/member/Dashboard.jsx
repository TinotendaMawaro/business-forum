import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { mockProducts, mockQuotations, mockTransactions } from '../../data/mockData';
import {
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
    const purchases = mockTransactions
      .filter((txn) => txn.member === user?.name)
      .reduce((sum, txn) => sum + txn.amount, 0);
    const sales = mockTransactions
      .filter((txn) => txn.type === 'sale' && txn.member === user?.name)
      .reduce((sum, txn) => sum + txn.amount, 0);
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
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 page-enter">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Welcome back, {user?.name}
            </h1>
            <p className="mt-1 text-slate-500">
              {user?.role === 'admin' ? 'Administrator' : 'Member'} since {user?.joinDate || '2024'} •{' '}
              {user?.category || 'General'}
            </p>
          </div>
          <div className="flex w-full gap-3 md:w-auto">
            <Link
              to="/marketplace"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Plus size={16} /> Browse Marketplace
            </Link>
            <Link
              to="/quotations"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <FileText size={16} /> New RFQ
            </Link>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Account Status
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-900 capitalize">{user?.status || 'Active'}</div>
          </div>
          <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 md:flex">
            <Store size={20} />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className={`rounded-xl p-3 ${stat.bg}`}>
                    <Icon size={22} className={stat.color} />
                  </div>
                  <span className="text-xs font-semibold text-green-600">+12%</span>
                </div>
                <div className="mt-5 text-sm font-medium text-slate-500">{stat.label}</div>
                <div className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Sales by Quarter</h2>
                <p className="text-sm text-slate-500">2024 Performance</p>
              </div>
              <Link
                to="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 transition hover:text-red-800"
              >
                <Download size={16} /> Export
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {quarterlyData.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-900">{item.quarter}</span>
                    <span className="text-sm font-bold text-slate-900">${item.sales}</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-slate-900 transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
              <div>
                <div className="text-sm text-slate-500">Total 2024 Sales</div>
                <div className="text-2xl font-bold text-slate-900">$1,940</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500">Avg. Quarterly</div>
                <div className="text-2xl font-bold text-green-600">↑ 35%</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
            <div className="mt-4 space-y-3">
              <Link
                to="/marketplace"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
              >
                <ShoppingCart size={18} />
                Browse Products
              </Link>
              <Link
                to="/suppliers"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
              >
                <Store size={18} />
                Find Suppliers
              </Link>
              <Link
                to="/my-listings"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
              >
                <Package size={18} />
                My Listings
              </Link>
              <Link
                to="/forum"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
              >
                <MessageSquare size={18} />
                Discussion Forum
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Quotations</h2>
              <p className="text-sm text-slate-500">Latest RFQ activity across suppliers</p>
            </div>
            <Link
              to="/quotations"
              className="text-sm font-semibold text-red-700 transition hover:text-red-800"
            >
              View All →
            </Link>
          </div>

          {mockQuotations.length === 0 ? (
            <div className="mt-10 text-center text-slate-500">
              No quotations yet.{' '}
              <Link to="/quotations" className="font-semibold text-red-700 hover:text-red-800">
                Request one →
              </Link>
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-widest text-slate-500">
                    <th className="px-4 py-3 font-semibold">Product</th>
                    <th className="px-4 py-3 font-semibold">Supplier</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockQuotations.slice(0, 5).map((quote) => (
                    <tr key={quote.id} className="transition hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-900">{quote.product}</td>
                      <td className="px-4 py-3 text-slate-600">{quote.supplier}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                            quote.status === 'pending'
                              ? 'bg-yellow-50 text-yellow-700'
                              : quote.status === 'accepted'
                                ? 'bg-green-50 text-green-700'
                                : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{quote.date}</td>
                      <td className="px-4 py-3">
                        <button className="font-semibold text-red-700 transition hover:text-red-800">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
