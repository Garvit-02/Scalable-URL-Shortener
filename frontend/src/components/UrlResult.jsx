import React, { useState } from 'react';
import { Copy, ExternalLink, Check, QrCode } from 'lucide-react';

const UrlResult = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-8 w-full max-w-3xl animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <QrCode className="w-32 h-32" />
        </div>
        
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-2">Original URL</p>
          <p className="text-gray-400 text-sm truncate mb-6 border-b border-gray-800 pb-4 max-w-md">
            {result.originalUrl}
          </p>

          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-2">Short URL Generated</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 bg-gray-950 border border-gray-800 px-5 py-4 rounded-2xl text-white font-mono text-lg break-all">
              {result.shortUrl}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopy}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all ${
                  copied ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <a
                href={result.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white transition-all shadow-lg shadow-indigo-500/20"
              >
                <ExternalLink className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlResult;
