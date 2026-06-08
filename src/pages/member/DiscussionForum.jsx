import React from 'react';
import { MessageSquare, Users, Calendar } from 'lucide-react';

function Forum() {
  const categories = [
    { id: 1, name: 'General Discussion', icon: MessageSquare, threads: 24 },
    { id: 2, name: 'Marketplace', icon: Users, threads: 18 },
    { id: 3, name: 'Events', icon: Calendar, threads: 12 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 page-enter">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Community Forum</h1>
        <p className="mt-1 text-slate-500">Join the conversation with other businesses</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.id} className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-lg">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-base font-bold text-slate-900">{cat.name}</h3>
              <p className="mt-2 text-sm text-slate-500">{cat.threads} threads</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forum;
