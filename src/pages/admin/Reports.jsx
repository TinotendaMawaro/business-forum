import React from 'react';
import { BarChart3, Download } from 'lucide-react';

export default function Reports() {
  const reports = [
    { id: 1, name: 'Monthly Sales', date: '2024-02-01' },
    { id: 2, name: 'Member Growth', date: '2024-02-01' },
    { id: 3, name: 'Product Listings', date: '2024-02-01' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
            <div>
              <BarChart3 className="w-8 h-8 text-red-700 mb-2" />
              <h3 className="font-semibold">{report.name}</h3>
              <p className="text-gray-500">{report.date}</p>
            </div>
            <button className="flex items-center text-red-700">
              <Download className="w-4 h-4 mr-1" /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}