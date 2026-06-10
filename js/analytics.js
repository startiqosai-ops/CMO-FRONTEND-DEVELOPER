// ─────────────────────────────────────────────────────────────────────────────
// ANALYTICS PAGE JAVASCRIPT
// ─────────────────────────────────────────────────────────────────────────────

// Analytics Data
const CHANNEL_PERF = [
  { channel: 'SEO',        dot: 'bg-blue-500',    spend:  5000, revenue:  50000, roas: 10,   conversions:  500, trend: '+12%', up: true },
  { channel: 'Social',     dot: 'bg-pink-500',    spend:  3000, revenue:  30000, roas: 10,   conversions:  300, trend: '+8%',  up: true },
  { channel: 'Email',      dot: 'bg-emerald-500', spend:  2000, revenue:  40000, roas: 20,   conversions:  400, trend: '+15%', up: true },
  { channel: 'Paid Media', dot: 'bg-amber-500',   spend: 25000, revenue: 100000, roas: 4,    conversions: 1000, trend: '+5%',  up: true },
  { channel: 'PR',         dot: 'bg-purple-500',  spend:  1000, revenue:  20000, roas: 20,   conversions:  200, trend: '+3%',  up: true },
  { channel: 'Events',     dot: 'bg-red-500',     spend:  4000, revenue:  25000, roas: 6.3,  conversions:  250, trend: '+20%', up: true },
];

const REVENUE_DATA = {
  daily:   [50, 30, 40, 100, 20, 25],
  weekly:  [220, 180, 260, 450, 90, 130],
  monthly: [860, 720, 1040, 1800, 380, 520],
};

const BAR_COLORS = ['#3B82F6', '#EC4899', '#10B981', '#F59E0B', '#A855F7', '#EF4444'];

// Analytics State
let revenueChart = null;
let trafficChart = null;
let currentRevenueRange = 'daily';

// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

function formatCurrency(n) {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000)     return '$' + (n / 1_000).toFixed(1) + 'K';
  return '$' + n.toLocaleString();
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────

function navigateTo(page) {
  window.location.href = page + '.html';
}

function openMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobileOverlay');
  if (sidebar) sidebar.classList.remove('-translate-x-full');
  if (overlay) overlay.classList.remove('hidden');
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobileOverlay');
  if (window.innerWidth < 1024) {
    if (sidebar) sidebar.classList.add('-translate-x-full');
  }
  if (overlay) overlay.classList.add('hidden');
}

function launchOrchestrator() {
  alert('Orchestrator launch triggered! This would start all AI agents.');
}

// ─────────────────────────────────────────────────────────────────────────────
// ANALYTICS FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

function initRevenueChart() {
  const canvas = document.getElementById('revenueChart');
  if (!canvas) return;
  if (revenueChart) revenueChart.destroy();

  const ctx = canvas.getContext('2d');
  revenueChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['SEO', 'Social', 'Email', 'Paid Media', 'PR', 'Events'],
      datasets: [{
        label: 'Revenue ($K) — Daily',
        data: REVENUE_DATA[currentRevenueRange],
        backgroundColor: BAR_COLORS,
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` $${ctx.parsed.y}K` } },
      },
      scales: {
        y: { beginAtZero: true, grid: { color: '#F3F4F6' }, ticks: { font: { family: 'Inter', size: 12 } } },
        x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 12 } } },
      },
    },
  });
}

function setRevenueRange(range) {
  currentRevenueRange = range;
  document.querySelectorAll('.revenue-range-btn').forEach(btn => {
    if (btn.dataset.range === range) {
      btn.className = 'revenue-range-btn text-xs px-3 py-1 rounded-md transition-colors duration-200 bg-indigo-600 text-white';
    } else {
      btn.className = 'revenue-range-btn text-xs px-3 py-1 rounded-md transition-colors duration-200 border border-gray-200 text-gray-600 hover:bg-gray-50';
    }
  });
  if (revenueChart) {
    const labels = { daily: 'Revenue ($K) — Daily', weekly: 'Revenue ($K) — Weekly', monthly: 'Revenue ($K) — Monthly' };
    revenueChart.data.datasets[0].label = labels[range];
    revenueChart.data.datasets[0].data = REVENUE_DATA[range];
    revenueChart.update();
  }
}

function initTrafficChart() {
  const canvas = document.getElementById('trafficChart');
  if (!canvas) return;
  if (trafficChart) trafficChart.destroy();

  const ctx = canvas.getContext('2d');
  trafficChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Organic Search', 'Social Media', 'Paid Ads', 'Direct'],
      datasets: [{
        data: [45, 30, 20, 5],
        backgroundColor: ['#3B82F6', '#EC4899', '#F59E0B', '#10B981'],
        borderWidth: 3,
        borderColor: '#fff',
        hoverBorderColor: '#fff',
      }],
    },
    options: {
      responsive: true,
      cutout: '62%',
      plugins: {
        legend: { position: 'bottom', labels: { padding: 18, font: { size: 12, family: 'Inter' }, usePointStyle: true } },
      },
    },
  });
}

function renderChannelPerfTable() {
  const tbody = document.getElementById('channelPerfBody');
  const tfoot = document.getElementById('channelPerfFoot');
  if (!tbody) return;

  tbody.innerHTML = CHANNEL_PERF.map(row => `
    <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
      <td class="py-3 pl-6 pr-4 font-medium text-gray-800 flex items-center gap-2">
        <span class="inline-block w-2.5 h-2.5 rounded-full ${row.dot} shrink-0"></span>
        ${row.channel}
      </td>
      <td class="py-3 px-4 text-right text-gray-600">${formatCurrency(row.spend)}</td>
      <td class="py-3 px-4 text-right font-semibold text-gray-800">${formatCurrency(row.revenue)}</td>
      <td class="py-3 px-4 text-right font-bold text-green-600">${row.roas}x</td>
      <td class="py-3 px-4 text-right text-gray-600">${row.conversions.toLocaleString()}</td>
      <td class="py-3 px-4 text-right">
        <span class="inline-flex items-center gap-1 font-medium text-xs ${row.up ? 'text-green-600' : 'text-red-500'}">
          <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${row.up ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'}"></path></svg>
          ${row.trend}
        </span>
      </td>
    </tr>
  `).join('');

  const totalSpend = CHANNEL_PERF.reduce((s, r) => s + r.spend, 0);
  const totalRevenue = CHANNEL_PERF.reduce((s, r) => s + r.revenue, 0);
  const totalConversions = CHANNEL_PERF.reduce((s, r) => s + r.conversions, 0);
  const avgROAS = (totalRevenue / totalSpend).toFixed(1);

  if (tfoot) {
    tfoot.innerHTML = `
      <tr class="bg-gray-50 border-t border-gray-200">
        <td class="py-3 pl-6 pr-4 text-xs font-semibold text-gray-600 uppercase">Totals</td>
        <td class="py-3 px-4 text-right text-xs font-semibold text-gray-800">${formatCurrency(totalSpend)}</td>
        <td class="py-3 px-4 text-right text-xs font-semibold text-gray-800">${formatCurrency(totalRevenue)}</td>
        <td class="py-3 px-4 text-right text-xs font-bold text-green-600">${avgROAS}x</td>
        <td class="py-3 px-4 text-right text-xs font-semibold text-gray-800">${totalConversions.toLocaleString()}</td>
        <td class="py-3 px-4 text-right text-xs font-medium text-green-600">
          <span class="inline-flex items-center gap-1"><svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>avg +10.5%</span>
        </td>
      </tr>
    `;
  }
}

function exportCSV() {
  const rows = [
    ['Channel', 'Spend', 'Revenue', 'ROAS', 'Conversions', 'Trend'],
    ...CHANNEL_PERF.map(r => [r.channel, formatCurrency(r.spend), formatCurrency(r.revenue), `${r.roas}x`, r.conversions, r.trend])
  ];
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'analytics-report.csv'; a.click();
  URL.revokeObjectURL(url);
}

function initAnalytics() {
  initTrafficChart();
  initRevenueChart();
  renderChannelPerfTable();
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  loadComponents();
  setTimeout(initAnalytics, 100);
});

// Load components
async function loadComponents() {
  try {
    const sidebarResp = await fetch('components/sidebar.html');
    const sidebarHtml = await sidebarResp.text();
    document.getElementById('sidebar-target').innerHTML = sidebarHtml;

    const headerResp = await fetch('components/header.html');
    const headerHtml = await headerResp.text();
    document.getElementById('header-target').innerHTML = headerHtml;

    setTimeout(() => {
      const navAnalytics = document.getElementById('nav-analytics');
      if (navAnalytics) {
        navAnalytics.classList.add('bg-white/10', 'text-white', 'shadow-sm');
        navAnalytics.classList.remove('text-white/70');
      }
    }, 50);
  } catch (err) { console.error(err); }
}
