import { Link, useLocation } from 'react-router-dom';
import { 
  FaChartPie, 
  FaRobot, 
  FaChartLine, 
  FaBullhorn, 
  FaGear, 
  FaBrain 
} from 'react-icons/fa6';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaChartPie, path: '/dashboard' },
    { id: 'agents', label: 'AI Agents', icon: FaRobot, path: '/agents' },
    { id: 'analytics', label: 'Analytics', icon: FaChartLine, path: '/analytics', disabled: true },
    { id: 'campaigns', label: 'Campaigns', icon: FaBullhorn, path: '/campaigns', disabled: true },
    { id: 'settings', label: 'Settings', icon: FaGear, path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-primary h-screen flex flex-col fixed left-0 top-0 z-50 text-white shadow-xl">
      <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-primary">
            <FaBrain />
          </div>
          <span className="text-xl font-bold tracking-tight">Marketing OS</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold text-white/50 uppercase tracking-widest mb-2">
          Main Menu
        </div>

        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.disabled ? '#' : item.path}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-all font-medium ${
              location.pathname === item.path
                ? 'bg-white/10 text-white shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <item.icon className="w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 shrink-0">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-medium text-white/50 uppercase tracking-wider">System Status</span>
            <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
          </div>
          <p className="text-sm font-bold">Healthy</p>
          <p className="text-[10px] text-white/40 mt-1">v2.4.1 — Connected</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
