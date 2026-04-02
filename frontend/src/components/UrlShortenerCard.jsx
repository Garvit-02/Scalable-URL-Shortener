import React, { useState } from 'react';
import { Send, Link as LinkIcon, Loader2, Copy, Check, Sparkles } from 'lucide-react';
import { shortenUrl } from '../services/api';

const UrlShortenerCard = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const data = await shortenUrl(url);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to shorten URL. Check network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-xl shadow-black/40 mb-10 overflow-hidden relative group">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-50" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-100 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
               <Sparkles size={20} />
            </div>
            Shorten a New URL
          </h3>
          <p className="text-gray-500 text-xs mt-1 font-medium">Instantly transform long links into smart, secure URLs.</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors">
            <LinkIcon size={18} />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste your link here..."
            required
            className="w-full bg-gray-900 border border-gray-700 text-gray-100 pl-12 pr-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-gray-600 font-medium"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-10 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : (
            <>
              SHORTEN
              <Send size={16} />
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-bold uppercase tracking-wider text-center animate-in shake-in duration-300">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-xl animate-in zoom-in-95 duration-500 mt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase font-black text-indigo-400 mb-1 tracking-widest">Your Secure Link</p>
              <p className="text-gray-100 font-mono text-lg truncate bg-gray-950 px-4 py-2 rounded-lg border border-gray-800">
                {result.shortUrl}
              </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleCopy}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
                  copied ? 'bg-green-600 text-white shadow-green-600/20' : 'bg-gray-700 text-gray-200 hover:bg-gray-600 shadow-black/20'
                }`}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span>{copied ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlShortenerCard;
