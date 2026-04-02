import React, { useState, useEffect } from 'react';
import { getAnalytics } from '../services/api';
import StatsCard from '../components/StatsCard';
import { ClicksBarChart, DevicePieChart } from '../components/Charts';
import { 
  BarChart3, 
  MousePointerClick, 
  ShieldCheck, 
  AlertTriangle,
  RefreshCcw,
  Loader2,
  TrendingUp,
  Link as LinkIcon
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      const data = await getAnalytics();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
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
        <div>
          <h2 className="text-3xl font-black text-white">System Overview</h2>
          <p className="text-gray-500 text-sm mt-1">Real-time performance analytics for your shortened links.</p>
        </div>
        <button 
          onClick={() => { setRefreshing(true); fetchStats(); }}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white transition-all disabled:opacity-50"
        >
          <RefreshCcw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Analytics</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Links" 
          value={stats?.totalUrls || 0}
          icon={LinkIcon}
          description="Accumulated lifetime links"
          trend="up"
          trendValue="12"
        />
        <StatsCard 
          title="Total Clicks" 
          value={stats?.totalClicks || 0}
          icon={MousePointerClick}
          description="Direct visitor engagement"
          trend="up"
          trendValue="24"
        />
        <StatsCard 
          title="Safe Links" 
          value={stats?.totalUrls || 0} // In this simple version, assume all are safe since malicious are blocked
          icon={ShieldCheck}
          description="Verified redirects active"
        />
        <StatsCard 
          title="Security Blocks" 
          value="142" // Mock data for malicious blocks for UI demonstration
          icon={AlertTriangle}
          description="Threats mitigated by AI"
          trend="down"
          trendValue="5"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-8 rounded-3xl bg-gray-900 border border-gray-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-white">Engagement Volume</h3>
              <p className="text-xs text-gray-500 mt-1">Click distribution across your top performing URLs.</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              Real-time
            </div>
          </div>
          <ClicksBarChart data={topUrls} />
        </div>

        <div className="p-8 rounded-3xl bg-gray-900 border border-gray-800 flex flex-col">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white">Device Distribution</h3>
            <p className="text-xs text-gray-500 mt-1">Breakdown of visitor technology stack.</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <DevicePieChart />
          </div>
          <div className="mt-6 p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
            <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-1">PRO INSIGHT</p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Mobile traffic has increased by 15% this week. Consider optimizing your landing pages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
