import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Phone, Mail, MapPin, MessageSquare, Star, Filter, UserPlus } from 'lucide-react';
import { mockMembers } from '../../data/mockData';
import EmptyState from '../../components/ui/EmptyState';

const inputBase = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500';
const selectBase = 'rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500';
const chipBase = 'rounded-full px-4 py-2 text-sm font-semibold transition';
const chipActive = 'bg-slate-900 text-white';
const chipInactive = 'bg-slate-100 text-slate-700 hover:bg-slate-200';

function SupplierDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMemberId, setViewMemberId] = useState(null);

  const allCategories = useMemo(() => Array.from(new Set(mockMembers.map((m) => m.category))), []);
  const filteredMembers = useMemo(() => {
    return mockMembers.filter((member) => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || member.category === selectedCategory;
      return matchesSearch && matchesCategory && member.status === 'active';
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 page-enter">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Members & Suppliers</h1>
            <p className="mt-1 text-slate-500">Find and connect with verified suppliers and business partners</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
            <UserPlus size={16} /> Add Supplier
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search suppliers by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={inputBase}
              />
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100">
              <Filter size={16} /> Advanced
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button onClick={() => setSelectedCategory('')} className={`${chipBase} ${!selectedCategory ? chipActive : chipInactive}`}>All Categories</button>
            {allCategories.map((category) => (
              <button key={category} onClick={() => setSelectedCategory(category)} className={`${chipBase} ${selectedCategory === category ? chipActive : chipInactive}`}>
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">{filteredMembers.length} Suppliers Found</h2>
          <select className={`${selectBase} w-full sm:w-auto`}>
            <option>Sort by: Newest</option>
            <option>Sort by: Rating</option>
            <option>Sort by: Most Reviews</option>
          </select>
        </div>

        {filteredMembers.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => (
              <div key={member.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
                <div className="relative h-24 rounded-t-2xl bg-gradient-to-r from-slate-800 to-slate-900">
                  <div className="absolute -bottom-8 left-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-white shadow-lg">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-lg font-bold text-red-700">{member.avatar}</div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-12">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                      <p className="text-sm text-slate-500">{member.category}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">✓ Verified</span>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < Math.floor(member.rating) ? 'fill-current' : 'fill-slate-200 text-slate-200'} />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{member.rating}</span>
                    <span className="text-xs text-slate-500">({member.reviews} reviews)</span>
                  </div>

                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-slate-400" />
                      <a href={`tel:${member.phone}`} className="transition hover:text-red-700">{member.phone || '+263 77 900 1234'}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-slate-400" />
                      <a href={`mailto:${member.email}`} className="truncate transition hover:text-red-700">{member.email}</a>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <div className="text-slate-500">Reg. No.</div>
                        <div className="font-semibold text-slate-900">{member.registrationNo}</div>
                      </div>
                      <div>
                        <div className="text-slate-500">Joined</div>
                        <div className="font-semibold text-slate-900">{member.joinDate}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                      <MessageSquare size={16} /> Message
                    </button>
                    <button onClick={() => setViewMemberId(viewMemberId === member.id ? null : member.id)} className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
                      View Profile
                    </button>
                  </div>

                  {viewMemberId === member.id && (
                    <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2"><MapPin size={16} className="text-slate-400" /> {member.location || 'Zimbabwe'}</div>
                      <p className="mt-2">{member.description || 'No description provided.'}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <EmptyState icon="🔍" title="No suppliers found" subtitle="Try adjusting your search criteria." />
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="mt-4 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Clear Filters
            </button>
          </div>
        )}

        {filteredMembers.length > 0 && filteredMembers.length < 12 && (
          <div className="mt-8 text-center">
            <button className="rounded-xl border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">Load More Suppliers</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SupplierDirectory;
