// js/agents.js

const allAgents = [
    { id: 1, name: "CMO Orchestrator", icon: "fa-brain", status: "Online", performance: "98%", tasks: 142, description: "Master system brain" },
    { id: 2, name: "Brand Manager", icon: "fa-palette", status: "Working", performance: "94%", tasks: 89, description: "Visual identity lead" },
    { id: 3, name: "SEO Strategist", icon: "fa-magnifying-glass-chart", status: "Online", performance: "91%", tasks: 210, description: "Search optimization" },
    { id: 4, name: "Social Specialist", icon: "fa-hashtag", status: "Working", performance: "88%", tasks: 324, description: "Social channel growth" },
    { id: 5, name: "Email Marketer", icon: "fa-envelope-open-text", status: "Online", performance: "95%", tasks: 156, description: "Drip campaign expert" },
    { id: 6, name: "Paid Media Buyer", icon: "fa-money-bill-trend-up", status: "Offline", performance: "97%", tasks: 45, description: "Ad spend optimizer" },
    { id: 7, name: "Content Writer", icon: "fa-pen-nib", status: "Online", performance: "92%", tasks: 112, description: "AI copywriter" },
    { id: 8, name: "Market Researcher", icon: "fa-chart-pie", status: "Online", performance: "89%", tasks: 67, description: "Competitor intelligence" },
    { id: 9, name: "Customer Support", icon: "fa-headset", status: "Online", performance: "99%", tasks: 432, description: "Autonomous helpdesk" },
    { id: 10, name: "Operations Mgr", icon: "fa-gears", status: "Working", performance: "96%", tasks: 28, description: "Workflow coordinator" },
    { id: 11, name: "PR Specialist", icon: "fa-newspaper", status: "Online", performance: "90%", tasks: 54, description: "Media relations bot" }
];

let currentFilter = 'All';
let agentPerformanceChart = null;

function renderAgentsFull() {
    const grid = document.getElementById('agentGridFull');
    if (!grid) return;

    const searchTerm = document.getElementById('agentSearch').value.toLowerCase();
    
    const filtered = allAgents.filter(agent => {
        const matchesFilter = currentFilter === 'All' || agent.status === currentFilter;
        const matchesSearch = agent.name.toLowerCase().includes(searchTerm);
        return matchesFilter && matchesSearch;
    });

    grid.innerHTML = filtered.map(agent => `
        <div class="bg-white p-6 rounded-lg shadow-sm border border-[#E5E7EB] hover:shadow-md hover:border-[#4F46E5] transition-all cursor-pointer group" onclick="openAgentModal(${agent.id})">
            <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 bg-[#F3F4F6] text-[#4F46E5] rounded-md flex items-center justify-center text-xl group-hover:bg-[#4F46E5] group-hover:text-white transition-all">
                    <i class="fa-solid ${agent.icon}"></i>
                </div>
                <span class="text-[10px] font-bold ${getStatusColor(agent.status)} px-2 py-1 bg-[#F3F4F6] rounded uppercase">${agent.status}</span>
            </div>
            <h3 class="font-bold text-[#1F2937] text-base group-hover:text-[#4F46E5] transition-colors">${agent.name}</h3>
            <p class="text-xs text-[#6B7280] mt-1 line-clamp-1">${agent.description}</p>
            <div class="mt-4 flex justify-between items-center bg-[#F3F4F6] p-3 rounded-md">
                <div class="text-center">
                    <p class="text-[10px] text-[#6B7280] uppercase font-bold">Perf</p>
                    <p class="text-sm font-bold text-[#1F2937]">${agent.performance}</p>
                </div>
                <div class="text-center">
                    <p class="text-[10px] text-[#6B7280] uppercase font-bold">Tasks</p>
                    <p class="text-sm font-bold text-[#1F2937]">${agent.tasks}</p>
                </div>
            </div>
            <div class="mt-4 flex space-x-2">
                <button class="flex-1 py-2 text-[#4F46E5] text-[10px] font-bold uppercase border border-[#E5E7EB] rounded-md hover:bg-[#F3F4F6] transition-all">Configure</button>
            </div>
        </div>
    `).join('');
}

function getStatusColor(status) {
    switch (status) {
        case 'Online': return 'text-[#059669]';
        case 'Working': return 'text-[#4F46E5]';
        case 'Offline': return 'text-[#DC2626]';
        default: return 'text-[#6B7280]';
    }
}

function filterAgents(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('bg-white', 'text-[#4F46E5]', 'shadow-sm');
            btn.classList.remove('text-[#6B7280]');
        } else {
            btn.classList.remove('bg-white', 'text-[#4F46E5]', 'shadow-sm');
            btn.classList.add('text-[#6B7280]');
        }
    });
    renderAgentsFull();
}

function searchAgents() {
    renderAgentsFull();
}

function openAgentModal(id) {
    const agent = allAgents.find(a => a.id === id);
    if (!agent) return;

    document.getElementById('modalAgentName').textContent = agent.name;
    document.getElementById('modalAgentStatus').textContent = agent.status;
    document.getElementById('modalAgentStatus').className = `text-xs font-bold uppercase tracking-wider ${getStatusColor(agent.status)}`;
    document.getElementById('modalAgentIcon').innerHTML = `<i class="fa-solid ${agent.icon}"></i>`;
    
    document.getElementById('agentModal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    initializeAgentChart();
}

function closeAgentModal() {
    document.getElementById('agentModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
    document.getElementById(`tabContent_${tab}`).classList.remove('hidden');
    
    document.querySelectorAll('.modal-tab').forEach(t => {
        if (t.dataset.tab === tab) {
            t.classList.add('text-[#4F46E5]', 'border-b-2', 'border-[#4F46E5]');
            t.classList.remove('text-[#6B7280]');
        } else {
            t.classList.remove('text-[#4F46E5]', 'border-b-2', 'border-[#4F46E5]');
            t.classList.add('text-[#6B7280]');
        }
    });
}

function initializeAgentChart() {
    const ctx = document.getElementById('agentChart').getContext('2d');
    if (agentPerformanceChart) agentPerformanceChart.destroy();
    
    agentPerformanceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: 'Efficiency',
                data: [82, 88, 85, 92, 94, 91, 98],
                borderColor: '#4F46E5',
                tension: 0.4,
                pointRadius: 0,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { display: false },
                x: { display: false }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderAgentsFull();
});
