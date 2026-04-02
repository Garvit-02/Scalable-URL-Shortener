import React, { useState } from 'react';
import { Copy, ExternalLink, Search, Check, Filter } from 'lucide-react';

const UrlTable = ({ urls }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const filteredUrls = urls.filter(url => 
    url.shortCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-indigo-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search links..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-all"
          />
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-all text-sm">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-950/50">
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Short Link</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest hidden lg:table-cell">Original Destination</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Clicks</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest hidden md:table-cell">Created</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {filteredUrls.length > 0 ? (
              filteredUrls.map((url) => (
                <tr key={url._id} className="hover:bg-gray-800/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-white font-mono font-medium">{url.shortUrl}</span>
                      <span className="text-[10px] text-gray-500 font-mono mt-1 md:hidden truncate max-w-[150px]">{url.originalUrl}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 hidden lg:table-cell">
                    <p className="text-gray-400 text-sm truncate max-w-xs">{url.originalUrl}</p>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20">
                      {url.clicks}
                    </span>
                  </td>
                  <td className="px-6 py-5 hidden md:table-cell text-gray-500 text-xs">
                    {new Date(url.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleCopy(url._id, url.shortUrl)}
                        className={`p-2 rounded-lg transition-all ${
                          copiedId === url._id ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'
                        }`}
                        title="Copy to clipboard"
                      >
                        {copiedId === url._id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <a 
                        href={url.shortUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-all"
                        title="Open link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500 italic text-sm">
                  No links found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination UI Placeholder */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-gray-500">Showing {filteredUrls.length} links</p>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-500 opacity-50 cursor-not-allowed text-xs">Previous</button>
          <button className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-all text-xs">Next</button>
        </div>
      </div>
    </div>
  );
};

export default UrlTable;
