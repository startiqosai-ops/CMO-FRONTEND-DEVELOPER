import { useLocation } from 'react-router-dom'
import { Play, Bell, Menu } from 'lucide-react'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/agents': 'AI Agents',
  '/analytics': 'Analytics',
  '/campaigns': 'Campaigns',
  '/settings': 'Settings',
}

function Header({ onMenuClick }) {
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Dashboard'

  const launchOrchestrator = () => {
    alert('Orchestrator launch triggered! This would start all AI agents.')
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 shrink-0 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-lg md:text-xl font-bold text-gray-800 truncate">{title}</h2>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={launchOrchestrator}
          className="flex items-center gap-2 px-3 md:px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors duration-200"
        >
          <Play className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Launch Orchestrator</span>
        </button>
        <div className="relative">
          <button className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-[18px] h-[18px]" />
          </button>
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            3
          </span>
        </div>
        <div className="w-9 h-9 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm cursor-pointer select-none hover:bg-indigo-700 transition-colors">
          JD
        </div>
      </div>
    </header>
  )
}

export default Header

