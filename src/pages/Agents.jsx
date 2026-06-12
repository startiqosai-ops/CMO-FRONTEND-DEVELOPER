import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRobot, FaMagnifyingGlass, FaPlus, FaXmark, 
  FaCirclePlay, FaCirclePause, FaRotateRight, FaCircleStop 
} from 'react-icons/fa6';
import { useAgents } from '../context/AgentContext';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const AgentCard = ({ agent, onClick }) => (
  <motion.div
    layoutId={`agent-${agent.id}`}
    onClick={() => onClick(agent)}
    className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-lg border border-white/50 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg shadow-sm" style={{ backgroundColor: agent.color }}>
          <FaRobot />
        </div>
        <div>
          <h3 className="font-bold text-text-primary">{agent.name}</h3>
          <p className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">{agent.department}</p>
        </div>
      </div>
      <span className={`w-2.5 h-2.5 rounded-full ${
        agent.status === 'Online' ? 'bg-secondary animate-pulse' : 
        agent.status === 'Working' ? 'bg-accent' : 'bg-text-secondary'
      }`}></span>
    </div>
    
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="bg-background/50 p-2 rounded-lg text-center">
        <p className="text-[9px] font-bold text-text-secondary uppercase">Success Rate</p>
        <p className="text-sm font-bold text-text-primary">{agent.successRate}%</p>
      </div>
      <div className="bg-background/50 p-2 rounded-lg text-center">
        <p className="text-[9px] font-bold text-text-secondary uppercase">Tasks</p>
        <p className="text-sm font-bold text-text-primary">{agent.tasksDone}</p>
      </div>
    </div>

    <div className="flex space-x-2">
      <button className="flex-1 text-[10px] font-bold py-1.5 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors">Monitor</button>
      <button className="flex-1 text-[10px] font-bold py-1.5 rounded-md border border-border text-text-primary hover:bg-background/50 transition-colors">Config</button>
    </div>
  </motion.div>
);

const AgentModal = ({ agent, onClose }) => {
  const [activeTab, setActiveTab] = useState('status');
  
  if (!agent) return null;

  const chartData = [
    { name: '10:00', value: 85 },
    { name: '11:00', value: 92 },
    { name: '12:00', value: 88 },
    { name: '13:00', value: 95 },
    { name: '14:00', value: 91 },
    { name: '15:00', value: 99 },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-text-primary/70 backdrop-blur-sm"
      />
      <motion.div
        layoutId={`agent-${agent.id}`}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden relative z-10"
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl shadow-md" style={{ backgroundColor: agent.color }}>
              <FaRobot />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">{agent.name}</h2>
              <p className={`text-xs font-bold uppercase tracking-widest ${
                agent.status === 'Online' ? 'text-secondary' : 
                agent.status === 'Working' ? 'text-accent' : 'text-text-secondary'
              }`}>{agent.status}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-background rounded-full transition-colors">
            <FaXmark className="text-xl text-text-secondary" />
          </button>
        </div>

        <div className="flex border-b border-border bg-background/30">
          {['status', 'queue', 'config', 'logs'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-bold capitalize transition-all border-b-2 ${
                activeTab === tab 
                  ? 'border-primary text-primary bg-white' 
                  : 'border-transparent text-text-secondary hover:text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'status' && (
              <motion.div
                key="status"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <p className="text-[10px] font-bold text-text-secondary uppercase mb-1">Success Rate</p>
                    <p className="text-2xl font-bold text-text-primary">{agent.successRate}%</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <p className="text-[10px] font-bold text-text-secondary uppercase mb-1">Avg Response</p>
                    <p className="text-2xl font-bold text-text-primary">1.2s</p>
                  </div>
                  <div className="bg-background/50 p-4 rounded-xl border border-border">
                    <p className="text-[10px] font-bold text-text-secondary uppercase mb-1">Total Tasks</p>
                    <p className="text-2xl font-bold text-text-primary">{agent.tasksDone}</p>
                  </div>
                </div>
                <div className="bg-white border border-border p-4 rounded-xl h-64">
                  <h3 className="text-xs font-bold text-text-secondary uppercase mb-4">Performance Velocity</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <XAxis dataKey="name" hide />
                      <YAxis hide domain={[0, 100]} />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke={agent.color} fill={agent.color} fillOpacity={0.1} strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}
            {activeTab === 'queue' && (
              <motion.div
                key="queue"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 border border-border rounded-xl bg-background/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-sm font-bold text-text-primary">Task #A-29{i}: Processing data stream</span>
                    </div>
                    <span className="text-[10px] font-bold text-primary px-2 py-1 bg-white rounded shadow-sm">High Priority</span>
                  </div>
                ))}
              </motion.div>
            )}
            {activeTab === 'config' && (
              <motion.div
                key="config"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-md space-y-4"
              >
                <div>
                  <label className="block text-[10px] font-bold text-text-secondary uppercase mb-2">Primary Model</label>
                  <select className="w-full p-2.5 border border-border rounded-lg text-sm bg-background/50 outline-none focus:ring-2 focus:ring-primary/20">
                    <option>GPT-4o (Default)</option>
                    <option>Claude 3.5 Sonnet</option>
                    <option>Gemini 1.5 Pro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-text-secondary uppercase mb-2">Temperature (0.7)</label>
                  <input type="range" className="w-full accent-primary" />
                </div>
              </motion.div>
            )}
            {activeTab === 'logs' && (
              <motion.div
                key="logs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-text-primary rounded-xl p-4 font-mono text-xs text-white/90 h-64 overflow-y-auto space-y-1"
              >
                <p className="text-secondary">[2024-05-20 14:02:11] Handshake successful.</p>
                <p>[2024-05-20 14:02:15] Loading vector context...</p>
                <p>[2024-05-20 14:05:32] Task ID: #A-294 initialized.</p>
                <p className="text-warning">[2024-05-20 14:10:02] Warning: High latency from API.</p>
                <p>[2024-05-20 14:12:45] Reasoning chain complete.</p>
                <p className="text-primary">[2024-05-20 14:13:00] Transmitting response...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 border-t border-border bg-background/30 flex space-x-3">
          <button className="flex-1 flex items-center justify-center space-x-2 bg-secondary text-white py-2.5 rounded-xl font-bold text-sm shadow-md hover:brightness-105 transition-all">
            <FaCirclePlay /> <span>Start</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 bg-accent text-white py-2.5 rounded-xl font-bold text-sm shadow-md hover:brightness-105 transition-all">
            <FaCirclePause /> <span>Pause</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 bg-warning text-white py-2.5 rounded-xl font-bold text-sm shadow-md hover:brightness-105 transition-all">
            <FaRotateRight /> <span>Restart</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 bg-error text-white py-2.5 rounded-xl font-bold text-sm shadow-md hover:brightness-105 transition-all">
            <FaCircleStop /> <span>Stop</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Agents = () => {
  const { filteredAgents, filter, setFilter, searchQuery, setSearchQuery } = useAgents();
  const [selectedAgent, setSelectedAgent] = useState(null);

  const filters = ['All', 'Online', 'Working', 'Offline'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">AI Agents Fleet</h1>
          <p className="text-sm text-text-secondary">Monitor and configure 11 autonomous agents.</p>
        </div>
        <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all flex items-center">
          <FaPlus className="mr-2" /> Deploy New Agent
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/50">
        <div className="flex bg-background/50 p-1 rounded-lg">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                filter === f 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-text-secondary hover:text-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-secondary">
            <FaMagnifyingGlass className="text-xs" />
          </span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agents by name or department..." 
            className="block w-full pl-9 pr-3 py-2 border border-border rounded-lg text-sm bg-background/30 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {filteredAgents.map((agent) => (
            <AgentCard 
              key={agent.id} 
              agent={agent} 
              onClick={setSelectedAgent} 
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedAgent && (
          <AgentModal 
            agent={selectedAgent} 
            onClose={() => setSelectedAgent(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Agents;
