import React from 'react';
import { ExternalLink, Copy, MousePointer2, Calendar } from 'lucide-react';

const UrlTable = ({ urls }) => {
  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/50">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-900/80 border-b border-slate-800">
            <th className="px-6 py-4 text-sm font-bold text-slate-400">Short Link</th>
            <th className="px-6 py-4 text-sm font-bold text-slate-400">Original URL</th>
            <th className="px-6 py-4 text-sm font-bold text-slate-400">
              <div className="flex items-center gap-2">
                <MousePointer2 className="w-4 h-4" />
                Clicks
              </div>
            </th>
            <th className="px-6 py-4 text-sm font-bold text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Created
              </div>
            </th>
            <th className="px-6 py-4 text-sm font-bold text-slate-400 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {urls.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                No URLs found. Start shortening some!
              </td>
            </tr>
          ) : (
            urls.map((url) => (
              <tr key={url._id} className="hover:bg-slate-800/30 transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-sky-400 font-mono font-medium truncate max-w-[200px] block">
                    {url.shortCode}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-slate-300 text-sm truncate max-w-[300px] block" title={url.originalUrl}>
                    {url.originalUrl}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-500/10 text-sky-500">
                    {url.clicks} clicks
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-400 text-sm">
                  {new Date(url.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => handleCopy(`${window.location.protocol}//${window.location.host}/api/url/${url.shortCode}`)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <a
                    href={`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/${url.shortCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-sky-500 hover:text-sky-400 transition-colors inline-block"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UrlTable;
