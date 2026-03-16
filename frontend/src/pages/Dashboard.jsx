import React, { useState, useEffect } from 'react';
import { getUrlList, getAnalytics } from '../services/api';
import UrlTable from '../components/UrlTable';
import AnalyticsCard from '../components/AnalyticsCard';
import { 
  Link2, 
  MousePointer2, 
  TrendingUp, 
  BarChart3,
  Loader2,
  RefreshCcw
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [urlsData, statsData] = await Promise.all([
        getUrlList(),
        getAnalytics()
      ]);
      setUrls(urlsData);
      setStats(statsData);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-sky-500 animate-spin" />
      </div>
    );
  }

  const chartData = stats?.topUrls || [];
  const COLORS = ['#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e'];

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your links and see how they're performing.</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all disabled:opacity-50"
        >
          <RefreshCcw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard
          title="Total URLs"
          value={stats?.totalUrls || 0}
          icon={Link2}
          description="Total links shortened"
        />
        <AnalyticsCard
          title="Total Clicks"
          value={stats?.totalClicks || 0}
          icon={MousePointer2}
          description="Cumulative link visits"
        />
        <AnalyticsCard
          title="Avg. CTR"
          value={stats?.totalUrls > 0 ? (stats.totalClicks / stats.totalUrls).toFixed(1) : 0}
          icon={TrendingUp}
          description="Average clicks per URL"
        />
        <AnalyticsCard
          title="Active System"
          value="Healthy"
          icon={BarChart3}
          description="All services operational"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white px-1">Recent URLs</h2>
          </div>
          <UrlTable urls={urls} />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white px-1">Top Performing Links</h2>
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 h-[400px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis 
                    dataKey="shortCode" 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      borderColor: '#1e293b',
                      borderRadius: '12px',
                      color: '#f8fafc'
                    }}
                    cursor={{ fill: '#1e293b', opacity: 0.4 }}
                  />
                  <Bar dataKey="clicks" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm italic">
                No data available for charts
              </div>
            )}
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-500/20 to-transparent border border-sky-500/20">
            <h3 className="text-sky-400 font-bold mb-2">Pro Tip</h3>
            <p className="text-xs text-slate-400 leading-relaxed text-balance">
              Sharing your links on high-authority platforms can increase your click-through rate by up to 40%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
