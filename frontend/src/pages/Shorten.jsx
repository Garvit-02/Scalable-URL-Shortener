import React, { useState } from 'react';
import UrlForm from '../components/UrlForm';
import UrlResult from '../components/UrlResult';
import FeatureCard from '../components/FeatureCard';
import { shortenUrl } from '../services/api';
import { 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

const Shorten = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleShorten = async (url) => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const data = await shortenUrl(url);
      setResult(data);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to shorten URL. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase animate-in fade-in zoom-in duration-700">
          <Sparkles className="w-4 h-4" />
          The Intelligent URL Shortener
        </div>
        
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
          Make Your Links <span className="text-indigo-500">Smarter.</span>
        </h1>
        
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          AI-powered URL shortening with real-time security analysis, 
          ultra-fast caching, and deep performance insights.
        </p>
      </div>

      <UrlForm onShorten={handleShorten} isLoading={loading} />

      {error && (
        <div className="mt-8 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium text-sm">{error}</p>
        </div>
      )}

      {result && <UrlResult result={result} />}

      {/* Feature Section */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <FeatureCard 
          icon={ShieldCheck}
          title="AI Security"
          description="Every link is checked against our machine learning models for phishing and malware threats."
          color="bg-emerald-500/10 text-emerald-400"
        />
        <FeatureCard 
          icon={Zap}
          title="Redis Speed"
          description="Sub-millisecond redirection times powered by our high-performance caching layer."
          color="bg-indigo-500/10 text-indigo-400"
        />
        <FeatureCard 
          icon={BarChart3}
          title="Deep Analytics"
          description="Track click volume, device types, and geographic data in real-time."
          color="bg-purple-500/10 text-purple-400"
        />
      </div>
    </div>
  );
};

export default Shorten;
