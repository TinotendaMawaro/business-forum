import React from 'react';
import { mockMembers } from '../../data/mockData';

export default function ManageMembers() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Members</h1>
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockMembers.map((member) => (
              <tr key={member.id} className="border-b">
                <td className="px-4 py-3">{member.name}</td>
                <td className="px-4 py-3">{member.email}</td>
                <td className="px-4 py-3 capitalize">{member.role}</td>
                <td className="px-4 py-3">
                  <button className="text-red-700 mr-2">Edit</button>
                  <button className="text-gray-500">Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}