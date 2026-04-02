import React, { useState, useEffect } from 'react';
import { getUrlList } from '../services/api';
import UrlTable from '../components/UrlTable';
import { Loader2, Link as LinkIcon, RefreshCcw } from 'lucide-react';

const Links = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchUrls = async () => {
    try {
      const data = await getUrlList();
      setUrls(data);
    } catch (err) {
      console.error('Failed to fetch URLs:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
            <LinkIcon size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-100">My Links</h1>
            <p className="text-gray-500 text-sm mt-1 font-medium italic">Manage and monitor your shortened routing system.</p>
          </div>
        </div>
        <button 
          onClick={() => { setRefreshing(true); fetchUrls(); }}
          disabled={refreshing}
          className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-gray-100 transition-all disabled:opacity-50 font-bold uppercase text-[10px] tracking-widest shadow-lg"
        >
          <RefreshCcw size={16} className={refreshing ? 'animate-spin' : ''} />
          Sync Terminal
        </button>
      </div>

      <UrlTable urls={urls} />
    </div>
  );
};

export default Links;
