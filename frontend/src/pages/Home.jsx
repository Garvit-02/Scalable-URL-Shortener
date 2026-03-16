import React, { useState } from 'react';
import UrlForm from '../components/UrlForm';
import UrlResult from '../components/UrlResult';
import { shortenUrl } from '../services/api';
import { AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

const Home = () => {
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
      if (message.includes('malicious')) {
        setError('This URL appears unsafe and cannot be shortened.');
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full text-center mb-16 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-bold tracking-tight uppercase animate-in fade-in zoom-in duration-700">
          <Sparkles className="w-4 h-4" />
          AI-Powered Security Enabled
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
          Make Your Links <span className="text-sky-500">Intelligent</span>
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          The most advanced URL shortener with real-time AI security, 
          scalability, and detailed analytics.
        </p>
      </div>

      <UrlForm onShorten={handleShorten} isLoading={loading} />

      {error && (
        <div className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {result && <UrlResult result={result} />}

      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors group">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-500 mb-6 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">AI Malicious Detection</h3>
          <p className="text-slate-400">Our machine learning models analyze every link to protect you from phishing and malware.</p>
        </div>
        
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors group">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Redis-Powered Speed</h3>
          <p className="text-slate-400">Sub-millisecond redirection times thanks to our high-performance caching layer.</p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors group">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Deep Analytics</h3>
          <p className="text-slate-400">Track clicks, devices, and geolocations in real-time with our dashboard.</p>
        </div>
      </div>
    </div>
  );
};

// Need this to avoid build errors if LayoutDashboard isn't imported
import { LayoutDashboard } from 'lucide-react';

export default Home;
