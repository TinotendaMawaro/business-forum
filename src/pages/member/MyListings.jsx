import React, { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { mockProducts } from '../../data/mockData';
import useAuthStore from '../../store/authStore';

function MyListings() {
  const { user } = useAuthStore();
  const memberProductIds = [1, 2, 4, 5, 6];
  const baseListings = useMemo(() => mockProducts.filter((p) => memberProductIds.includes(p.id)), []);

  const [listings, setListings] = useState(baseListings);
  const [form, setForm] = useState({ id: null, name: '', category: '', price: '', priceUnit: '', description: '', location: '' });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  const startCreate = () => {
    setEditingId(null);
    setForm({ id: null, name: '', category: '', price: '', priceUnit: '', description: '', location: '' });
    setShowForm(true);
  };

  const startEdit = (listing) => {
    setEditingId(listing.id);
    setForm({ id: listing.id, name: listing.name, category: listing.category, price: String(listing.price), priceUnit: listing.priceUnit || '', description: listing.description || '', location: listing.location || '' });
    setShowForm(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.category || !form.price) {
      setMessage('Please fill in all required fields.');
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price) || 0,
      seller: user?.name || 'Me',
      sellerId: user?.id,
      rating: 0,
      reviews: 0,
      image: '📦',
    };

    if (editingId) {
      setListings((prev) => prev.map((item) => (item.id === editingId ? { ...item, ...payload } : item)));
      setMessage('Listing updated successfully.');
    } else {
      setListings((prev) => [...prev, { ...payload, id: Date.now() }]);
      setMessage('Listing created successfully.');
    }

    setShowForm(false);
    setForm({ id: null, name: '', category: '', price: '', priceUnit: '', description: '', location: '' });
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (!confirm('Remove this listing?')) return;
    setListings((prev) => prev.filter((item) => item.id !== id));
    setMessage('Listing removed.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Listings</h1>
            <p className="text-gray-600">Create, edit, and manage your marketplace listings.</p>
          </div>
          <button onClick={startCreate} className="px-6 py-2 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800 transition flex items-center gap-2">
            <Plus size={18} /> Add New Listing
          </button>
        </div>

        {message && <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{message}</div>}

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-8 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Product / Service Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Category</label>
                <input type="text" name="category" value={form.category} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Price (USD)</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Price Unit</label>
                <input type="text" name="priceUnit" value={form.priceUnit} onChange={handleChange} placeholder="per unit / per hour" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-1">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="px-4 py-2 border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800">Save Listing</button>
            </div>
          </form>
        )}

        <div className="bg-white rounded-lg shadow">
          {listings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Product</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Category</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Price</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {listings.map((listing) => (
                    <tr key={listing.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{listing.name}</td>
                      <td className="px-4 py-3 text-gray-600">{listing.category}</td>
                      <td className="px-4 py-3 text-gray-700">${listing.price}{listing.priceUnit ? `/${listing.priceUnit}` : ''}</td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">Active</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <button onClick={() => startEdit(listing)} className="text-red-700 font-medium inline-flex items-center gap-1">
                            <Pencil size={14} /> Edit
                          </button>
                          <button onClick={() => handleDelete(listing.id)} className="text-gray-500 font-medium inline-flex items-center gap-1">
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-gray-600">No listings yet. Add your first listing to get started.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyListings;
