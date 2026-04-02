import React, { useState, useEffect } from 'react';
import { getAnalytics } from '../services/api';
import { ClicksBarChart, DevicePieChart } from '../components/Charts';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download,
  Loader2,
  PieChart as PieChartIcon,
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
      <div className="h-[70vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  const topUrls = stats?.topUrls || [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white">Deep Analytics</h2>
            <p className="text-gray-500 text-sm mt-1">Granular insights into your link performance and audience.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-all text-sm">
            <Calendar className="w-4 h-4" />
            <span>Last 30 Days</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-all text-sm font-bold shadow-lg shadow-indigo-500/20">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white">Traffic Trends</h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md uppercase">Growth +14%</span>
          </div>
          <ClicksBarChart data={topUrls} />
          <div className="p-4 rounded-2xl bg-gray-950/50 border border-gray-800">
            <p className="text-xs text-gray-500 leading-relaxed">
              Your overall traffic has been steadily increasing. The peak engagement usually occurs between <span className="text-white font-bold">2 PM - 6 PM</span>.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <PieChartIcon className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-white">Audience Segments</h3>
            </div>
            <span className="text-[10px] font-bold text-gray-500 bg-gray-800 px-2 py-1 rounded-md uppercase">Top Segment: Desktop</span>
          </div>
          <DevicePieChart />
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-gray-950/50 border border-gray-800">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">BOUNCE RATE</p>
              <p className="text-xl font-black text-white">32.4%</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-950/50 border border-gray-800">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">AVG. SESSION</p>
              <p className="text-xl font-black text-white">2m 45s</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent border border-indigo-500/10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/20 shrink-0">
            <TrendingUp className="w-10 h-10" />
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-white">Next-Level Optimization</h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
              Based on your current data, adding custom aliases could improve your CTR by another <span className="text-indigo-400 font-bold">12%</span>. 
              Our AI recommends focusing on social media sharing during weekend mornings.
            </p>
          </div>
          <button className="md:ml-auto px-6 py-3 rounded-xl bg-white text-gray-950 font-bold hover:bg-gray-200 transition-all">
            Get Pro Insights
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
