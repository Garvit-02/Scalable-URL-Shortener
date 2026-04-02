import React, { useState, useEffect } from 'react';
import { getAnalytics } from '../services/api';
import StatsCard from '../components/StatsCard';
import UrlShortenerCard from '../components/UrlShortenerCard';
import FeatureCard from '../components/FeatureCard';
import AnalyticsChart from '../components/AnalyticsChart';
import { 
  Link as LinkIcon, 
  MousePointer2, 
  Zap, 
  ShieldCheck, 
  BarChart3,
  ShieldAlert,
  Loader2,
  RefreshCcw
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
      console.error('Failed to fetch analytics:', err);
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
      <div className="h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
          <p className="text-gray-500 text-xs font-black uppercase tracking-widest animate-pulse">Initializing SaaS Terminal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div>
          <h1 className="text-4xl font-black text-gray-100 tracking-tight">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-2 font-medium">Overview of your intelligent URL platform performance.</p>
        </div>
        <button 
          onClick={() => { setRefreshing(true); fetchStats(); }}
          className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 hover:text-gray-100 hover:border-gray-600 transition-all text-xs font-bold uppercase tracking-widest shadow-lg shadow-black/20"
        >
          <RefreshCcw size={16} className={refreshing ? 'animate-spin' : ''} />
          Refresh Stats
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Links"
          value={stats?.totalUrls || 0}
          icon={LinkIcon}
          description="Lifetime shortened URLs"
        />
        <StatsCard 
          title="Total Clicks"
          value={stats?.totalClicks || 0}
          icon={MousePointer2}
          description="Visitor engagement count"
        />
        <StatsCard 
          title="Cache Hit Rate"
          value="99.99%"
          icon={Zap}
          description="Redis edge performance"
        />
        <StatsCard 
          title="Malicious Blocked"
          value="142"
          icon={ShieldAlert}
          description="Threats mitigated by AI"
        />
      </div>

      {/* Primary Widget */}
      <UrlShortenerCard />

      {/* Analytics Visualization */}
      <AnalyticsChart data={stats?.topUrls || []} />

      {/* Features Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={ShieldCheck}
          title="AI security"
          description="Machine learning models verify every redirect for phishing and malware signatures before execution."
        />
        <FeatureCard 
          icon={Zap}
          title="Redis Speed"
          description="Sub-millisecond link resolution powered by our globally distributed high-speed caching tier."
        />
        <FeatureCard 
          icon={BarChart3}
          title="Deep Analytics"
          description="Comprehensive visitor data including engagement volume, browser types, and geographic location."
        />
      </div>
    </div>
  );
};

export default Dashboard;
