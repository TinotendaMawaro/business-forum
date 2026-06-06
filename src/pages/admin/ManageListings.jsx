import React from 'react';
import { mockProducts } from '../../data/mockData';

export default function ManageListings() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Listings</h1>
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Supplier</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.supplier}</td>
                <td className="px-4 py-3">${product.price}</td>
                <td className="px-4 py-3">Active</td>
                <td className="px-4 py-3">
                  <button className="text-red-700 mr-2">Approve</button>
                  <button className="text-gray-500">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}