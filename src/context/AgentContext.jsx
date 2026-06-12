import React, { createContext, useContext, useState } from 'react';
import { agentsData } from '../data/mockData';

const AgentContext = createContext();

export const AgentProvider = ({ children }) => {
  const [agents, setAgents] = useState(agentsData);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = agents.filter(agent => {
    const matchesFilter = filter === 'All' || agent.status === filter;
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          agent.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <AgentContext.Provider value={{ 
      agents, 
      filteredAgents, 
      filter, 
      setFilter, 
      searchQuery, 
      setSearchQuery 
    }}>
      {children}
    </AgentContext.Provider>
  );
};

export const useAgents = () => useContext(AgentContext);
