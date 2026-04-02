import React from 'react';
import { ShieldCheck, User, Menu } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-gray-950/80 backdrop-blur-md border-b border-gray-800 z-40 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-gray-400 hover:text-white md:hidden transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
          <ShieldCheck className="w-3 h-3" />
          AI Security Active
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          {/* Notifications/Search can go here */}
        </button>
        <div className="h-8 w-[1px] bg-gray-800" />
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white leading-none">Garvit</p>
            <p className="text-[10px] text-gray-500 mt-1">Admin Account</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 overflow-hidden">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
