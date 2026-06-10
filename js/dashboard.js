// js/dashboard.js

const agentsData = [
    { name: "CMO Orchestrator", icon: "fa-brain", status: "Online", performance: "98%", tasks: 142 },
    { name: "Brand Manager", icon: "fa-palette", status: "Online", performance: "94%", tasks: 89 },
    { name: "SEO Strategist", icon: "fa-magnifying-glass-chart", status: "Online", performance: "91%", tasks: 210 },
    { name: "Social Specialist", icon: "fa-hashtag", status: "Online", performance: "88%", tasks: 324 },
    { name: "Email Marketer", icon: "fa-envelope-open-text", status: "Online", performance: "95%", tasks: 156 },
    { name: "Paid Media Buyer", icon: "fa-money-bill-trend-up", status: "Online", performance: "97%", tasks: 45 },
    { name: "Content Writer", icon: "fa-pen-nib", status: "Online", performance: "92%", tasks: 112 },
    { name: "Market Researcher", icon: "fa-chart-pie", status: "Online", performance: "89%", tasks: 67 },
    { name: "Customer Support", icon: "fa-headset", status: "Online", performance: "99%", tasks: 432 },
    { name: "Operations Mgr", icon: "fa-gears", status: "Online", performance: "96%", tasks: 28 },
    { name: "PR Specialist", icon: "fa-newspaper", status: "Online", performance: "90%", tasks: 54 }
];

const activityData = [
    { time: "2 mins ago", agent: "CMO Orchestrator", action: "Approved Q4 Strategy", status: "Success" },
    { time: "5 mins ago", agent: "SEO Strategist", action: "Updated meta tags", status: "Success" },
    { time: "12 mins ago", agent: "Paid Media Buyer", action: "Increased bid on 'AI CRM'", status: "Success" },
    { time: "18 mins ago", agent: "Customer Support", action: "Resolved 4 tickets", status: "Success" },
    { time: "25 mins ago", agent: "Social Specialist", action: "Scheduled 12 posts", status: "Success" },
    { time: "42 mins ago", agent: "Brand Manager", action: "Generated logo variant", status: "Success" },
    { time: "1 hour ago", agent: "Email Marketer", action: "Sent newsletter", status: "Success" },
    { time: "1.5 hours ago", agent: "Content Writer", action: "Drafted blog post", status: "Success" },
    { time: "2 hours ago", agent: "Operations Mgr", action: "System backup complete", status: "Success" },
    { time: "3 hours ago", agent: "PR AI", action: "News wire sync", status: "Success" }
];

function launchOrchestrator() {
    alert("Master Orchestrator Launched!");
}

function refreshAll() {
    location.reload();
}

function exportReport() {
    alert("Exporting production report...");
}

function openCreateCampaign() {
    alert("Campaign builder opened.");
}

function initializeCharts() {
    const ctx = document.getElementById('metricsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
            datasets: [
                {
                    label: 'Traffic',
                    data: [12000, 19000, 32000, 45000, 38000, 52000, 64000],
                    borderColor: '#4F46E5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Conversions',
                    data: [450, 680, 1100, 1800, 1400, 2100, 2600],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Revenue',
                    data: [2100, 3400, 5600, 8900, 7200, 11000, 13500],
                    borderColor: '#8B5CF6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { grid: { color: '#E5E7EB' }, ticks: { font: { family: 'Inter' } } },
                x: { grid: { display: false }, ticks: { font: { family: 'Inter' } } }
            }
        }
    });
}

function updateLastUpdatedTime() {
    const el = document.getElementById('lastUpdated');
    if (el) {
        const now = new Date();
        el.textContent = now.toLocaleTimeString();
    }
}

function renderAgents() {
    const grid = document.getElementById('agentGrid');
    if (!grid) return;

    grid.innerHTML = agentsData.map(agent => `
        <div class="p-4 border border-[#E5E7EB] rounded-lg bg-[#FFFFFF] hover:border-[#4F46E5] transition-all">
            <div class="flex items-center justify-between mb-4">
                <div class="w-10 h-10 bg-[#F3F4F6] text-[#4F46E5] rounded-md flex items-center justify-center">
                    <i class="fa-solid ${agent.icon}"></i>
                </div>
                <span class="text-[10px] font-bold text-[#059669] px-2 py-1 bg-[#F3F4F6] rounded uppercase">${agent.status}</span>
            </div>
            <h3 class="font-bold text-[#1F2937] text-sm truncate">${agent.name}</h3>
            <div class="mt-3 flex justify-between items-center text-xs">
                <span class="text-[#6B7280]">Perf: <span class="font-bold text-[#1F2937]">${agent.performance}</span></span>
                <span class="text-[#6B7280]">Tasks: <span class="font-bold text-[#1F2937]">${agent.tasks}</span></span>
            </div>
            <div class="mt-4 pt-4 border-t border-[#E5E7EB] flex space-x-2">
                <button class="flex-1 py-2 text-[#DC2626] bg-[#DC2626]/10 rounded-md text-[10px] font-bold uppercase hover:bg-[#DC2626] hover:text-white transition-all"><i class="fa-solid fa-stop"></i></button>
                <button class="flex-1 py-2 text-[#D97706] bg-[#D97706]/10 rounded-md text-[10px] font-bold uppercase hover:bg-[#D97706] hover:text-white transition-all"><i class="fa-solid fa-pause"></i></button>
                <button class="flex-1 py-2 text-[#4F46E5] bg-[#4F46E5]/10 rounded-md text-[10px] font-bold uppercase hover:bg-[#4F46E5] hover:text-white transition-all"><i class="fa-solid fa-gear"></i></button>
            </div>
        </div>
    `).join('');
}

function renderActivity() {
    const table = document.getElementById('activityTable');
    if (!table) return;

    table.innerHTML = activityData.map(act => `
        <tr class="hover:bg-[#F3F4F6] transition-colors">
            <td class="px-6 py-4 text-sm text-[#6B7280] whitespace-nowrap">${act.time}</td>
            <td class="px-6 py-4 text-sm font-bold text-[#1F2937] whitespace-nowrap">${act.agent}</td>
            <td class="px-6 py-4 text-sm text-[#6B7280] whitespace-nowrap">${act.action}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-[10px] font-bold text-[#059669] px-2 py-1 bg-[#059669]/10 rounded uppercase">${act.status}</span>
            </td>
        </tr>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
    renderAgents();
    renderActivity();
    updateLastUpdatedTime();
    setInterval(updateLastUpdatedTime, 10000);
});
