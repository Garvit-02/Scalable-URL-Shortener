import React, { useState } from 'react';
import { Send, Link as LinkIcon, Loader2 } from 'lucide-react';

const UrlForm = ({ onShorten, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onShorten(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl">
      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-indigo-500 transition-colors">
          <LinkIcon className="w-5 h-5" />
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your long URL here..."
          required
          className="w-full bg-gray-900 border-2 border-gray-800 text-white pl-14 pr-32 py-5 rounded-2xl focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all text-lg placeholder:text-gray-600"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-3 top-2.5 bottom-2.5 px-6 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-lg shadow-indigo-500/20"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Shorten</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default UrlForm;
