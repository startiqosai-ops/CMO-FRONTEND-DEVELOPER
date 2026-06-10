/**
 * Dashboard Logic for Marketing OS
 */

const agentsData = [
    { id: 1, name: "SEO Strategist", icon: "fa-search", status: "Online", metrics: "94% Efficiency", color: "#4F46E5" },
    { id: 2, name: "Ad Optimizer", icon: "fa-rectangle-ad", status: "Online", metrics: "4.8x ROAS", color: "#10B981" },
    { id: 3, name: "Content AI", icon: "fa-pen-nib", status: "Online", metrics: "12 Posts/hr", color: "#8B5CF6" },
    { id: 4, name: "Email Bot", icon: "fa-envelope", status: "Online", metrics: "28% Open Rate", color: "#3B82F6" },
    { id: 5, name: "Social Manager", icon: "fa-share-nodes", status: "Online", metrics: "82% Engagement", color: "#F59E0B" },
    { id: 6, name: "Market Analyst", icon: "fa-chart-pie", status: "Online", metrics: "15 Reports/day", color: "#4F46E5" },
    { id: 7, name: "Lead Finder", icon: "fa-user-plus", status: "Online", metrics: "45 Leads/hr", color: "#10B981" },
    { id: 8, name: "Budget Monitor", icon: "fa-scale-balanced", status: "Online", metrics: "0.2% Variance", color: "#DC2626" },
    { id: 9, name: "Creative Gen", icon: "fa-palette", status: "Online", metrics: "30 Assets/hr", color: "#8B5CF6" },
    { id: 10, name: "Competitor AI", icon: "fa-eye", status: "Online", metrics: "Real-time", color: "#3B82F6" },
    { id: 11, name: "Brand Guardian", icon: "fa-shield-halved", status: "Online", metrics: "100% Compliant", color: "#059669" }
];

const activityData = [
    { time: "09:45 AM", agent: "SEO Strategist", action: "Updated meta tags for 45 pages", status: "Completed" },
    { time: "09:42 AM", agent: "Ad Optimizer", action: "Scaled Budget: Campaign #402", status: "Processing" },
    { time: "09:38 AM", agent: "Content AI", action: "Generated Q4 Blog Series", status: "Completed" },
    { time: "09:30 AM", agent: "Email Bot", action: "A/B Test Started: Newsletter #12", status: "Running" },
    { time: "09:25 AM", agent: "Lead Finder", action: "Extracted 150 target profiles", status: "Completed" },
    { time: "09:15 AM", agent: "Creative Gen", action: "Rendered 15 Video Ads", status: "Completed" },
    { time: "09:05 AM", agent: "Social Manager", action: "Scheduled weekly Twitter thread", status: "Completed" },
    { time: "08:55 AM", agent: "Budget Monitor", action: "Alert: CPC Threshold Reached", status: "Warning" },
    { time: "08:45 AM", agent: "Competitor AI", action: "New pricing detected: Competitor X", status: "Logged" },
    { time: "08:30 AM", agent: "Market Analyst", action: "Exported Monthly ROAS Report", status: "Completed" }
];

function initializeCharts() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00'],
            datasets: [
                {
                    label: 'Revenue',
                    data: [12000, 15000, 14000, 18000, 22000, 25000, 24000, 28000],
                    borderColor: '#4F46E5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Traffic',
                    data: [5000, 7000, 6500, 9000, 12000, 11000, 10500, 13000],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            },
            scales: {
                y: { beginAtZero: true, grid: { borderDash: [2, 4] } },
                x: { grid: { display: false } }
            }
        }
    });
}

function renderAgents() {
    const grid = document.getElementById('agent-status-grid');
    if (!grid) return;
    grid.innerHTML = agentsData.map(agent => `
        <div class="bg-white border border-[#E5E7EB] rounded-lg p-4 hover:border-[#4F46E5] transition-all group">
            <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 rounded-full flex items-center justify-center bg-gray-50 text-gray-600 group-hover:bg-[#EEF2FF] group-hover:text-[#4F46E5] transition-colors">
                    <i class="fa-solid ${agent.icon}"></i>
                </div>
                <span class="px-2 py-1 text-[10px] font-bold uppercase rounded bg-[#ECFDF5] text-[#059669]">
                    ${agent.status}
                </span>
            </div>
            <h4 class="font-bold text-sm truncate">${agent.name}</h4>
            <p class="text-xs text-[#6B7280] mb-4">${agent.metrics}</p>
            <div class="flex items-center space-x-2 pt-2 border-t border-gray-50">
                <button class="p-1.5 text-gray-400 hover:text-[#DC2626] transition-colors" title="Stop"><i class="fa-solid fa-stop text-xs"></i></button>
                <button class="p-1.5 text-gray-400 hover:text-[#D97706] transition-colors" title="Pause"><i class="fa-solid fa-pause text-xs"></i></button>
                <button class="p-1.5 text-gray-400 hover:text-[#4F46E5] transition-colors" title="Config"><i class="fa-solid fa-gear text-xs"></i></button>
            </div>
        </div>
    `).join('');
}

function renderActivity() {
    const tbody = document.getElementById('activity-table-body');
    if (!tbody) return;
    tbody.innerHTML = activityData.map(row => `
        <tr class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 font-medium text-gray-500">${row.time}</td>
            <td class="px-6 py-4 font-bold">${row.agent}</td>
            <td class="px-6 py-4 text-gray-600">${row.action}</td>
            <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EEF2FF] text-[#4F46E5]">
                    ${row.status}
                </span>
            </td>
        </tr>
    `).join('');
}

function updateLastUpdatedTime() {
    const el = document.getElementById('last-updated');
    if (el) {
        const now = new Date();
        el.textContent = `Last update: ${now.toLocaleTimeString()}`;
    }
}

function launchOrchestrator() {
    alert("System Orchestrator launched. Optimizing across 11 nodes...");
}

function refreshAll() {
    location.reload();
}

function exportReport() {
    alert("Exporting System ROAS Report (PDF)...");
}

function openCreateCampaign() {
    alert("Opening Campaign Architect...");
}

document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    renderAgents();
    renderActivity();
    updateLastUpdatedTime();
    setInterval(updateLastUpdatedTime, 60000);
});