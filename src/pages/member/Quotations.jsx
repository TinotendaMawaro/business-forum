import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockQuotations as initialQuotations, mockProducts, mockCategories } from '../../data/mockData';
import { MessageSquare } from 'lucide-react';

function Quotations() {
  const [quotationList, setQuotationList] = useState(() => {
    try {
      const saved = localStorage.getItem('quotations');
      return saved ? JSON.parse(saved) : initialQuotations;
    } catch {
      return initialQuotations;
    }
  });
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ product: '', category: '', budget: '', message: '', deadline: '' });

  const displayed = useMemo(() => {
    if (statusFilter === 'all') return quotationList;
    return quotationList.filter((q) => q.status === statusFilter);
  }, [quotationList, statusFilter]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = {
      id: Date.now(),
      product: form.product || 'New RFQ',
      requester: 'Current User',
      supplier: form.category || 'All Suppliers',
      status: 'pending',
      date: new Date().toISOString().slice(0, 10),
      budget: Number(form.budget) || 0,
      deadline: form.deadline,
      message: form.message,
    };

    setQuotationList((prev) => {
      const updated = [next, ...prev];
      localStorage.setItem('quotations', JSON.stringify(updated));
      return updated;
    });

    setForm({ product: '', category: '', budget: '', message: '', deadline: '' });
    setShowCreate(false);
    alert('RFQ submitted successfully');
  };

  const statusBadge = (status) => {
    if (status === 'pending') return <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">Pending</span>;
    if (status === 'accepted') return <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">Accepted</span>;
    if (status === 'rejected') return <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800">Rejected</span>;
    return <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800">{status}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Request for Quotation (RFQ)</h1>
            <p className="text-gray-600">Request, track, and manage quotations from suppliers.</p>
          </div>
          <button onClick={() => setShowCreate((prev) => !prev)} className="px-6 py-2 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800">
            + New RFQ
          </button>
        </div>

        {showCreate && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-8 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Product / Service</label>
                <input type="text" name="product" value={form.product} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700" placeholder="e.g. 2 tonnes of maize" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Category</label>
                <select name="category" value={form.category} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700">
                  <option value="">Select category</option>
                  {mockCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Budget (USD)</label>
                <input type="number" name="budget" value={form.budget} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">Deadline</label>
                <input type="date" name="deadline" value={form.deadline} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-1">Message / Requirements</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700" placeholder="Describe what you need..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 border border-gray-300 rounded-lg font-bold text-gray-700 hover:bg-gray-50">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-red-700 text-white rounded-lg font-bold hover:bg-red-800">Submit RFQ</button>
            </div>
          </form>
        )}

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Quotations</h2>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-700">
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {displayed.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Product</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Category</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Budget</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Deadline</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {displayed.map((quote) => (
                    <tr key={quote.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{quote.product}</td>
                      <td className="px-4 py-3 text-gray-600">{quote.supplier}</td>
                      <td className="px-4 py-3 text-gray-700">${quote.budget}</td>
                      <td className="px-4 py-3">{statusBadge(quote.status)}</td>
                      <td className="px-4 py-3 text-gray-600">{quote.deadline || quote.date}</td>
                      <td className="px-4 py-3 text-red-700 font-medium cursor-pointer">
                        <button className="inline-flex items-center gap-1"><MessageSquare size={16} /> View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-600">
              <div className="text-5xl mb-3">📭</div>
              <div className="font-semibold text-gray-900 mb-1">No quotations yet.</div>
              <div>Start by creating a new request.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quotations;
