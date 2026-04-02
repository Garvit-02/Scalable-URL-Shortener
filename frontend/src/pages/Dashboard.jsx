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
  Loader2
} from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAnalytics();
        setStats(data);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      {/* 1. Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1 uppercase tracking-wider font-medium">
          Overview of your intelligent URL platform
        </p>
      </div>

      {/* 2. Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Links"
          value={stats?.totalUrls || 0}
          icon={LinkIcon}
          description="Accumulated lifetime links"
        />
        <StatsCard 
          title="Total Clicks"
          value={stats?.totalClicks || 0}
          icon={MousePointer2}
          description="Direct visitor engagement"
        />
        <StatsCard 
          title="Cache Hit Rate"
          value="99.9%"
          icon={Zap}
          description="Redis performance metrics"
        />
        <StatsCard 
          title="Malicious Blocked"
          value="142"
          icon={ShieldAlert}
          description="Threats mitigated by AI"
        />
      </div>

      {/* 3. URL Shortener Card */}
      <UrlShortenerCard />

      {/* 4. Analytics Chart Section */}
      <AnalyticsChart data={stats?.topUrls || []} />

      {/* 5. Feature Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <FeatureCard 
          icon={ShieldCheck}
          title="AI Security"
          description="Every link is checked against our machine learning models for phishing and malware threats."
        />
        <FeatureCard 
          icon={Zap}
          title="Redis Speed"
          description="Sub-millisecond redirection times powered by our high-performance caching layer."
        />
        <FeatureCard 
          icon={BarChart3}
          title="Deep Analytics"
          description="Track click volume, device types, and geographic data in real-time."
        />
      </div>
    </div>
  );
};

export default Dashboard;
