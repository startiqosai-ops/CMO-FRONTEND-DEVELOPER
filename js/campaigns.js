// ─────────────────────────────────────────────────────────────────────────────
// CAMPAIGNS PAGE JAVASCRIPT
// ─────────────────────────────────────────────────────────────────────────────

// Campaigns Data
const CAMPAIGNS = [
  { id: '1',  name: 'Q2 Brand Awareness Push',         channel: 'Social Media', channelColor: 'text-pink-600',    status: 'active',    budget: 15000, spent:  9800, roas: 3.2, conversions:  412, startDate: '2026-04-01', endDate: '2026-06-30', audience: 'Age 25-45',            goals: 'Brand reach' },
  { id: '2',  name: 'Summer SEO Content Blitz',         channel: 'SEO',          channelColor: 'text-blue-600',    status: 'active',    budget:  8000, spent:  4200, roas: 10.5, conversions: 312, startDate: '2026-05-01', endDate: '2026-07-31', audience: 'Organic searchers',    goals: 'Traffic growth' },
  { id: '3',  name: 'Re-engagement Email Sequence',     channel: 'Email',        channelColor: 'text-emerald-600', status: 'active',    budget:  5000, spent:  2100, roas: 18.2, conversions: 287, startDate: '2026-05-15', endDate: '2026-06-15', audience: 'Lapsed users',          goals: 'Re-activation' },
  { id: '4',  name: 'Google Ads Performance Max',       channel: 'Paid Media',   channelColor: 'text-amber-600',   status: 'active',    budget: 50000, spent: 31400, roas:  4.8, conversions: 890, startDate: '2026-04-01', endDate: '2026-06-30', audience: 'High-intent buyers',   goals: 'Revenue' },
  { id: '5',  name: 'PR Media Blitz June',              channel: 'PR',           channelColor: 'text-purple-600',  status: 'paused',    budget: 10000, spent:  3200, roas:  6.1, conversions: 134, startDate: '2026-06-01', endDate: '2026-06-30', audience: 'Press & media',         goals: 'Mentions' },
  { id: '6',  name: 'Webinar Lead Gen Series',          channel: 'Events',       channelColor: 'text-red-600',     status: 'active',    budget: 12000, spent:  7800, roas:  5.3, conversions: 520, startDate: '2026-05-01', endDate: '2026-07-31', audience: 'B2B decision makers',  goals: 'Lead generation' },
  { id: '7',  name: 'Product Launch — v3.0',            channel: 'Paid Media',   channelColor: 'text-amber-600',   status: 'completed', budget: 25000, spent: 25000, roas:  6.7, conversions: 1200, startDate: '2026-03-01', endDate: '2026-04-30', audience: 'Existing customers',  goals: 'Upsell' },
  { id: '8',  name: 'LinkedIn Thought Leadership',      channel: 'Social Media', channelColor: 'text-pink-600',    status: 'active',    budget:  6000, spent:  2900, roas:  2.8, conversions:  98, startDate: '2026-05-01', endDate: '2026-07-31', audience: 'B2B executives',       goals: 'Authority building' },
  { id: '9',  name: 'Cold Email Outreach Q2',           channel: 'Email',        channelColor: 'text-emerald-600', status: 'paused',    budget:  3000, spent:  1800, roas:  9.4, conversions:  67, startDate: '2026-04-15', endDate: '2026-06-15', audience: 'Prospects',            goals: 'Pipeline' },
  { id: '10', name: 'Annual Conference Sponsorship',    channel: 'Events',       channelColor: 'text-red-600',     status: 'completed', budget: 20000, spent: 20000, roas:  4.2, conversions: 340, startDate: '2026-02-01', endDate: '2026-03-31', audience: 'Industry attendees',   goals: 'Brand exposure' },
  { id: '11', name: 'Remarketing Campaign',             channel: 'Paid Media',   channelColor: 'text-amber-600',   status: 'active',    budget:  8000, spent:  5100, roas:  7.2, conversions: 410, startDate: '2026-05-01', endDate: '2026-06-30', audience: 'Website visitors',     goals: 'Conversions' },
  { id: '12', name: 'Newsletter Growth Drive',          channel: 'Email',        channelColor: 'text-emerald-600', status: 'active',    budget:  2000, spent:   900, roas: 12.1, conversions: 156, startDate: '2026-06-01', endDate: '2026-08-31', audience: 'Blog readers',         goals: 'Subscriber growth' },
];

const ITEMS_PER_PAGE = 8;

// Campaigns State
let campaigns = [...CAMPAIGNS];
let filteredCampaigns = [...campaigns];
let campaignPage = 1;

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
// CAMPAIGNS FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

function renderCampaignStats() {
  const stats = {
    active: campaigns.filter(c => c.status === 'active').length,
    paused: campaigns.filter(c => c.status === 'paused').length,
    completed: campaigns.filter(c => c.status === 'completed').length,
    totalBudget: campaigns.reduce((s, c) => s + c.budget, 0),
  };

  const statsEl = document.getElementById('campaignStats');
  if (!statsEl) return;

  statsEl.innerHTML = `
    <div class="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow duration-200">
      <div class="flex items-center gap-2 mb-2">
        <div class="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
          <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <span class="text-xs font-medium text-gray-500">Active Campaigns</span>
      </div>
      <p class="text-xl font-bold text-gray-800">${stats.active}</p>
    </div>
    <div class="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow duration-200">
      <div class="flex items-center gap-2 mb-2">
        <div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
          <svg class="w-3.5 h-3.5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <span class="text-xs font-medium text-gray-500">Paused Campaigns</span>
      </div>
      <p class="text-xl font-bold text-gray-800">${stats.paused}</p>
    </div>
    <div class="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow duration-200">
      <div class="flex items-center gap-2 mb-2">
        <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
          <svg class="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <span class="text-xs font-medium text-gray-500">Completed</span>
      </div>
      <p class="text-xl font-bold text-gray-800">${stats.completed}</p>
    </div>
    <div class="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow duration-200">
      <div class="flex items-center gap-2 mb-2">
        <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
          <svg class="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <span class="text-xs font-medium text-gray-500">Total Budget</span>
      </div>
      <p class="text-xl font-bold text-gray-800">${formatCurrency(stats.totalBudget)}</p>
    </div>
  `;
}

function filterCampaigns() {
  const searchEl = document.getElementById('campaignSearch');
  const statusEl = document.getElementById('campaignStatusFilter');
  const channelEl = document.getElementById('campaignChannelFilter');

  if (!searchEl || !statusEl || !channelEl) return;

  const search = searchEl.value.toLowerCase();
  const status = statusEl.value;
  const channel = channelEl.value;

  filteredCampaigns = campaigns.filter(c => {
    const matchStatus = status === 'All Status' || c.status === status.toLowerCase();
    const matchChannel = channel === 'All Channels' || c.channel === channel;
    const matchSearch = c.name.toLowerCase().includes(search);
    return matchStatus && matchChannel && matchSearch;
  });

  campaignPage = 1;
  renderCampaignTable();
}

function renderCampaignTable() {
  const tbody = document.getElementById('campaignTableBody');
  const pagination = document.getElementById('campaignPagination');
  if (!tbody) return;

  const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);
  const start = (campaignPage - 1) * ITEMS_PER_PAGE;
  const paginated = filteredCampaigns.slice(start, start + ITEMS_PER_PAGE);

  if (paginated.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="py-12 text-center text-gray-500">
          <svg class="mx-auto mb-2 text-gray-300 w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 10-5.596-1.934l-.52 2.67a1.76 1.76 0 01-3.417-.591l-.267-1.38A3 3 0 0010 10a3 3 0 00-2.34 1.126l-.52 2.67a1.76 1.76 0 01-3.417-.59L3 10"></path></svg>
          <p class="font-medium">No campaigns found</p>
          <p class="text-xs mt-1">Try adjusting your filters or create a new campaign</p>
        </td>
      </tr>
    `;
    if (pagination) pagination.innerHTML = '';
    return;
  }

  const STATUS_CONFIG = {
    active:    { label: 'Active',    bg: 'bg-emerald-100',  text: 'text-emerald-700',  dot: 'bg-emerald-500' },
    paused:    { label: 'Paused',    bg: 'bg-amber-100',   text: 'text-amber-700',   dot: 'bg-amber-500' },
    completed: { label: 'Completed', bg: 'bg-gray-100',    text: 'text-gray-700',    dot: 'bg-gray-400' },
  };

  tbody.innerHTML = paginated.map(c => {
    const config = STATUS_CONFIG[c.status];
    const progress = c.budget > 0 ? Math.min((c.spent / c.budget) * 100, 100) : 0;
    return `
      <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
        <td class="py-3 px-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-indigo-100 rounded-md flex items-center justify-center shrink-0">
              <svg class="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            </div>
            <div>
              <p class="font-medium text-gray-800">${c.name}</p>
              <p class="text-xs text-gray-400">${c.startDate} - ${c.endDate}</p>
            </div>
          </div>
        </td>
        <td class="py-3 px-4"><span class="font-medium ${c.channelColor}">${c.channel}</span></td>
        <td class="py-3 px-4">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}">
            <span class="w-1.5 h-1.5 rounded-full ${config.dot}"></span>
            ${config.label}
          </span>
        </td>
        <td class="py-3 px-4 text-right">
          <p class="font-medium text-gray-800">${formatCurrency(c.budget)}</p>
          <div class="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1 ml-auto">
            <div class="h-full bg-indigo-500 rounded-full" style="width:${progress}%"></div>
          </div>
        </td>
        <td class="py-3 px-4 text-right text-gray-600">${formatCurrency(c.spent)}</td>
        <td class="py-3 px-4 text-right">
          <span class="font-bold ${c.roas >= 5 ? 'text-emerald-600' : c.roas >= 3 ? 'text-amber-600' : 'text-gray-800'}">${c.roas}x</span>
        </td>
        <td class="py-3 px-4">
          <div class="flex items-center justify-center gap-1">
            ${c.status === 'active' || c.status === 'paused' ? `
              <button onclick="toggleCampaignStatus('${c.id}')" class="p-1.5 rounded-md hover:bg-gray-100 transition-colors ${c.status === 'active' ? 'text-amber-600' : 'text-emerald-600'}" title="${c.status === 'active' ? 'Pause' : 'Resume'}">
                ${c.status === 'active' ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>' : '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'}
              </button>
            ` : ''}
            <button onclick="deleteCampaign('${c.id}')" class="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  if (pagination && totalPages > 1) {
    pagination.innerHTML = `
      <p class="text-sm text-gray-500">Showing ${start + 1} to ${Math.min(start + ITEMS_PER_PAGE, filteredCampaigns.length)} of ${filteredCampaigns.length} campaigns</p>
      <div class="flex items-center gap-1">
        <button onclick="setCampaignPage(${campaignPage - 1})" ${campaignPage === 1 ? 'disabled' : ''} class="p-2 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
          <button onclick="setCampaignPage(${p})" class="w-8 h-8 rounded-md text-sm font-medium transition-colors ${p === campaignPage ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 text-gray-600'}">${p}</button>
        `).join('')}
        <button onclick="setCampaignPage(${campaignPage + 1})" ${campaignPage === totalPages ? 'disabled' : ''} class="p-2 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
    `;
  } else if (pagination) {
    pagination.innerHTML = '';
  }
}

function setCampaignPage(page) {
  const totalPages = Math.ceil(filteredCampaigns.length / ITEMS_PER_PAGE);
  campaignPage = Math.max(1, Math.min(page, totalPages));
  renderCampaignTable();
}

function toggleCampaignStatus(id) {
  const campaign = campaigns.find(c => c.id === id);
  if (campaign && (campaign.status === 'active' || campaign.status === 'paused')) {
    campaign.status = campaign.status === 'active' ? 'paused' : 'active';
    renderCampaignStats();
    filterCampaigns();
  }
}

function deleteCampaign(id) {
  if (!confirm('Are you sure you want to delete this campaign?')) return;
  campaigns = campaigns.filter(c => c.id !== id);
  renderCampaignStats();
  filterCampaigns();
}

function openCampaignModal() {
  const modal = document.getElementById('campaignModal');
  if (modal) modal.classList.remove('hidden');
  clearFormErrors();
}

function closeCampaignModal() {
  const modal = document.getElementById('campaignModal');
  const form = document.getElementById('campaignForm');
  if (modal) modal.classList.add('hidden');
  if (form) form.reset();
  clearFormErrors();
}

function clearFormErrors() {
  ['Name', 'Channel', 'Budget', 'StartDate', 'EndDate'].forEach(field => {
    const errorEl = document.getElementById('campaign' + field + 'Error');
    if (errorEl) errorEl.classList.add('hidden');
  });
}

function showFieldError(field, message) {
  const errorEl = document.getElementById('campaign' + field + 'Error');
  if (errorEl) {
    errorEl.querySelector('span').textContent = message;
    errorEl.classList.remove('hidden');
    const input = document.getElementById('campaign' + field);
    if (input) input.classList.add('border-red-400');
  }
}

function validateCampaignForm() {
  clearFormErrors();
  const errors = [];

  const nameEl = document.getElementById('campaignName');
  const name = nameEl ? nameEl.value.trim() : '';
  if (!name) { showFieldError('Name', 'Campaign name is required'); errors.push('name'); }
  else if (name.length > 100) { showFieldError('Name', 'Campaign name must be 100 characters or less'); errors.push('name'); }

  const channelEl = document.getElementById('campaignChannel');
  const channel = channelEl ? channelEl.value : '';
  if (!channel) { showFieldError('Channel', 'Channel is required'); errors.push('channel'); }

  const budgetEl = document.getElementById('campaignBudget');
  const budget = budgetEl ? budgetEl.value : '';
  if (!budget) { showFieldError('Budget', 'Budget is required'); errors.push('budget'); }
  else {
    const budgetNum = parseFloat(budget);
    if (isNaN(budgetNum)) { showFieldError('Budget', 'Budget must be a valid number'); errors.push('budget'); }
    else if (budgetNum < 100) { showFieldError('Budget', 'Budget must be at least $100'); errors.push('budget'); }
    else if (budgetNum > 100000) { showFieldError('Budget', 'Budget cannot exceed $100,000'); errors.push('budget'); }
  }

  const startDateEl = document.getElementById('campaignStartDate');
  const startDate = startDateEl ? startDateEl.value : '';
  if (!startDate) { showFieldError('StartDate', 'Start date is required'); errors.push('startDate'); }

  const endDateEl = document.getElementById('campaignEndDate');
  const endDate = endDateEl ? endDateEl.value : '';
  if (!endDate) { showFieldError('EndDate', 'End date is required'); errors.push('endDate'); }
  else if (startDate && endDate < startDate) { showFieldError('EndDate', 'End date must be after start date'); errors.push('endDate'); }

  return errors.length === 0;
}

function submitCampaign(e) {
  e.preventDefault();
  if (!validateCampaignForm()) return;

  const channelColorMap = {
    'Social Media': 'text-pink-600',
    'SEO': 'text-blue-600',
    'Email': 'text-emerald-600',
    'Paid Media': 'text-amber-600',
    'PR': 'text-purple-600',
    'Events': 'text-red-600',
  };

  const channelEl = document.getElementById('campaignChannel');
  const channel = channelEl ? channelEl.value : '';

  const newCampaign = {
    id: Date.now().toString(),
    name: document.getElementById('campaignName').value.trim(),
    channel: channel,
    channelColor: channelColorMap[channel] || 'text-gray-600',
    status: 'active',
    budget: parseFloat(document.getElementById('campaignBudget').value),
    spent: 0,
    roas: 0,
    conversions: 0,
    startDate: document.getElementById('campaignStartDate').value,
    endDate: document.getElementById('campaignEndDate').value,
    audience: document.getElementById('campaignAudience').value || 'Not specified',
    goals: document.getElementById('campaignGoals').value || 'Not specified',
  };

  campaigns.unshift(newCampaign);
  closeCampaignModal();
  renderCampaignStats();
  filterCampaigns();
}

function initCampaigns() {
  renderCampaignStats();
  filterCampaigns();
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  loadComponents();
  setTimeout(initCampaigns, 100);
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
      const navCampaigns = document.getElementById('nav-campaigns');
      if (navCampaigns) {
        navCampaigns.classList.add('bg-white/10', 'text-white', 'shadow-sm');
        navCampaigns.classList.remove('text-white/70');
      }
    }, 50);
  } catch (err) { console.error(err); }
}
