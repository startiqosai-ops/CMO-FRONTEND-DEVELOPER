import React from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  FaRobot, FaBolt, FaChartLine, FaPiggyBank, 
  FaRocket, FaArrowsRotate, FaFileExport, FaPlus 
} from 'react-icons/fa6';
import { performanceData, activitiesData, agentsData } from '../data/mockData';

const StatCard = ({ title, value, subvalue, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay }}
    className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/50 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-semibold text-text-secondary">{title}</span>
      <div className={`p-2 rounded-lg bg-background/50 text-white`} style={{ backgroundColor: color }}>
        <Icon />
      </div>
    </div>
    <div>
      <div className="text-3xl font-bold text-text-primary">{value}</div>
      <div className="text-xs text-secondary font-medium mt-1">{subvalue}</div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Agents" value="11" subvalue="100% Active" icon={FaRobot} color="#4F46E5" delay={0.1} />
        <StatCard title="Active Agents" value="11" subvalue="Live monitoring" icon={FaBolt} color="#10B981" delay={0.2} />
        <StatCard title="ROAS" value="4.2x" subvalue="+12% vs last month" icon={FaChartLine} color="#8B5CF6" delay={0.3} />
        <StatCard title="Monthly Savings" value="$374K" subvalue="Target achieved" icon={FaPiggyBank} color="#D97706" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-Time Metrics Chart */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2 bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/50"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-text-primary">Real-Time Metrics</h2>
            <div className="flex space-x-4">
              <span className="flex items-center text-xs text-text-secondary"><span className="w-3 h-3 rounded-full bg-primary mr-1"></span> Traffic</span>
              <span className="flex items-center text-xs text-text-secondary"><span className="w-3 h-3 rounded-full bg-secondary mr-1"></span> Conversions</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(8px)', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="traffic" stroke="#4F46E5" fillOpacity={1} fill="url(#colorTraffic)" strokeWidth={2} />
                <Area type="monotone" dataKey="conversions" stroke="#10B981" fillOpacity={1} fill="url(#colorConversions)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Actions & System Health */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/50"
          >
            <h2 className="text-lg font-bold text-text-primary mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Launch', icon: FaRocket, color: 'text-primary' },
                { label: 'Refresh', icon: FaArrowsRotate, color: 'text-secondary' },
                { label: 'Export', icon: FaFileExport, color: 'text-accent' },
                { label: 'Campaign', icon: FaPlus, color: 'text-warning' }
              ].map((action, i) => (
                <button key={i} className="flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:bg-background/50 transition-all group">
                  <action.icon className={`${action.color} mb-2 text-xl group-hover:scale-110 transition-transform`} />
                  <span className="text-xs font-bold text-text-primary">{action.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/50"
          >
            <h2 className="text-lg font-bold text-text-primary mb-4">System Health</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary font-medium">API Status</span>
                <span className="text-[10px] font-bold text-secondary px-2 py-1 bg-secondary/10 rounded-full uppercase">Operational</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary font-medium">WebSocket</span>
                <span className="text-[10px] font-bold text-secondary px-2 py-1 bg-secondary/10 rounded-full uppercase">Connected</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary font-medium">Last Update</span>
                <span className="text-xs font-bold text-text-primary">2 mins ago</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fleet Overview Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/50"
      >
        <h2 className="text-lg font-bold text-text-primary mb-6">Agent Status Fleet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agentsData.slice(0, 4).map((agent, i) => (
            <div key={agent.id} className="p-4 rounded-xl border border-border bg-background/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-text-secondary uppercase">{agent.department}</span>
                <span className={`w-2 h-2 rounded-full ${agent.status === 'Online' ? 'bg-secondary' : 'bg-warning'}`}></span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: agent.color }}>
                  <FaRobot />
                </div>
                <div>
                  <div className="font-bold text-text-primary">{agent.name}</div>
                  <div className="text-[10px] text-text-secondary font-medium">{agent.tasksDone} tasks completed</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/50 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-text-primary">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-background/50 text-text-secondary text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Agent</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {activitiesData.map((activity) => (
                <tr key={activity.id} className="hover:bg-background/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-text-secondary">{activity.time}</td>
                  <td className="px-6 py-4 font-bold text-text-primary">{activity.agent}</td>
                  <td className="px-6 py-4 text-sm text-text-primary">{activity.action}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                      activity.status === 'Completed' ? 'text-secondary bg-secondary/10' : 'text-error bg-error/10'
                    }`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
