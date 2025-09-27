import React from 'react';

export default function ProgressBar({ step = 1, total = 1, className = '' }) {
  const percent = Math.min(100, Math.max(0, (step / total) * 100));
  return (
    <div className={`mb-12 ${className}`}>
      <div className="text-white text-lg mb-2">Step {step} of {total}</div>
      <div className="w-full max-w-2xl mx-auto bg-gray-600 rounded-full h-3">
        <div className="bg-black h-3 rounded-full transition-all duration-300" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
