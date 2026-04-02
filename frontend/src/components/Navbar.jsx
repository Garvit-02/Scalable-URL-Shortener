import React from 'react';
import { useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, User } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Dashboard';
      case '/': return 'Shorten URL';
      case '/links': return 'My Links';
      case '/analytics': return 'Analytics';
      default: return 'Overview';
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50 z-40 px-6 flex items-center justify-between transition-all">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden p-2 -ml-2 text-gray-400 hover:text-white">
          <Menu size={24} />
        </button>
        <h2 className="text-lg font-bold text-gray-200 hidden sm:block">
          {getPageTitle()}
        </h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Status Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
          <ShieldCheck size={14} />
          AI Security Active
        </div>

        {/* User Section */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-800">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-gray-100 leading-none">Garvit</p>
            <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-tighter">Pro Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center text-gray-400 cursor-pointer hover:border-indigo-500 transition-colors overflow-hidden">
             <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
