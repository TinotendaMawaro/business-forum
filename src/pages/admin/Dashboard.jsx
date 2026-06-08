import React, { useState, useMemo } from 'react';
import { Link, Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/layout/AdminSidebar';
import useAuthStore from '../../store/authStore';
import { mockMembers, mockProducts, mockTransactions } from '../../data/mockData';
import EmptyState from '../../components/ui/EmptyState';
import { Users, ShoppingBag, Megaphone, DollarSign, CheckCircle2, XCircle, RotateCcw, Search, Download, Activity } from 'lucide-react';

const statsConfig = [
  { key: 'members', label: 'Total Members', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { key: 'listings', label: 'Active Listings', icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
  { key: 'revenue', label: 'Total Revenue', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
  { key: 'pending', label: 'Pending Approvals', icon: Megaphone, color: 'text-orange-600', bg: 'bg-orange-50' },
];

function useAdminStats(members) {
  return useMemo(() => {
    const allMembers = members.length ? members : mockMembers;
    return [
      { key: 'members', value: allMembers.length, change: '+12%' },
      { key: 'listings', value: mockProducts.length, change: '+8%' },
      { key: 'revenue', value: '$24,500', change: '+15%' },
      { key: 'pending', value: allMembers.filter((member) => member.status === 'pending').length, change: 'Action needed' },
    ];
  }, [members]);
}

function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="ml-64">
        <Outlet />
      </div>
    </div>
  );
}

function AdminDashboard() {
  const { user, members, approveMember, rejectMember, reactivateMember, deactivateMember } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const stats = useAdminStats(members);

  const allMembers = members.length ? members : mockMembers;
  const filteredMembers = useMemo(() => {
    return allMembers.filter((member) => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || member.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchTerm, statusFilter, categoryFilter, allMembers]);
  const categories = useMemo(() => Array.from(new Set(filteredMembers.map((member) => member.category))), [filteredMembers]);
  const pendingMembers = useMemo(() => filteredMembers.filter((member) => member.status === 'pending'), [filteredMembers]);

  return (
    <div>
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Platform overview and member management</p>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const config = statsConfig.find((item) => item.key === stat.key);
            const Icon = config.icon;
            return (
              <div key={stat.key} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <div className={`rounded-xl p-3 ${config.bg}`}>
                    <Icon size={22} className={config.color} />
                  </div>
                  <span className="text-xs font-semibold text-green-600">{stat.change}</span>
                </div>
                <div className="mt-5 text-sm font-medium text-slate-500">{config.label}</div>
                <div className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between p-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Pending Member Approvals</h2>
                  <p className="text-sm text-slate-500">Members waiting for review</p>
                </div>
                <Link to="/admin/members" className="text-sm font-semibold text-red-700 transition hover:text-red-800">View All →</Link>
              </div>

              <div className="px-6 pb-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                    <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search members..." className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500" />
                  </div>
                  <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500">
                    <option value="all">All statuses</option>
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500">
                    <option value="all">All categories</option>
                    {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                  </select>
                </div>

                <div className="mt-4">
                  {pendingMembers.length > 0 ? (
                    <div className="space-y-3">
                      {pendingMembers.map((member) => (
                        <div key={member.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-red-200 hover:bg-red-50/40">
                          <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-sm font-bold text-orange-700">{member.avatar}</div>
                            <div>
                              <div className="font-semibold text-slate-900">{member.name}</div>
                              <div className="text-sm text-slate-500">{member.category}</div>
                              <div className="text-xs text-slate-400">Joined {member.joinDate}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => approveMember(member.id)} className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-700"><CheckCircle2 size={16} /> Approve</button>
                            <button onClick={() => rejectMember(member.id)} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-700"><XCircle size={16} /> Reject</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState icon="✅" title="All caught up" subtitle="No pending approvals at the moment." />
                  )}
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between p-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
                  <p className="text-sm text-slate-500">Latest platform events</p>
                </div>
                <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="px-6 pb-6">
                <div className="space-y-3">
                  {mockTransactions.slice(0, 5).map((txn) => (
                    <div key={txn.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">📋</div>
                        <div>
                          <div className="font-semibold text-slate-900">{txn.type === 'purchase' ? 'New Purchase' : txn.type === 'sale' ? 'New Sale' : 'Payment received'}</div>
                          <div className="text-sm text-slate-500">by {txn.member}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-slate-900">${txn.amount}</div>
                        <div className="text-xs text-slate-400">{txn.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
                <div className="mt-4 space-y-3">
                  <Link to="/admin/members" className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100">Manage Members</Link>
                  <Link to="/admin/listings" className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100">Manage Listings</Link>
                  <Link to="/admin/advertisements" className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100">Manage Ads</Link>
                  <Link to="/admin/reports" className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100">View Reports</Link>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-bold text-slate-900">System Status</h2>
                <div className="mt-4 space-y-3">
                  {[
                    { label: 'Database', status: 'Operational' },
                    { label: 'API', status: 'Operational' },
                    { label: 'Storage', status: 'Operational' },
                    { label: 'Cache', status: 'Operational' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
                      <span className="text-sm font-medium text-slate-700">{item.label}</span>
                      <span className="inline-flex items-center gap-2 text-xs font-semibold text-green-700">
                        <span className="h-2 w-2 rounded-full bg-green-500" /> {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-900 bg-slate-950 p-6 text-white shadow-xl">
              <div className="flex items-center gap-3">
                <Activity size={18} className="text-red-400" />
                <div>
                  <div className="text-sm font-semibold text-white">Platform</div>
                  <div className="text-xs text-slate-400">Heartfelt Marketplace</div>
                </div>
              </div>
              <div className="mt-4 space-y-1 text-xs text-slate-400">
                <div>Version 1.0.0</div>
                <div>Last Updated: 6 June 2024</div>
                <div>Admin: {user?.name}</div>
              </div>
            </section>
          </aside>
        </div>
      </main>
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
    if (status === 'active') return <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">Active</span>;
    if (status === 'pending') return <span className="inline-flex rounded-full bg-yellow-50 px-3 py-1 text-xs font-bold text-yellow-700">Pending</span>;
    if (status === 'inactive') return <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">Inactive</span>;
    if (status === 'rejected') return <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">Rejected</span>;
    return <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{status}</span>;
  };

  return (
    <div>
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manage Members</h1>
          <p className="mt-1 text-sm text-slate-500">Approve, suspend, or manage member accounts</p>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
          <div />
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
            <Download size={16} /> Export
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search by name, email, or category..." className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500" />
              </div>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500">
                <option value="all">All statuses</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="rejected">Rejected</option>
              </select>
              <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500">
                <option value="all">All categories</option>
                {categories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-widest text-slate-500">
                  <th className="px-6 py-3 font-semibold">Member</th>
                  <th className="px-6 py-3 font-semibold">Category</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Joined</th>
                  <th className="px-6 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((member) => (
                  <tr key={member.id} className="transition hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700">{member.avatar}</div>
                        <div>
                          <div className="font-semibold text-slate-900">{member.name}</div>
                          <div className="text-xs text-slate-500">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{member.category}</td>
                    <td className="px-6 py-4">{statusBadge(member.status)}</td>
                    <td className="px-6 py-4 text-slate-600">{member.joinDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        {member.status === 'pending' && (
                          <>
                            <button onClick={() => approveMember(member.id)} className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-green-700"><CheckCircle2 size={14} /> Approve</button>
                            <button onClick={() => rejectMember(member.id)} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-700"><XCircle size={14} /> Reject</button>
                          </>
                        )}
                        {member.status === 'active' && (
                          <button onClick={() => deactivateMember(member.id)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"><XCircle size={14} /> Deactivate</button>
                        )}
                        {(member.status === 'inactive' || member.status === 'rejected') && (
                          <button onClick={() => reactivateMember(member.id)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"><RotateCcw size={14} /> Reactivate</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function AdminListings() {
  const [filter, setFilter] = useState('all');

  return (
    <div>
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manage Listings</h1>
          <p className="mt-1 text-sm text-slate-500">Review and moderate product listings</p>
        </div>
      </div>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                <input placeholder="Search listings..." className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500" />
              </div>
              <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500">
                <option value="all">All statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-widest text-slate-500">
                  <th className="px-6 py-3 font-semibold">Product</th>
                  <th className="px-6 py-3 font-semibold">Category</th>
                  <th className="px-6 py-3 font-semibold">Price</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockProducts.map((product) => (
                  <tr key={product.id} className="transition hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900">{product.name}</td>
                    <td className="px-6 py-4 text-slate-600">{product.category}</td>
                    <td className="px-6 py-4 text-slate-700">${product.price}{product.priceUnit ? `/${product.priceUnit}` : ''}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">Active</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <button className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-green-700"><CheckCircle2 size={14} /> Approve</button>
                        <button className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-700"><XCircle size={14} /> Remove</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function AdminAdvertisements() {
  const ads = [
    { id: 1, title: 'Banner Homepage', bookedBy: 'EcoCash', price: 520, period: 'week', status: 'approved', type: 'banner' },
    { id: 2, title: 'Sponsored Category', bookedBy: 'ZimPost', price: 180, period: 'month', status: 'pending', type: 'sponsored' },
    { id: 3, title: 'Email Blast', bookedBy: 'CBZ Bank', price: 320, period: 'campaign', status: 'approved', type: 'email' },
  ];

  return (
    <div>
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Advertisements</h1>
          <p className="mt-1 text-sm text-slate-500">Manage sponsored listings and campaigns</p>
        </div>
      </div>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                <input placeholder="Search ads..." className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500" />
              </div>
              <select className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500">
                <option value="all">All statuses</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-widest text-slate-500">
                  <th className="px-6 py-3 font-semibold">Ad</th>
                  <th className="px-6 py-3 font-semibold">Booked By</th>
                  <th className="px-6 py-3 font-semibold">Price</th>
                  <th className="px-6 py-3 font-semibold">Period</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ads.map((ad) => (
                  <tr key={ad.id} className="transition hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900">{ad.title}</td>
                    <td className="px-6 py-4 text-slate-600">{ad.bookedBy}</td>
                    <td className="px-6 py-4 text-slate-700">${ad.price}</td>
                    <td className="px-6 py-4 text-slate-600">{ad.period}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${ad.status === 'approved' ? 'bg-green-50 text-green-700' : ad.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'}`}>{ad.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        {ad.status !== 'approved' && (
                          <button className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-green-700"><CheckCircle2 size={14} /> Approve</button>
                        )}
                        {ad.status !== 'rejected' && (
                          <button className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-red-700"><XCircle size={14} /> Reject</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function AdminReports() {
  const totalRevenue = 24500;
  const totalTransactions = mockTransactions.length;

  return (
    <div>
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Reports & Analytics</h1>
              <p className="mt-1 text-sm text-slate-500">Sales, revenue, and membership insights</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
              <Download size={16} /> Export Report
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}` },
            { label: 'Transactions', value: totalTransactions },
            { label: 'Total Members', value: mockMembers.length },
            { label: 'Active Now', value: mockMembers.filter((m) => m.status === 'active').length },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-sm text-slate-500">{item.label}</div>
              <div className="mt-1 text-2xl font-bold text-slate-900">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6">
            <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
            <p className="text-sm text-slate-500">Latest financial activity</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-widest text-slate-500">
                  <th className="px-6 py-3 font-semibold">ID</th>
                  <th className="px-6 py-3 font-semibold">Type</th>
                  <th className="px-6 py-3 font-semibold">Member</th>
                  <th className="px-6 py-3 font-semibold">Amount</th>
                  <th className="px-6 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockTransactions.map((txn) => (
                  <tr key={txn.id} className="transition hover:bg-slate-50">
                    <td className="px-6 py-3 text-slate-700">#{txn.id}</td>
                    <td className="px-6 py-3 text-slate-700 capitalize">{txn.type}</td>
                    <td className="px-6 py-3 text-slate-700">{txn.member}</td>
                    <td className="px-6 py-3 font-bold text-slate-900">${txn.amount}</td>
                    <td className="px-6 py-3 text-slate-700">{txn.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export { AdminDashboard, AdminMembers, AdminListings, AdminAdvertisements, AdminReports };
export default AdminLayout;
