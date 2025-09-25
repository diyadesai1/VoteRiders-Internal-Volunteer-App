import React from 'react';

export default function BackButton({ onClick, children = 'Back', className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`w-32 h-8 bg-white/20 rounded border border-white/30 mx-auto text-white flex items-center justify-center hover:bg-white/30 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
