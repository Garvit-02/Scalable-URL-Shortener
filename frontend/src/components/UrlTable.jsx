import React, { useState } from 'react';
import { Copy, ExternalLink, Search, Check, Filter, ChevronRight } from 'lucide-react';

const UrlTable = ({ urls }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const filteredUrls = urls.filter(url => 
    url.shortCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.originalUrl?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.shortUrl?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Table Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Filter links..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-600 font-medium"
          />
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-gray-100 hover:border-gray-600 transition-all text-xs font-bold uppercase tracking-widest">
          <Filter size={14} />
          Filters
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl shadow-black/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-900/50 border-b border-gray-700">
                <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">Short Link</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest hidden lg:table-cell">Destination</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Clicks</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest hidden md:table-cell">Created</th>
                <th className="px-6 py-5 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filteredUrls.length > 0 ? (
                filteredUrls.map((url) => (
                  <tr key={url._id} className="hover:bg-gray-700/30 transition-all group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gray-950 border border-gray-700 flex items-center justify-center text-indigo-400 shrink-0">
                          <LinkIcon size={14} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-100 font-mono font-bold text-sm tracking-tight">{url.shortUrl}</span>
                          <span className="text-[10px] text-gray-500 font-mono mt-0.5 md:hidden truncate max-w-[120px]">{url.originalUrl}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 hidden lg:table-cell">
                      <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors">
                        <span className="text-sm truncate max-w-xs font-medium">{url.originalUrl}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 text-xs font-black">
                        {url.clicks}
                      </div>
                    </td>
                    <td className="px-6 py-5 hidden md:table-cell text-gray-500 text-xs font-bold">
                      {new Date(url.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-3 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                        <button 
                          onClick={() => handleCopy(url._id, url.shortUrl)}
                          className={`p-2.5 rounded-lg transition-all ${
                            copiedId === url._id ? 'bg-green-600 text-white' : 'bg-gray-950 border border-gray-700 text-gray-400 hover:text-white hover:border-indigo-500/50'
                          }`}
                          title="Copy Link"
                        >
                          {copiedId === url._id ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                        <a 
                          href={url.shortUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-lg bg-gray-950 border border-gray-700 text-gray-400 hover:text-white hover:border-indigo-500/50 transition-all"
                          title="Visit Destination"
                        >
                          <ExternalLink size={16} />
                        </a>
                        <div className="pl-2 text-gray-700">
                          <ChevronRight size={16} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-gray-600 italic font-medium">
                    No matching links discovered.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UrlTable;
