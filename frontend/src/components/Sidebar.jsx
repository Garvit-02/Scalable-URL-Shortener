import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Link as LinkIcon, 
  PlusCircle, 
  BarChart3, 
  X,
  Zap
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Shorten URL', path: '/', icon: PlusCircle },
    { name: 'Links', path: '/links', icon: LinkIcon },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800 z-50 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
      {/* Logo Section */}
      <div className="p-8 flex items-center justify-between border-b border-gray-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
            <Zap size={22} fill="currentColor" />
          </div>
          <span className="text-xl font-black text-gray-100 tracking-tight">AI LINK</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500 hover:text-white">
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 group ${
                isActive 
                  ? 'bg-gray-800 text-indigo-400 border border-gray-700 shadow-sm' 
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 border border-transparent'
              }`
            }
          >
            <item.icon size={20} className="shrink-0 transition-colors group-hover:text-indigo-400" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Branding */}
      <div className="p-6 border-t border-gray-800">
        <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 text-center">Version 1.0.4</p>
          <p className="text-xs text-gray-400 text-center font-medium italic">Vercel Style Edition</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
