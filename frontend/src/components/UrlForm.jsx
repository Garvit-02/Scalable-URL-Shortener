import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

const UrlForm = ({ onShorten, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onShorten(url);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your long URL here..."
          required
          className="w-full h-16 pl-6 pr-32 rounded-2xl bg-slate-900 border border-slate-700 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all outline-none text-lg text-white placeholder:text-slate-500 shadow-2xl group-hover:border-slate-600"
        />
        <button
          type="submit"
          disabled={isLoading || !url}
          className="absolute right-2 top-2 bottom-2 px-6 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 disabled:text-slate-600 text-white font-semibold transition-all flex items-center gap-2 active:scale-95"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Shorten
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UrlForm;
