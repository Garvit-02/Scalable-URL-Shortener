import React from 'react';
import UrlShortenerCard from '../components/UrlShortenerCard';
import FeatureCard from '../components/FeatureCard';
import { 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Sparkles
} from 'lucide-react';

const Shorten = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-widest uppercase shadow-inner">
          <Sparkles size={14} className="animate-pulse" />
          The Intelligent URL Terminal
        </div>
        
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gray-100 leading-[1.1]">
          Make Your Links <span className="text-indigo-500">Smarter.</span>
        </h1>
        
        <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Professional grade URL shortening powered by AI security 
          and ultra-fast edge caching.
        </p>
      </div>

      {/* Main Shortener Widget */}
      <UrlShortenerCard />

      {/* Feature Section Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        <FeatureCard 
          icon={ShieldCheck}
          title="AI security"
          description="Every link is checked against our machine learning models for malware threats."
        />
        <FeatureCard 
          icon={Zap}
          title="Redis Speed"
          description="Sub-millisecond redirection times powered by our performance caching layer."
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

export default Shorten;
