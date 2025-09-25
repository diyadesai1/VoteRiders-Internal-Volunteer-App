import React from 'react';

const COLOR_MAP = {
  blue: 'bg-blue-500 hover:bg-blue-600',
  red: 'bg-red-500 hover:bg-red-600',
  green: 'bg-green-500 hover:bg-green-600',
  gray: 'bg-gray-500 hover:bg-gray-600'
};

export default function FlowButton({ color = 'blue', icon: Icon, children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`${COLOR_MAP[color] || COLOR_MAP.blue} px-8 py-4 rounded-lg flex items-center space-x-3 text-lg font-semibold text-white transition-colors transition-transform group ${className}`}
    >
      {Icon && <Icon className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />}
      <span>{children}</span>
    </button>
  );
}
