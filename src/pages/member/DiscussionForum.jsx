import React from 'react';
import { MessageSquare, Users, Calendar } from 'lucide-react';

export default function Forum() {
  const categories = [
    { id: 1, name: 'General Discussion', icon: MessageSquare, threads: 24 },
    { id: 2, name: 'Marketplace', icon: Users, threads: 18 },
    { id: 3, name: 'Events', icon: Calendar, threads: 12 },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Community Forum</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md cursor-pointer">
            <cat.icon className="w-8 h-8 text-red-700 mb-3" />
            <h3 className="font-semibold text-lg">{cat.name}</h3>
            <p className="text-gray-500">{cat.threads} threads</p>
          </div>
        ))}
      </div>
    </div>
  );
}