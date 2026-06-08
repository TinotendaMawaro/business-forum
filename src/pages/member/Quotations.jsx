import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockQuotations as initialQuotations, mockProducts, mockCategories } from '../../data/mockData';
import { MessageSquare } from 'lucide-react';

const inputBase = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500';
const selectBase = 'rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500';

function statusBadge(status) {
  if (status === 'pending') return <span className="inline-flex rounded-full bg-yellow-50 px-3 py-1 text-xs font-bold text-yellow-700">Pending</span>;
  if (status === 'accepted') return <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">Accepted</span>;
  if (status === 'rejected') return <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">Rejected</span>;
  return <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{status}</span>;
}

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

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 page-enter">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Request for Quotation</h1>
            <p className="mt-1 text-slate-500">Request, track, and manage quotations from suppliers</p>
          </div>
          <button onClick={() => setShowCreate((prev) => !prev)} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
            + New RFQ
          </button>
        </div>

        {showCreate && (
          <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900">Product / Service</label>
                <input type="text" name="product" value={form.product} onChange={handleChange} required className={inputBase} placeholder="e.g. 2 tonnes of maize" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900">Category</label>
                <select name="category" value={form.category} onChange={handleChange} required className={inputBase}>
                  <option value="">Select category</option>
                  {mockCategories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900">Budget (USD)</label>
                <input type="number" name="budget" value={form.budget} onChange={handleChange} required className={inputBase} placeholder="0" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900">Deadline</label>
                <input type="date" name="deadline" value={form.deadline} onChange={handleChange} required className={inputBase} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-900">Message / Requirements</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={3} className={`${inputBase} resize-none`} placeholder="Describe what you need..." />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setShowCreate(false)} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancel</button>
              <button type="submit" className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">Submit RFQ</button>
            </div>
          </form>
        )}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between p-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Quotations</h2>
              <p className="text-sm text-slate-500">Track your RFQ activity</p>
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectBase}>
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {displayed.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-widest text-slate-500">
                    <th className="px-6 py-3 font-semibold">Product</th>
                    <th className="px-6 py-3 font-semibold">Category</th>
                    <th className="px-6 py-3 font-semibold">Budget</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold">Deadline</th>
                    <th className="px-6 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayed.map((quote) => (
                    <tr key={quote.id} className="transition hover:bg-slate-50">
                      <td className="px-6 py-3 font-semibold text-slate-900">{quote.product}</td>
                      <td className="px-6 py-3 text-slate-600">{quote.supplier}</td>
                      <td className="px-6 py-3 text-slate-700">${quote.budget}</td>
                      <td className="px-6 py-3">{statusBadge(quote.status)}</td>
                      <td className="px-6 py-3 text-slate-600">{quote.deadline || quote.date}</td>
                      <td className="px-6 py-3">
                        <button className="inline-flex items-center gap-2 text-sm font-semibold text-red-700 transition hover:text-red-800">
                          <MessageSquare size={16} /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-14 text-center">
              <div className="text-5xl">📭</div>
              <div className="mt-3 text-base font-semibold text-slate-900">No quotations yet</div>
              <div className="mt-1 text-sm text-slate-500">Start by creating a new request.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quotations;

