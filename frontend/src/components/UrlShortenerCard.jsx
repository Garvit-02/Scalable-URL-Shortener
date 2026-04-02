import React, { useState } from 'react';
import { Send, Link as LinkIcon, Loader2, Copy, Check } from 'lucide-react';
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
      setError(err.response?.data?.message || 'Failed to shorten URL');
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
    <div className="bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-700 mb-8">
      <h3 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
        <LinkIcon className="text-indigo-500" size={24} />
        Shorten a New URL
      </h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your long URL here..."
          required
          className="flex-1 bg-gray-900 border border-gray-700 text-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:border-indigo-600 transition-all placeholder:text-gray-600"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : (
            <>
              Shorten
              <Send size={18} />
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-500 text-sm mb-4">
          {error}
        </div>
      )}

      {result && (
        <div className="p-6 bg-gray-950 border border-gray-700 rounded-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 overflow-hidden">
              <p className="text-[10px] uppercase font-bold text-gray-500 mb-1 tracking-widest">Short URL</p>
              <p className="text-gray-200 font-mono text-lg truncate">{result.shortUrl}</p>
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold transition-all ${
                copied ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlShortenerCard;
