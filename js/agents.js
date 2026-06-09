/* agents.js */
(function () {
  const AGENTS = [
    {
      id: 1, name: 'CMO Orchestrator AI', dept: 'Strategy', category: 'marketing',
      emoji: '🧠', color: '#FF2D8D',
      status: 'online', statusLabel: 'ONLINE',
      successRate: 97, tasks: 382, uptime: '99.9%',
      currentActivity: 'Reviewing Q3 marketing strategy & OKRs',
      model: 'Claude Sonnet 4',
      description: 'Master orchestrator that coordinates all marketing AI agents, sets strategy, and ensures cross-functional alignment.',
      logs: [
        { time: '14:32', text: '<strong>Strategy review</strong> completed for Q4 planning' },
        { time: '14:18', text: 'Delegated SEO brief to <strong>SEO AI</strong>' },
        { time: '13:55', text: 'Generated weekly performance report' },
        { time: '13:22', text: '<strong>Campaign approval</strong> — Brand AI Launch #4' },
      ],
      tasks: [
        { name: 'Q4 Strategy Document', status: 'running' },
        { name: 'Weekly Agent Sync', status: 'done' },
        { name: 'Budget Reallocation Analysis', status: 'pending' },
      ]
    },
    {
      id: 2, name: 'Brand AI', dept: 'Marketing', category: 'marketing',
      emoji: '🎨', color: '#a855f7',
      status: 'busy', statusLabel: 'BUSY',
      successRate: 91, tasks: 214, uptime: '99.5%',
      currentActivity: 'Generating brand identity assets for Product v2',
      model: 'Claude Sonnet 4',
      description: 'Manages brand voice, visual identity, and ensures all content is on-brand across every channel.',
      logs: [
        { time: '14:29', text: 'Created 8 new <strong>brand asset variations</strong>' },
        { time: '14:10', text: 'Updated brand guidelines document' },
        { time: '13:48', text: 'Reviewed competitor visual identity' },
      ],
      tasks: [
        { name: 'Product v2 Brand Kit', status: 'running' },
        { name: 'Brand Voice Document', status: 'done' },
        { name: 'Social Media Templates', status: 'pending' },
      ]
    },
    {
      id: 3, name: 'SEO AI', dept: 'Growth', category: 'growth',
      emoji: '🔍', color: '#06b6d4',
      status: 'online', statusLabel: 'ONLINE',
      successRate: 94, tasks: 1047, uptime: '100%',
      currentActivity: 'Analysing 2,400 keywords for Q4 content calendar',
      model: 'Claude Sonnet 4',
      description: 'Handles all organic search strategy — keyword research, content briefs, backlink analysis, and technical SEO audits.',
      logs: [
        { time: '14:31', text: '<strong>Keyword cluster analysis</strong> complete — 47 topics identified' },
        { time: '14:15', text: 'Technical SEO audit passed — 0 critical errors' },
        { time: '13:50', text: 'Generated 12 content briefs' },
      ],
      tasks: [
        { name: 'Q4 Keyword Research', status: 'running' },
        { name: 'Content Brief — AI Tools', status: 'done' },
        { name: 'Backlink Opportunity Report', status: 'pending' },
      ]
    },
    {
      id: 4, name: 'Social Media AI', dept: 'Marketing', category: 'marketing',
      emoji: '📱', color: '#FF5CAB',
      status: 'busy', statusLabel: 'BUSY',
      successRate: 88, tasks: 623, uptime: '99.2%',
      currentActivity: 'Scheduling 12 posts for LinkedIn, X, and Instagram',
      model: 'Claude Sonnet 4',
      description: 'Creates, schedules, and analyzes social content across LinkedIn, X, Instagram, and TikTok for maximum reach.',
      logs: [
        { time: '14:27', text: 'Scheduled <strong>12 posts</strong> across 3 platforms' },
        { time: '14:05', text: 'Engagement report: +34% week-on-week' },
        { time: '13:40', text: 'Generated 6 LinkedIn thought-leadership posts' },
      ],
      tasks: [
        { name: 'October Content Calendar', status: 'running' },
        { name: 'LinkedIn Campaign Posts', status: 'done' },
        { name: 'TikTok Script Series', status: 'pending' },
      ]
    },
    {
      id: 5, name: 'Email Marketing AI', dept: 'Growth', category: 'growth',
      emoji: '📧', color: '#f59e0b',
      status: 'online', statusLabel: 'ONLINE',
      successRate: 92, tasks: 441, uptime: '99.7%',
      currentActivity: 'Running A/B test on subject lines — 3 variants',
      model: 'Claude Sonnet 4',
      description: 'Manages full email lifecycle — sequences, campaigns, A/B tests, segmentation, and deliverability optimization.',
      logs: [
        { time: '14:26', text: 'A/B test launched — <strong>3 subject line variants</strong>' },
        { time: '14:02', text: 'Sent 4,200 campaign emails — 42% open rate' },
        { time: '13:35', text: 'Drip sequence optimized for onboarding' },
      ],
      tasks: [
        { name: 'Subject Line A/B Test', status: 'running' },
        { name: 'Monthly Newsletter', status: 'done' },
        { name: 'Re-engagement Sequence', status: 'pending' },
      ]
    },
    {
      id: 6, name: 'Paid Media AI', dept: 'Growth', category: 'growth',
      emoji: '💰', color: '#22c55e',
      status: 'online', statusLabel: 'ONLINE',
      successRate: 96, tasks: 318, uptime: '99.9%',
      currentActivity: 'Optimizing Google Ads bids — ROAS target: 4.2x',
      model: 'Claude Sonnet 4',
      description: 'Manages Google Ads, Meta Ads, and LinkedIn campaigns. Automatically adjusts bids, creatives, and audiences to maximize ROAS.',
      logs: [
        { time: '14:30', text: 'ROAS improved <strong>18%</strong> after bid adjustment' },
        { time: '14:12', text: 'Paused 3 underperforming ad sets' },
        { time: '13:45', text: 'Generated 8 new ad creative variations' },
      ],
      tasks: [
        { name: 'Google Ads Optimization', status: 'running' },
        { name: 'Meta Campaign Q3 Review', status: 'done' },
        { name: 'LinkedIn InMail Campaign', status: 'pending' },
      ]
    },
    {
      id: 7, name: 'Product Marketing AI', dept: 'Marketing', category: 'marketing',
      emoji: '📦', color: '#3b82f6',
      status: 'online', statusLabel: 'ONLINE',
      successRate: 89, tasks: 256, uptime: '98.8%',
      currentActivity: 'Updating ICP positioning for enterprise segment',
      model: 'Claude Sonnet 4',
      description: 'Handles go-to-market strategy, positioning, messaging frameworks, and product launch campaigns.',
      logs: [
        { time: '14:20', text: 'ICP positioning updated for <strong>enterprise</strong>' },
        { time: '14:00', text: 'Product launch checklist generated' },
        { time: '13:30', text: 'Competitive battlecard refreshed' },
      ],
      tasks: [
        { name: 'Enterprise ICP Positioning', status: 'running' },
        { name: 'Product v2 Launch Plan', status: 'done' },
        { name: 'Pricing Page Copy', status: 'pending' },
      ]
    },
    {
      id: 8, name: 'Market Research AI', dept: 'Research', category: 'research',
      emoji: '📊', color: '#8b5cf6',
      status: 'idle', statusLabel: 'IDLE',
      successRate: 85, tasks: 189, uptime: '97.4%',
      currentActivity: 'Standby — awaiting research brief',
      model: 'Claude Sonnet 4',
      description: 'Conducts competitive analysis, market sizing, consumer research, and trend forecasting using live data.',
      logs: [
        { time: '13:50', text: '<strong>Market report</strong> compiled — 24-page PDF' },
        { time: '12:30', text: 'Competitor pricing analysis done' },
        { time: '11:00', text: 'Survey analysis — 540 responses processed' },
      ],
      tasks: [
        { name: 'Industry Trend Report', status: 'done' },
        { name: 'Competitor Analysis Q4', status: 'pending' },
        { name: 'Customer Survey Analysis', status: 'done' },
      ]
    },
    {
      id: 9, name: 'Customer Success AI', dept: 'Operations', category: 'operations',
      emoji: '🤝', color: '#10b981',
      status: 'online', statusLabel: 'ONLINE',
      successRate: 93, tasks: 507, uptime: '99.6%',
      currentActivity: 'Resolving 3 support tickets — avg response 2.1 min',
      model: 'Claude Sonnet 4',
      description: 'Handles customer support, onboarding flows, NPS analysis, and churn risk detection.',
      logs: [
        { time: '14:28', text: '3 support tickets resolved — <strong>CSAT: 9.4/10</strong>' },
        { time: '14:10', text: 'Churn risk alert: 2 accounts flagged' },
        { time: '13:55', text: 'Onboarding sequence sent to 18 new users' },
      ],
      tasks: [
        { name: 'Open Ticket Resolution', status: 'running' },
        { name: 'Monthly NPS Analysis', status: 'done' },
        { name: 'At-risk Account Outreach', status: 'running' },
      ]
    },
    {
      id: 10, name: 'Marketing Ops AI', dept: 'Operations', category: 'operations',
      emoji: '⚙️', color: '#f97316',
      status: 'busy', statusLabel: 'BUSY',
      successRate: 90, tasks: 344, uptime: '99.1%',
      currentActivity: 'Syncing HubSpot CRM — 127 contact updates',
      model: 'Claude Sonnet 4',
      description: 'Manages marketing technology stack, data pipelines, attribution reporting, and automation workflows.',
      logs: [
        { time: '14:25', text: 'HubSpot sync — <strong>127 contacts</strong> updated' },
        { time: '14:08', text: 'Attribution model refreshed' },
        { time: '13:40', text: 'Zapier workflow — 23 automations verified' },
      ],
      tasks: [
        { name: 'CRM Sync & Cleanup', status: 'running' },
        { name: 'Attribution Model Update', status: 'done' },
        { name: 'Marketing Stack Audit', status: 'pending' },
      ]
    },
    {
      id: 11, name: 'PR AI', dept: 'Marketing', category: 'marketing',
      emoji: '📰', color: '#ec4899',
      status: 'online', statusLabel: 'ONLINE',
      successRate: 87, tasks: 122, uptime: '98.5%',
      currentActivity: 'Drafting TechCrunch press release — Series A announcement',
      model: 'Claude Sonnet 4',
      description: 'Handles press releases, media outreach, journalist relationships, and earned media strategy.',
      logs: [
        { time: '14:23', text: 'Press release draft complete — <strong>TechCrunch pitch</strong>' },
        { time: '13:55', text: 'Media list updated — 48 journalists added' },
        { time: '13:20', text: 'Coverage report: 3 mentions this week' },
      ],
      tasks: [
        { name: 'Series A Press Release', status: 'running' },
        { name: 'Media Outreach List', status: 'done' },
        { name: 'Thought Leadership Article', status: 'pending' },
      ]
    },
  ];

  let currentFilter = 'all';
  let currentCategory = 'all';
  let searchQuery = '';
  let currentView = 'grid';
  let selectedAgent = null;
  let currentTab = 'overview';

  // ---- RENDER AGENTS ----
  function filteredAgents() {
    return AGENTS.filter(a => {
      const matchStatus = currentFilter === 'all' || a.status === currentFilter;
      const matchCat = currentCategory === 'all' || a.category === currentCategory;
      const matchSearch = !searchQuery || a.name.toLowerCase().includes(searchQuery) || a.dept.toLowerCase().includes(searchQuery);
      return matchStatus && matchCat && matchSearch;
    });
  }

  function renderAgents() {
    const grid = document.getElementById('agents-full-grid');
    if (!grid) return;
    grid.innerHTML = '';
    grid.className = 'agents-full-grid' + (currentView === 'list' ? ' list-view' : '');

    const agents = filteredAgents();
    if (agents.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-muted);">
        <div style="font-size:32px;margin-bottom:12px;">🔍</div>
        <div style="font-size:14px;">No agents match your filters.</div>
      </div>`;
      return;
    }

    agents.forEach(agent => {
      const statusClass = agent.status === 'online' ? 'status-online'
        : agent.status === 'busy' ? 'status-busy' : 'status-idle';
      const pulseClass = agent.status === 'online' ? 'green'
        : agent.status === 'busy' ? 'pink' : 'amber';

      // success ring
      const circ = 2 * Math.PI * 20;
      const offset = circ - (agent.successRate / 100) * circ;

      const card = document.createElement('div');
      card.className = 'agent-card' + (currentView === 'list' ? ' list-card' : '');
      card.setAttribute('data-id', agent.id);

      if (currentView === 'list') {
        card.innerHTML = `
          <div class="card-top">
            <div class="agent-avatar" style="background:${agent.color}1a;border:1px solid ${agent.color}33;">
              ${agent.emoji}
              <div class="online-pulse ${pulseClass}"></div>
            </div>
            <div class="card-meta">
              <div class="card-agent-name">${agent.name}</div>
              <div class="card-agent-dept">${agent.dept}</div>
            </div>
            <div class="list-inline">
              <div class="list-stat"><div class="list-stat-val" style="color:${agent.color}">${agent.successRate}%</div><div class="list-stat-key">Success Rate</div></div>
              <div class="list-stat"><div class="list-stat-val">${Array.isArray(agent.tasks) ? agent.tasks.length : agent.tasks}</div><div class="list-stat-key">Tasks</div></div>
              <div class="list-stat"><div class="list-stat-val">${agent.uptime}</div><div class="list-stat-key">Uptime</div></div>
            </div>
            <span class="agent-status-pill ${statusClass}">${agent.statusLabel}</span>
          </div>
        `;
      } else {
        const taskCount = Array.isArray(agent.tasks) ? agent.tasks.length : agent.tasks;
        const tasksDone = Array.isArray(agent.tasks) ? agent.tasks.filter(t => t.status === 'done').length : Math.floor(agent.tasks * 0.7);
        card.innerHTML = `
          <div class="card-top">
            <div class="agent-avatar" style="background:${agent.color}1a;border:1px solid ${agent.color}33;font-size:24px;">
              ${agent.emoji}
              <div class="online-pulse ${pulseClass}"></div>
            </div>
            <div class="card-meta">
              <div class="card-agent-name">${agent.name}</div>
              <div class="card-agent-dept">${agent.dept}</div>
            </div>
            <div class="card-status-wrap">
              <span class="agent-status-pill ${statusClass}">${agent.statusLabel}</span>
            </div>
          </div>

          <div class="card-stats">
            <div class="card-stat">
              <div class="success-rate-ring">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle class="ring-bg" cx="24" cy="24" r="20" stroke-width="4" fill="none"/>
                  <circle class="ring-fill" cx="24" cy="24" r="20" stroke-width="4" fill="none"
                    stroke="${agent.color}"
                    stroke-dasharray="${circ}"
                    stroke-dashoffset="${offset}"/>
                </svg>
                <div class="rate-text">${agent.successRate}%</div>
              </div>
              <div class="card-stat-key">Success</div>
            </div>
            <div class="card-stat">
              <div class="card-stat-val">${tasksDone}</div>
              <div class="card-stat-key">Tasks Done</div>
            </div>
            <div class="card-stat">
              <div class="card-stat-val">${agent.uptime}</div>
              <div class="card-stat-key">Uptime</div>
            </div>
          </div>

          <div class="card-activity">
            <div class="activity-blink"></div>
            <div class="card-activity-text">${agent.currentActivity}</div>
          </div>

          <div class="card-actions">
            <button class="card-action-btn primary" onclick="event.stopPropagation();openModal(${agent.id})">
              <svg viewBox="0 0 16 16" width="12"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 5v4M8 11v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              View
            </button>
            <button class="card-action-btn" onclick="event.stopPropagation();">
              <svg viewBox="0 0 16 16" width="12"><circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
              Configure
            </button>
            <button class="card-action-btn" onclick="event.stopPropagation();">
              <svg viewBox="0 0 16 16" width="12"><path d="M3 8a5 5 0 115 5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M3 8V5M3 8H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              Restart
            </button>
          </div>
        `;
      }

      card.addEventListener('click', () => openModal(agent.id));
      grid.appendChild(card);
    });
  }

  // ---- MODAL ----
  window.openModal = function (id) {
    const agent = AGENTS.find(a => a.id === id);
    if (!agent) return;
    selectedAgent = agent;
    currentTab = 'overview';
    renderModal(agent);
    document.getElementById('agentModal').classList.add('open');
  };

  function renderModal(agent) {
    const container = document.getElementById('modalContainer');
    const statusClass = agent.status === 'online' ? 'status-online'
      : agent.status === 'busy' ? 'status-busy' : 'status-idle';

    const tasksList = Array.isArray(agent.tasks)
      ? agent.tasks.map(t => `
        <div class="task-item">
          <div class="task-status-icon ${t.status}"></div>
          <div class="task-name">${t.name}</div>
          <div class="task-time">${t.status === 'done' ? '✓ Done' : t.status === 'running' ? '⚡ Running' : '⏳ Queued'}</div>
        </div>
      `).join('')
      : '<div class="task-item"><div class="task-name" style="color:var(--text-muted)">No tasks loaded</div></div>';

    const logsList = agent.logs.map(l => `
      <div class="log-entry">
        <div class="log-time">${l.time}</div>
        <div class="log-text">${l.text}</div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="modal-agent-header">
        <div class="modal-agent-avatar" style="background:${agent.color}1a;border-color:${agent.color}44;font-size:28px;">${agent.emoji}</div>
        <div class="modal-agent-meta">
          <div class="modal-agent-name">${agent.name}</div>
          <div class="modal-agent-dept">${agent.dept} · Model: ${agent.model}</div>
        </div>
        <div style="display:flex;gap:10px;align-items:center;margin-left:auto;">
          <span class="agent-status-pill ${statusClass}">${agent.statusLabel}</span>
          <button class="modal-close" id="modalClose">
            <svg viewBox="0 0 20 20" width="18"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>

      <div class="modal-tabs">
        <button class="modal-tab active" data-tab="overview">Overview</button>
        <button class="modal-tab" data-tab="tasks">Tasks</button>
        <button class="modal-tab" data-tab="logs">Activity Logs</button>
        <button class="modal-tab" data-tab="config">Config</button>
      </div>

      <div class="modal-tab-content">
        <div class="modal-tab-pane active" id="tab-overview">
          <p style="color:var(--text-secondary);font-size:13.5px;line-height:1.7;margin-bottom:20px;">${agent.description}</p>
          <div class="modal-metrics">
            <div class="modal-metric">
              <div class="modal-metric-val">${agent.successRate}%</div>
              <div class="modal-metric-key">Success Rate</div>
            </div>
            <div class="modal-metric">
              <div class="modal-metric-val">${agent.uptime}</div>
              <div class="modal-metric-key">Uptime</div>
            </div>
            <div class="modal-metric">
              <div class="modal-metric-val">${Array.isArray(agent.tasks) ? agent.tasks.filter(t=>t.status==='done').length : Math.floor(agent.tasks*0.7)}</div>
              <div class="modal-metric-key">Tasks Done</div>
            </div>
          </div>
          <div class="card-activity" style="border-radius:var(--radius-sm);">
            <div class="activity-blink"></div>
            <div class="card-activity-text"><strong>Current:</strong> ${agent.currentActivity}</div>
          </div>
        </div>

        <div class="modal-tab-pane" id="tab-tasks">
          <h4 style="font-size:13px;font-weight:600;color:var(--text-muted);margin-bottom:14px;letter-spacing:0.05em;">ACTIVE & QUEUED TASKS</h4>
          ${tasksList}
        </div>

        <div class="modal-tab-pane" id="tab-logs">
          <h4 style="font-size:13px;font-weight:600;color:var(--text-muted);margin-bottom:14px;letter-spacing:0.05em;">RECENT ACTIVITY</h4>
          ${logsList}
        </div>

        <div class="modal-tab-pane" id="tab-config">
          <h4 style="font-size:13px;font-weight:600;color:var(--text-muted);margin-bottom:14px;letter-spacing:0.05em;">AGENT CONFIGURATION</h4>
          <div class="config-row">
            <div class="config-label">AI Model</div>
            <div class="config-val">${agent.model}</div>
          </div>
          <div class="config-row">
            <div class="config-label">Department</div>
            <div class="config-val">${agent.dept}</div>
          </div>
          <div class="config-row">
            <div class="config-label">Auto-execute tasks</div>
            <div class="toggle on" id="toggle-auto"></div>
          </div>
          <div class="config-row">
            <div class="config-label">Slack notifications</div>
            <div class="toggle on" id="toggle-slack"></div>
          </div>
          <div class="config-row">
            <div class="config-label">Human review mode</div>
            <div class="toggle" id="toggle-review"></div>
          </div>
          <div class="config-row">
            <div class="config-label">Rate limit</div>
            <div class="config-val">1,000 req/hr</div>
          </div>
        </div>
      </div>
    `;

    // tab switching
    container.querySelectorAll('.modal-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.modal-tab').forEach(b => b.classList.remove('active'));
        container.querySelectorAll('.modal-tab-pane').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const pane = container.querySelector(`#tab-${btn.dataset.tab}`);
        if (pane) pane.classList.add('active');
      });
    });

    // toggles
    container.querySelectorAll('.toggle').forEach(t => {
      t.addEventListener('click', () => t.classList.toggle('on'));
    });

    // close
    document.getElementById('modalClose').addEventListener('click', closeModal);
  }

  function closeModal() {
    document.getElementById('agentModal').classList.remove('open');
  }

  document.getElementById('agentModal').addEventListener('click', e => {
    if (e.target === document.getElementById('agentModal')) closeModal();
  });

  // ---- FILTERS ----
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderAgents();
    });
  });

  document.getElementById('categoryFilter').addEventListener('change', e => {
    currentCategory = e.target.value;
    renderAgents();
  });

  const agentSearch = document.getElementById('agentSearch');
  if (agentSearch) {
    agentSearch.addEventListener('input', e => {
      searchQuery = e.target.value.toLowerCase();
      renderAgents();
    });
  }

  // ---- VIEW TOGGLE ----
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentView = btn.dataset.view;
      renderAgents();
    });
  });

  // ---- DEPLOY MODAL ----
  const addBtn = document.getElementById('addAgentBtn');
  const deployModal = document.getElementById('deployModal');
  const deployClose = document.getElementById('deployModalClose');

  if (addBtn) addBtn.addEventListener('click', () => deployModal.classList.add('open'));
  if (deployClose) deployClose.addEventListener('click', () => deployModal.classList.remove('open'));
  if (deployModal) deployModal.addEventListener('click', e => {
    if (e.target === deployModal) deployModal.classList.remove('open');
  });

  // ---- MOBILE MENU ----
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  if (menuBtn && sidebar) {
    let overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    });
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  // ---- INIT ----
  renderAgents();
})();
