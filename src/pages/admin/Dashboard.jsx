import React, { useState, useMemo } from 'react';
import { Link, Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/layout/AdminSidebar';
import useAuthStore from '../../store/authStore';
import { mockMembers, mockProducts, mockAdvertisingPackages, mockTransactions } from '../../data/mockData';
import EmptyState from '../../components/ui/EmptyState';
import { Users, ShoppingBag, Megaphone, DollarSign, CheckCircle2, XCircle, RotateCcw, Search, Download } from 'lucide-react';

function AdminDashboard() {
  const { user, members, approveMember, rejectMember, reactivateMember, deactivateMember } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const stats = useMemo(() => {
    const allMembers = members.length ? members : mockMembers;
    return [
      { label: 'Total Members', value: allMembers.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', change: '+12%' },
      { label: 'Active Listings', value: mockProducts.length, icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50', change: '+8%' },
      { label: 'Total Revenue', value: '$24,500', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50', change: '+15%' },
      { label: 'Pending Approvals', value: allMembers.filter((member) => member.status === 'pending').length, icon: Megaphone, color: 'text-orange-600', bg: 'bg-orange-50', change: 'Action needed' },
    ];
  }, [members]);

  const allMembers = members.length ? members : mockMembers;
  const filteredMembers = useMemo(() => {
    return allMembers.filter((member) => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || member.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchTerm, statusFilter, categoryFilter, allMembers]);

  const categories = useMemo(() => Array.from(new Set(allMembers.map((member) => member.category))), [allMembers]);
  const pendingMembers = useMemo(() => filteredMembers.filter((member) => member.status === 'pending'), [filteredMembers]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage the Heartfelt Marketplace Fellowship Business Forum platform</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bg} rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition`}>
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`${stat.color}`} size={32} />
                <span className="text-xs font-bold text-gray-600">{stat.change}</span>
              </div>
              <div className="text-gray-700 text-sm font-medium mb-1">{stat.label}</div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-lg font-bold text-gray-900">Pending Member Approvals</h2>
                <Link to="/admin/members" className="text-red-700 hover:text-red-800 font-medium text-sm">
                  View All →
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search members..." className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700" />
                </div>
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700">
                  <option value="all">All statuses</option>
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="rejected">Rejected</option>
                </select>
                <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700">
                  <option value="all">All categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {pendingMembers.length > 0 ? (
                <div className="space-y-3">
                  {pendingMembers.map((member) => (
                    <div key={member.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50/40 transition">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 text-orange-700 rounded-lg flex items-center justify-center font-bold text-sm">{member.avatar}</div>
                        <div>
                          <div className="font-semibold text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-600">{member.category}</div>
                          <div className="text-xs text-gray-500">Joined {member.joinDate}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => approveMember(member.id)} className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 text-sm flex items-center gap-2">
                          <CheckCircle2 size={16} /> Approve
                        </button>
                        <button onClick={() => rejectMember(member.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 text-sm flex items-center gap-2">
                          <XCircle size={16} /> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState icon="✅" title="All caught up" subtitle="No pending approvals at the moment." />
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="space-y-3">
                {mockTransactions.slice(0, 5).map((txn) => (
                  <div key={txn.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">📋</div>
                      <div>
                        <div className="font-semibold text-gray-900">{txn.type === 'purchase' ? 'New Purchase' : txn.type === 'sale' ? 'New Sale' : 'Payment received'}</div>
                        <div className="text-sm text-gray-600">by {txn.member}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">${txn.amount}</div>
                      <div className="text-xs text-gray-500">{txn.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link to="/admin/members" className="block px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition font-medium text-center">
                  Manage Members
                </Link>
                <Link to="/admin/listings" className="block px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition font-medium text-center">
                  Manage Listings
                </Link>
                <Link to="/admin/advertisements" className="block px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition font-medium text-center">
                  Manage Ads
                </Link>
                <Link to="/admin/reports" className="block px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition font-medium text-center">
                  View Reports
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Database</span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">API</span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Storage</span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Cache</span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-700 to-red-800 text-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold mb-2">HMFBF Platform</h3>
              <p className="text-sm text-red-100 mb-4">Marketplace Fellowship Business Forum - Zimbabwe's trusted business marketplace</p>
              <div className="text-xs space-y-1 text-red-200">
                <div>Version: 1.0.0</div>
                <div>Last Updated: 6 June 2024</div>
                <div>Admin: {user?.name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminMembers() {
  const { members, approveMember, rejectMember, reactivateMember, deactivateMember } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const allMembers = members.length ? members : mockMembers;
  const filtered = useMemo(() => {
    return allMembers.filter((member) => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.email.toLowerCase().includes(searchTerm.toLowerCase()) || member.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || member.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchTerm, statusFilter, categoryFilter, allMembers]);

  const categories = useMemo(() => Array.from(new Set(allMembers.map((m) => m.category))), [allMembers]);

  const statusBadge = (status) => {
    if (status === 'active') return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">Active</span>;
    if (status === 'pending') return <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">Pending</span>;
    if (status === 'inactive') return <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-200 text-gray-800">Inactive</span>;
    if (status === 'rejected') return <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">Rejected</span>;
    return <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">{status}</span>;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Members</h1>
            <p className="text-gray-600">Approve, suspend, or manage member accounts.</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search by name, email, or category..." className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700" />
            </div>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700">
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="rejected">Rejected</option>
            </select>
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700">
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Member</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Category</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Joined</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 text-red-700 rounded-lg flex items-center justify-center font-bold text-sm">{member.avatar}</div>
                        <div>
                          <div className="font-semibold text-gray-900">{member.name}</div>
                          <div className="text-xs text-gray-600">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{member.category}</td>
                    <td className="px-4 py-3">{statusBadge(member.status)}</td>
                    <td className="px-4 py-3 text-gray-600">{member.joinDate}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {member.status === 'pending' && (
                          <>
                            <button onClick={() => approveMember(member.id)} className="px-3 py-1 bg-green-600 text-white rounded text-xs font-bold hover:bg-green-700">Approve</button>
                            <button onClick={() => rejectMember(member.id)} className="px-3 py-1 bg-red-600 text-white rounded text-xs font-bold hover:bg-red-700">Reject</button>
                          </>
                        )}
                        {member.status === 'active' && (
                          <button onClick={() => deactivateMember(member.id)} className="px-3 py-1 bg-gray-700 text-white rounded text-xs font-bold hover:bg-gray-800">Deactivate</button>
                        )}
                        {(member.status === 'inactive' || member.status === 'rejected') && (
                          <button onClick={() => reactivateMember(member.id)} className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700">Reactivate</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && <EmptyState icon="🔍" title="No members found" subtitle="Try adjusting your filters." />}
        </div>
      </div>
    </div>
  );
}

function AdminListings() {
  const listings = useMemo(() => mockProducts, []);
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Listings</h1>
            <p className="text-gray-600">Review and moderate marketplace listings.</p>
          </div>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Download size={16} /> Export
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Product</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Seller</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Category</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Price</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {listings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{listing.name}</td>
                    <td className="px-4 py-3 text-gray-700">{listing.seller}</td>
                    <td className="px-4 py-3 text-gray-700">{listing.category}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">${listing.price}{listing.priceUnit ? `/${listing.priceUnit}` : ''}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <button className="px-3 py-1 bg-green-600 text-white rounded text-xs font-bold hover:bg-green-700">Approve</button>
                        <button className="px-3 py-1 bg-red-600 text-white rounded text-xs font-bold hover:bg-red-700">Remove</button>
                        <button className="px-3 py-1 border border-gray-300 rounded text-xs font-bold text-gray-700 hover:bg-gray-50">View</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {listings.length === 0 && <EmptyState icon="📦" title="No listings" subtitle="There are no listings waiting for moderation." />}
        </div>
      </div>
    </div>
  );
}

function AdminAdvertisements() {
  const packages = useMemo(() => mockAdvertisingPackages, []);
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Advertisements</h1>
            <p className="text-gray-600">Review and manage ad bookings and campaigns.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Package</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Price</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Period</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Bookings</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {packages.map((ad) => (
                  <tr key={ad.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{ad.icon}</span>
                        <div>
                          <div className="font-semibold text-gray-900">{ad.name}</div>
                          <div className="text-xs text-gray-600">{ad.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">${ad.price}</td>
                    <td className="px-4 py-3 text-gray-700">{ad.period}</td>
                    <td className="px-4 py-3 text-gray-700">{Math.floor(Math.random() * 20) + 1}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <button className="px-3 py-1 bg-green-600 text-white rounded text-xs font-bold hover:bg-green-700">Approve</button>
                        <button className="px-3 py-1 border border-gray-300 rounded text-xs font-bold text-gray-700 hover:bg-gray-50">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {packages.length === 0 && <EmptyState icon="📣" title="No ad packages" subtitle="Configure your advertising offerings for members." />}
        </div>
      </div>
    </div>
  );
}

function AdminReports() {
  const totalRevenue = useMemo(() => mockTransactions.reduce((sum, txn) => sum + txn.amount, 0), []);
  const totalTransactions = mockTransactions.length;
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Sales, revenue, and membership insights.</p>
          </div>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Download size={16} /> Export Report
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="text-sm text-gray-600">Total Revenue</div>
            <div className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="text-sm text-gray-600">Transactions</div>
            <div className="text-2xl font-bold text-gray-900">{totalTransactions}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="text-sm text-gray-600">Total Members</div>
            <div className="text-2xl font-bold text-gray-900">{mockMembers.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
            <div className="text-sm text-gray-600">Active Now</div>
            <div className="text-2xl font-bold text-green-600">{mockMembers.filter((m) => m.status === 'active').length}</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Member</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Amount</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {mockTransactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-700">#{txn.id}</td>
                    <td className="px-4 py-3 text-gray-700 capitalize">{txn.type}</td>
                    <td className="px-4 py-3 text-gray-700">{txn.member}</td>
                    <td className="px-4 py-3 font-bold text-gray-900">${txn.amount}</td>
                    <td className="px-4 py-3 text-gray-700">{txn.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminLayout() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 min-h-screen bg-slate-50">
        <Outlet />
      </div>
    </div>
  );
}

export { AdminDashboard, AdminMembers, AdminListings, AdminAdvertisements, AdminReports };
export default AdminLayout;