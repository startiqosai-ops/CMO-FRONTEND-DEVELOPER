import { FaBell, FaCircleQuestion, FaMagnifyingGlass } from 'react-icons/fa6';

const Header = () => {
  return (
    <header className="h-16 bg-white/70 backdrop-blur-md border-b border-border flex items-center justify-between px-6 sticky top-0 z-40 w-full">
      <div className="flex items-center flex-1">
        <div className="relative w-96">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-secondary">
            <FaMagnifyingGlass className="text-sm" />
          </span>
          <input 
            type="text" 
            placeholder="Search for agents, tasks, or metrics..." 
            className="block w-full pl-10 pr-3 py-2 border border-border rounded-md bg-background/50 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-text-secondary hover:text-primary transition-colors">
          <FaBell />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-white"></span>
        </button>
        <button className="p-2 text-text-secondary hover:text-primary transition-colors">
          <FaCircleQuestion />
        </button>
        <div className="w-px h-8 bg-border mx-2"></div>
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">Admin User</p>
            <p className="text-xs text-text-secondary">System Administrator</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-md">
            AU
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
