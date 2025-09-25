import React from 'react';

export default function GuideEmbed({ url, iframeTitle, openText = 'Open Guide in New Tab', height = '75vh', className = '' }) {
  if (!url) return null;
  return (
    <div className={`max-w-5xl mx-auto space-y-4 ${className}`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        {openText}
      </a>
      <div className="rounded-lg overflow-hidden border border-white/20">
        <iframe
          title={iframeTitle || 'Guide'}
          src={url}
          className="w-full"
          style={{ height }}
          allowFullScreen
        />
      </div>
    </div>
  );
}