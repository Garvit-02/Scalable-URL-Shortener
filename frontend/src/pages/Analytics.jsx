import React, { useState, useEffect } from 'react';
import { getAnalytics } from '../services/api';
import AnalyticsChart from '../components/AnalyticsChart';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download,
  Loader2,
  Activity
} from 'lucide-react';

const Analytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
            <BarChart3 size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-100Tracking-tight">Deep Analytics</h1>
            <p className="text-gray-500 text-sm mt-2 font-medium italic">Granular behavior insights and performance metrics.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
            <Calendar size={14} />
            Period Settings
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20">
            <Download size={14} />
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        <div className="p-2">
          <AnalyticsChart data={stats?.topUrls || []} />
        </div>

        <div className="p-10 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent border border-indigo-500/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUp size={120} />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="w-20 h-20 rounded-full bg-indigo-600/20 flex items-center justify-center text-indigo-400 border border-indigo-500/20 shrink-0 shadow-lg shadow-indigo-500/10">
              <Activity size={32} />
            </div>
            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-2xl font-black text-gray-100">Algorithmic Insights</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-2xl font-medium">
                Our AI indicates that your engagement peaks around <span className="text-white font-bold uppercase">10 AM EST</span>. 
                Integrating a custom domain could potentially increase trust and boost CTR by another <span className="text-indigo-400 font-bold uppercase tracking-widst">18.4%</span>.
              </p>
            </div>
            <button className="md:ml-auto px-8 py-3.5 rounded-xl bg-gray-100 text-gray-900 font-black hover:bg-white transition-all text-[10px] uppercase tracking-widest shadow-xl shadow-white/5">
              Unlock Strategy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
