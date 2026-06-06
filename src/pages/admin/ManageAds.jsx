import React from 'react';
import { Megaphone, Plus } from 'lucide-react';

export default function ManageAds() {
  const ads = [
    { id: 1, title: 'Summer Sale', status: 'Active' },
    { id: 2, title: 'New Suppliers', status: 'Pending' },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Advertisements</h1>
        <button className="flex items-center bg-red-700 text-white px-4 py-2 rounded">
          <Plus className="w-4 h-4 mr-2" /> Add Ad
        </button>
      </div>
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad.id} className="border-b">
                <td className="px-4 py-3">{ad.title}</td>
                <td className="px-4 py-3">{ad.status}</td>
                <td className="px-4 py-3">
                  <button className="text-red-700 mr-2">Edit</button>
                  <button className="text-gray-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}