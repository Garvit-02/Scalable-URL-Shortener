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
      <div className="h-[70vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <LinkIcon className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white">My Links</h2>
            <p className="text-gray-500 text-sm mt-1">Manage, search, and monitor your shortened URLs.</p>
          </div>
        </div>
        <button 
          onClick={() => { setRefreshing(true); fetchUrls(); }}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-all disabled:opacity-50"
        >
          <RefreshCcw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Sync Links</span>
        </button>
      </div>

      <UrlTable urls={urls} />
    </div>
  );
};

export default Links;
