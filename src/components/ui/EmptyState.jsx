import React from 'react';

function EmptyState({ icon = '📭', title = 'Nothing here yet', subtitle = 'Try adjusting your filters or check back later.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fadeIn">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md">{subtitle}</p>
    </div>
  );
}

export default EmptyState;
