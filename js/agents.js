/**
 * AI Agents Management Logic
 */

const allAgents = [
    { id: 1, name: "SEO Strategist", role: "Search Optimization", status: "online", efficiency: "94%", tasks: 1240, icon: "fa-search" },
    { id: 2, name: "Ad Optimizer", role: "Paid Media", status: "working", efficiency: "98%", tasks: 850, icon: "fa-rectangle-ad" },
    { id: 3, name: "Content AI", role: "Content Generation", status: "online", efficiency: "91%", tasks: 420, icon: "fa-pen-nib" },
    { id: 4, name: "Email Bot", role: "Email Marketing", status: "working", efficiency: "88%", tasks: 2100, icon: "fa-envelope" },
    { id: 5, name: "Social Manager", role: "Social Media", status: "online", efficiency: "82%", tasks: 340, icon: "fa-share-nodes" },
    { id: 6, name: "Market Analyst", role: "Research & Analysis", status: "offline", efficiency: "0%", tasks: 0, icon: "fa-chart-pie" },
    { id: 7, name: "Lead Finder", role: "B2B Prospecting", status: "working", efficiency: "95%", tasks: 150, icon: "fa-user-plus" },
    { id: 8, name: "Budget Monitor", role: "Financial Control", status: "online", efficiency: "100%", tasks: 50, icon: "fa-scale-balanced" },
    { id: 9, name: "Creative Gen", role: "Design & Video", status: "working", efficiency: "92%", tasks: 85, icon: "fa-palette" },
    { id: 10, name: "Competitor AI", role: "Market Intel", status: "online", efficiency: "96%", tasks: 300, icon: "fa-eye" },
    { id: 11, name: "Brand Guardian", role: "Compliance", status: "online", efficiency: "100%", tasks: 12, icon: "fa-shield-halved" }
];

let filteredAgents = [...allAgents];
let performanceChart = null;

function renderAgentGrid() {
    const grid = document.getElementById('agent-grid');
    if (!grid) return;
    
    grid.innerHTML = filteredAgents.map(agent => {
        const statusColor = agent.status === 'online' ? '#10B981' : (agent.status === 'working' ? '#4F46E5' : '#6B7280');
        const statusBg = agent.status === 'online' ? '#ECFDF5' : (agent.status === 'working' ? '#EEF2FF' : '#F3F4F6');
        const statusText = agent.status === 'online' ? '#059669' : (agent.status === 'working' ? '#4338CA' : '#374151');

        return `
        <div class="bg-white border border-[#E5E7EB] rounded-lg p-6 shadow-sm hover:shadow-md hover:border-[#4F46E5] transition-all group">
            <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center bg-gray-50 text-gray-500 group-hover:bg-[#EEF2FF] group-hover:text-[#4F46E5] transition-colors shadow-sm">
                    <i class="fa-solid ${agent.icon} text-lg"></i>
                </div>
                <span class="px-2.5 py-1 text-[10px] font-bold uppercase rounded-full" style="background-color: ${statusBg}; color: ${statusText}">
                    ${agent.status}
                </span>
            </div>
            <h3 class="font-bold text-[#1F2937] group-hover:text-[#4F46E5] transition-colors">${agent.name}</h3>
            <p class="text-xs text-[#6B7280] mb-4 font-medium uppercase tracking-tight">${agent.role}</p>
            
            <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-gray-50 p-2 rounded border border-gray-100 text-center">
                    <p class="text-[10px] font-bold text-gray-400 uppercase">Efficiency</p>
                    <p class="text-sm font-bold text-[#1F2937]">${agent.efficiency}</p>
                </div>
                <div class="bg-gray-50 p-2 rounded border border-gray-100 text-center">
                    <p class="text-[10px] font-bold text-gray-400 uppercase">Tasks</p>
                    <p class="text-sm font-bold text-[#1F2937]">${agent.tasks.toLocaleString()}</p>
                </div>
            </div>
            
            <button onclick="openAgentModal(${agent.id})" class="w-full py-2.5 bg-[#F3F4F6] text-[#1F2937] rounded-md font-bold text-xs hover:bg-[#4F46E5] hover:text-white transition-all">
                MANAGE AGENT
            </button>
        </div>
        `;
    }).join('');
}

function filterAgents(status) {
    if (status === 'all') {
        filteredAgents = [...allAgents];
    } else {
        filteredAgents = allAgents.filter(a => a.status === status);
    }
    
    // Update button states
    const buttons = document.querySelectorAll('.filter-bar button');
    buttons.forEach(btn => {
        btn.classList.remove('bg-[#EEF2FF]', 'text-[#4F46E5]', 'border-[#4F46E5]');
        btn.classList.add('text-[#6B7280]', 'border-transparent');
    });
    
    renderAgentGrid();
}

function searchAgents() {
    const query = document.getElementById('agentSearch').value.toLowerCase();
    filteredAgents = allAgents.filter(a => 
        a.name.toLowerCase().includes(query) || 
        a.role.toLowerCase().includes(query)
    );
    renderAgentGrid();
}

function openAgentModal(id) {
    const agent = allAgents.find(a => a.id === id);
    if (!agent) return;

    document.getElementById('modalAgentName').textContent = agent.name;
    document.getElementById('modalAgentStatus').innerHTML = `
        <span class="w-2 h-2 rounded-full bg-[#10B981] mr-2"></span> ${agent.status}
    `;
    
    document.getElementById('agentModal').classList.remove('hidden');
    initializeAgentChart();
}

function closeAgentModal() {
    document.getElementById('agentModal').classList.add('hidden');
    if (performanceChart) {
        performanceChart.destroy();
        performanceChart = null;
    }
}

function switchTab(tabId) {
    const tabs = ['status', 'queue', 'config', 'logs'];
    tabs.forEach(t => {
        const btn = document.getElementById(`tab-${t}`);
        const content = document.getElementById(`content-${t}`);
        
        if (t === tabId) {
            btn.classList.add('border-[#4F46E5]', 'text-[#4F46E5]');
            btn.classList.remove('border-transparent', 'text-[#6B7280]');
            content?.classList.remove('hidden');
        } else {
            btn.classList.remove('border-[#4F46E5]', 'text-[#4F46E5]');
            btn.classList.add('border-transparent', 'text-[#6B7280]');
            content?.classList.add('hidden');
        }
    });
}

function initializeAgentChart() {
    const canvas = document.getElementById('agentPerformanceChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    performanceChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Task Velocity',
                data: [65, 82, 75, 94, 88, 45, 30],
                backgroundColor: '#4F46E5',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, grid: { display: false } },
                x: { grid: { display: false } }
            }
        }
    });
}

function agentAction(action) {
    console.log(`Action: ${action} initiated for current agent.`);
    alert(`Agent command [${action.toUpperCase()}] broadcasted to system nodes.`);
}

document.addEventListener('DOMContentLoaded', () => {
    renderAgentGrid();
});