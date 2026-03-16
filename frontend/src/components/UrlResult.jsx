import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';

const UrlResult = ({ result }) => {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Check className="w-24 h-24 text-sky-500" />
        </div>
        
        <div className="relative z-10">
          <p className="text-slate-500 text-sm font-medium mb-1">Your shortened link is ready!</p>
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/50 border border-slate-800 mt-3">
            <span className="text-sky-400 font-mono text-lg truncate flex-1">
              {result.shortUrl}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all active:scale-90"
                title="Copy to clipboard"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
              <a
                href={result.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-500 transition-all active:scale-90"
                title="Visit link"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlResult;
