import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Bot, BarChart3, Megaphone, Settings, X } from 'lucide-react'

function Sidebar({ isOpen, onClose }) {
  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/agents', icon: Bot, label: 'AI Agents' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/campaigns', icon: Megaphone, label: 'Campaigns' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 bg-indigo-700 flex flex-col h-full shrink-0 fixed lg:static inset-y-0 left-0 z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b border-indigo-600 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">CMO AI</h1>
              <p className="text-indigo-200 text-xs mt-0.5">Autonomous Marketing OS</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-indigo-300 hover:text-white p-1.5 rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => {
                if (window.innerWidth < 1024) onClose()
              }}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-white/70 hover:bg-white/10'
                }`
              }
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-indigo-600">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">John Doe</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-indigo-200 text-xs">Online</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

