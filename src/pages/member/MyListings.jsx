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

  const inputBase = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500';

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 page-enter">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Listings</h1>
            <p className="mt-1 text-slate-500">Create, edit, and manage your marketplace listings</p>
          </div>
          <button onClick={startCreate} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
            <Plus size={16} /> New Listing
          </button>
        </div>

        {message && <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{message}</div>}

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900">Product / Service Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required className={inputBase} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900">Category</label>
                <input type="text" name="category" value={form.category} onChange={handleChange} required className={inputBase} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900">Price (USD)</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} required className={inputBase} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900">Price Unit</label>
                <input type="text" name="priceUnit" value={form.priceUnit} onChange={handleChange} placeholder="per unit / per hour" className={inputBase} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-900">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={`${inputBase} resize-none`} />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancel</button>
              <button type="submit" className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">Save Listing</button>
            </div>
          </form>
        )}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          {listings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-widest text-slate-500">
                    <th className="px-6 py-3 font-semibold">Product</th>
                    <th className="px-6 py-3 font-semibold">Category</th>
                    <th className="px-6 py-3 font-semibold">Price</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {listings.map((listing) => (
                    <tr key={listing.id} className="transition hover:bg-slate-50">
                      <td className="px-6 py-3 font-semibold text-slate-900">{listing.name}</td>
                      <td className="px-6 py-3 text-slate-600">{listing.category}</td>
                      <td className="px-6 py-3 text-slate-700">${listing.price}{listing.priceUnit ? `/${listing.priceUnit}` : ''}</td>
                      <td className="px-6 py-3">
                        <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">Active</span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <button onClick={() => startEdit(listing)} className="inline-flex items-center gap-1 text-sm font-semibold text-red-700 transition hover:text-red-800">
                            <Pencil size={14} /> Edit
                          </button>
                          <button onClick={() => handleDelete(listing.id)} className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 transition hover:text-slate-700">
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
            <div className="p-10 text-center text-slate-500">No listings yet. Add your first listing to get started.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyListings;
