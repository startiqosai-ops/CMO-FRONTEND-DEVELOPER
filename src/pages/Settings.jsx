import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGear, FaNetworkWired, FaKey, FaBell, FaUsers, FaPlus, 
  FaPenToSquare, FaUserSlash, FaEye, FaArrowsRotate, FaTrash 
} from 'react-icons/fa6';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: FaGear },
    { id: 'n8n', label: 'n8n Connection', icon: FaNetworkWired },
    { id: 'api', label: 'API Keys', icon: FaKey },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'users', label: 'Users', icon: FaUsers },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
          <p className="text-sm text-text-secondary">Configure your CMO AI Platform and integrations.</p>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/50 overflow-hidden">
          <div className="flex border-b border-border bg-background/30">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-bold flex items-center space-x-2 transition-all border-b-2 ${
                  activeTab === tab.id 
                    ? 'border-primary text-primary bg-white shadow-sm' 
                    : 'border-transparent text-text-secondary hover:text-primary hover:bg-white/50'
                }`}
              >
                <tab.icon className="text-xs" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {activeTab === 'general' && (
                <motion.div
                  key="general"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-text-secondary uppercase">Platform Name</label>
                      <input type="text" defaultValue="Marketing OS" className="w-full p-2.5 border border-border rounded-lg text-sm bg-background/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-text-secondary uppercase">Company Name</label>
                      <input type="text" defaultValue="CMO AI Solutions" className="w-full p-2.5 border border-border rounded-lg text-sm bg-background/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-text-secondary uppercase">Default Timezone</label>
                      <select className="w-full p-2.5 border border-border rounded-lg text-sm bg-background/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                        <option>PST (Pacific Standard Time)</option>
                        <option>EST (Eastern Standard Time)</option>
                        <option>UTC (Coordinated Universal Time)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold text-text-secondary uppercase">Language</label>
                      <select className="w-full p-2.5 border border-border rounded-lg text-sm bg-background/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex space-x-3 pt-4 border-t border-border">
                    <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md hover:brightness-105 transition-all">Save Changes</button>
                    <button className="border border-border bg-white text-text-primary px-6 py-2 rounded-lg font-bold text-sm hover:bg-background/50 transition-all">Reset Defaults</button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'n8n' && (
                <motion.div
                  key="n8n"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-text-secondary uppercase">Webhook URL</label>
                        <input type="text" placeholder="https://n8n.yourdomain.com/webhook/..." className="w-full p-2.5 border border-border rounded-lg text-sm bg-background/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[10px] font-bold text-text-secondary uppercase">API Token</label>
                        <input type="password" defaultValue="n8n_api_8372648590123" className="w-full p-2.5 border border-border rounded-lg text-sm bg-background/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                      </div>
                    </div>
                    <div className="bg-background/50 p-6 rounded-xl border border-border h-fit">
                      <h3 className="text-xs font-bold text-text-primary mb-4">Connection Status</h3>
                      <div className="flex items-center space-x-3 text-secondary">
                        <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                        <span className="font-bold text-sm uppercase">Connected</span>
                      </div>
                      <p className="text-[10px] text-text-secondary mt-2 font-medium">Last handshake: 2 mins ago</p>
                    </div>
                  </div>
                  <div className="flex space-x-3 pt-4 border-t border-border">
                    <button className="bg-secondary text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md hover:brightness-105 transition-all">Test Connection</button>
                    <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md hover:brightness-105 transition-all">Save Config</button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'api' && (
                <motion.div
                  key="api"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-text-primary">API Integrations</h3>
                    <button className="text-xs font-bold text-primary hover:underline flex items-center">
                      <FaPlus className="mr-1" /> Add Provider
                    </button>
                  </div>
                  <div className="overflow-x-auto border border-border rounded-xl bg-background/20">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-background/50 text-text-secondary text-[10px] font-bold uppercase tracking-wider">
                        <tr>
                          <th className="px-6 py-3">Service</th>
                          <th className="px-6 py-3">Key</th>
                          <th className="px-6 py-3">Status</th>
                          <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {[
                          { name: 'OpenAI', key: 'sk-proj-••••••••', status: 'Active' },
                          { name: 'Anthropic', key: 'sk-ant-••••••••', status: 'Active' },
                          { name: 'Google Gemini', key: 'AIzaSy••••••••', status: 'Active' },
                          { name: 'Perplexity', key: 'pplx-••••••••', status: 'Expired' },
                        ].map((api, i) => (
                          <tr key={i} className="hover:bg-background/30 transition-colors">
                            <td className="px-6 py-4 font-bold text-text-primary">{api.name}</td>
                            <td className="px-6 py-4 font-mono text-xs text-text-secondary">{api.key}</td>
                            <td className="px-6 py-4">
                              <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                                api.status === 'Active' ? 'text-secondary bg-secondary/10' : 'text-warning bg-warning/10'
                              }`}>
                                {api.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right space-x-3">
                              <button className="text-text-secondary hover:text-primary"><FaEye /></button>
                              <button className="text-text-secondary hover:text-accent"><FaArrowsRotate /></button>
                              <button className="text-text-secondary hover:text-error"><FaTrash /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {[
                    { title: 'Email Notifications', desc: 'Daily reports and critical alerts' },
                    { title: 'Agent Alerts', desc: 'When agents encounter errors' },
                    { title: 'System Alerts', desc: 'Maintenance and updates' },
                    { title: 'Campaign Updates', desc: 'Status changes for active campaigns' },
                  ].map((n, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-background/30 transition-all group">
                      <div>
                        <p className="text-sm font-bold text-text-primary">{n.title}</p>
                        <p className="text-xs text-text-secondary">{n.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={i < 3} className="sr-only peer" />
                        <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-border">
                    <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm shadow-md hover:brightness-105 transition-all">Save Preferences</button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'users' && (
                <motion.div
                  key="users"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-text-primary">Team Management</h3>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-xs shadow-md hover:brightness-105 transition-all flex items-center">
                      <FaPlus className="mr-2" /> Add User
                    </button>
                  </div>
                  <div className="overflow-x-auto border border-border rounded-xl bg-background/20">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-background/50 text-text-secondary text-[10px] font-bold uppercase tracking-wider">
                        <tr>
                          <th className="px-6 py-3">Name</th>
                          <th className="px-6 py-3">Role</th>
                          <th className="px-6 py-3">Status</th>
                          <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {[
                          { name: 'Admin User', email: 'admin@marketingos.ai', role: 'Admin', status: 'Online', color: 'bg-primary' },
                          { name: 'Sarah Miller', email: 'sarah@marketingos.ai', role: 'Manager', status: 'Online', color: 'bg-secondary' },
                          { name: 'John Doe', email: 'john@marketingos.ai', role: 'Viewer', status: 'Offline', color: 'bg-accent' },
                        ].map((user, i) => (
                          <tr key={i} className="hover:bg-background/30 transition-colors">
                            <td className="px-6 py-4 flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}>
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="font-bold text-text-primary">{user.name}</p>
                                <p className="text-[10px] text-text-secondary">{user.email}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4"><span className="px-2 py-1 bg-background text-text-secondary text-[10px] font-bold rounded-md border border-border">{user.role}</span></td>
                            <td className="px-6 py-4">
                              <span className={`flex items-center text-[10px] font-bold uppercase ${user.status === 'Online' ? 'text-secondary' : 'text-text-secondary'}`}>
                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === 'Online' ? 'bg-secondary animate-pulse' : 'bg-text-secondary'}`}></span>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right space-x-3">
                              <button className="text-text-secondary hover:text-primary"><FaPenToSquare /></button>
                              <button className="text-text-secondary hover:text-error"><FaUserSlash /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-80 space-y-6">
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/50">
          <h2 className="text-lg font-bold text-text-primary mb-4">System Info</h2>
          <div className="space-y-4">
            {[
              { label: 'Version', value: 'v2.4.1' },
              { label: 'Environment', value: 'Production', type: 'badge' },
              { label: 'Database', value: 'Operational', type: 'status' },
              { label: 'Last Updated', value: 'Jun 12, 12:20 PM' }
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center text-xs">
                <span className="text-text-secondary font-medium">{item.label}</span>
                {item.type === 'badge' ? (
                  <span className="px-2 py-0.5 bg-secondary/10 text-secondary rounded font-bold uppercase">{item.value}</span>
                ) : item.type === 'status' ? (
                  <span className="flex items-center text-secondary font-bold">
                    <span className="w-1.5 h-1.5 bg-secondary rounded-full mr-1.5 animate-pulse"></span>{item.value}
                  </span>
                ) : (
                  <span className="text-text-primary font-bold">{item.value}</span>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-text-secondary uppercase">System Health</span>
                <span className="text-[10px] font-bold text-secondary">99.9%</span>
              </div>
              <div className="w-full bg-background/50 rounded-full h-1.5">
                <div className="bg-secondary h-1.5 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" style={{ width: '99.9%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-primary p-6 rounded-xl shadow-lg text-white relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          <h3 className="font-bold text-sm mb-2 relative z-10">Need help?</h3>
          <p className="text-xs text-white/80 mb-4 leading-relaxed relative z-10">Check our documentation or contact support for advanced configuration assistance.</p>
          <button className="w-full bg-white text-primary py-2.5 rounded-lg font-bold text-xs hover:bg-white/90 transition-all relative z-10 shadow-md">Support Center</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
