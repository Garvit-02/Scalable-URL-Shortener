import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Link as LinkIcon, 
  BarChart3, 
  Settings,
  ShieldHalf,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Shorten URL', path: '/', icon: PlusCircle },
    { name: 'Links', path: '/links', icon: LinkIcon },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800 z-50 flex flex-col transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
            <LinkIcon className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            AI Shortener
          </span>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="p-2 text-gray-500 hover:text-white md:hidden transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white border border-transparent'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-gray-800">
        <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 mb-4">
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <ShieldHalf className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">AI Shield</span>
          </div>
          <p className="text-[10px] text-gray-400 leading-relaxed">
            Real-time phishing and malware detection is currently active.
          </p>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800 hover:text-white transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
