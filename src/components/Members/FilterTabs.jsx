// src/components/Members/FilterTabs.jsx
import React from 'react';

const FilterTabs = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { key: 'all', label: 'All Members' },
    { key: 'active', label: 'Active' },
    { key: 'expiring', label: 'Expiring Soon' },
    { key: 'expired', label: 'Expired' }
  ];

  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
      {filters.map(filter => (
        <button
          key={filter.key}
          onClick={() => setActiveFilter(filter.key)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeFilter === filter.key
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
