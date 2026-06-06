import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Phone, Mail, MapPin, MessageSquare, Star, Filter } from 'lucide-react';
import { mockMembers } from '../../data/mockData';
import EmptyState from '../../components/ui/EmptyState';

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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Members & Suppliers</h1>
          <p className="text-gray-600 mt-1">Find and connect with verified suppliers and business partners</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search suppliers by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-2">
              <Filter size={18} /> Advanced
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full font-medium transition ${
                !selectedCategory ? 'bg-red-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === category ? 'bg-red-700 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">{filteredMembers.length} Suppliers Found</h2>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700">
            <option>Sort by: Newest</option>
            <option>Sort by: Rating</option>
            <option>Sort by: Most Reviews</option>
          </select>
        </div>

        {filteredMembers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition overflow-hidden">
                <div className="bg-gradient-to-r from-red-700 to-red-800 h-24 relative">
                  <div className="absolute -bottom-8 left-6 w-20 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center font-bold text-xl border-4 border-white">
                    <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center text-red-700 font-bold text-lg">{member.avatar}</div>
                  </div>
                </div>

                <div className="pt-14 px-6 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.category}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">✓ Verified</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < Math.floor(member.rating) ? 'fill-current' : 'fill-gray-300 text-gray-300'} />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{member.rating}</span>
                    <span className="text-xs text-gray-600">({member.reviews} reviews)</span>
                  </div>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      <a href={`tel:${member.phone}`} className="hover:text-red-700">{member.phone || '+263 77 900 1234'}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      <a href={`mailto:${member.email}`} className="hover:text-red-700 truncate">{member.email}</a>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-gray-600">Reg. No.</div>
                        <div className="font-semibold text-gray-900">{member.registrationNo}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Joined</div>
                        <div className="font-semibold text-gray-900">{member.joinDate}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800 transition flex items-center justify-center gap-2">
                      <MessageSquare size={16} /> Message
                    </button>
                    <button onClick={() => setViewMemberId(viewMemberId === member.id ? null : member.id)} className="flex-1 px-4 py-2 border-2 border-red-700 text-red-700 rounded-lg font-bold hover:bg-red-50 transition">
                      View Profile
                    </button>
                  </div>

                  {viewMemberId === member.id && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 space-y-1">
                      <div className="flex items-center gap-2"><MapPin size={16} /> {member.location || 'Zimbabwe'}</div>
                      <p>{member.description || 'No description provided.'}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <EmptyState icon="🔍" title="No suppliers found" subtitle="Try adjusting your search criteria." />
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="mt-4 px-6 py-2 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800"
            >
              Clear Filters
            </button>
          </div>
        )}

        {filteredMembers.length > 0 && filteredMembers.length < 12 && (
          <div className="text-center mt-8">
            <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition">Load More Suppliers</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SupplierDirectory;
