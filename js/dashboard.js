/* dashboard.js */
(function () {
  // ---- AGENT DATA ----
  const AGENTS = [
    { id: 1, name: 'CMO Orchestrator AI', dept: 'Strategy', emoji: '🧠', color: '#FF2D8D', status: 'online', perf: 97, tasks: 382, lastActivity: '2 min ago — Reviewing Q3 strategy' },
    { id: 2, name: 'Brand AI', dept: 'Marketing', emoji: '🎨', color: '#a855f7', status: 'busy', perf: 91, tasks: 214, lastActivity: '5 min ago — Generating brand assets' },
    { id: 3, name: 'SEO AI', dept: 'Growth', emoji: '🔍', color: '#06b6d4', status: 'online', perf: 94, tasks: 1047, lastActivity: '1 min ago — Keyword analysis complete' },
    { id: 4, name: 'Social Media AI', dept: 'Marketing', emoji: '📱', color: '#FF5CAB', status: 'busy', perf: 88, tasks: 623, lastActivity: '3 min ago — Scheduling 12 posts' },
    { id: 5, name: 'Email Marketing AI', dept: 'Growth', emoji: '📧', color: '#f59e0b', status: 'online', perf: 92, tasks: 441, lastActivity: '8 min ago — A/B test launched' },
    { id: 6, name: 'Paid Media AI', dept: 'Growth', emoji: '💰', color: '#22c55e', status: 'online', perf: 96, tasks: 318, lastActivity: '4 min ago — ROAS optimized' },
    { id: 7, name: 'Product Marketing AI', dept: 'Marketing', emoji: '📦', color: '#3b82f6', status: 'online', perf: 89, tasks: 256, lastActivity: '12 min ago — Positioning updated' },
    { id: 8, name: 'Market Research AI', dept: 'Research', emoji: '📊', color: '#8b5cf6', status: 'idle', perf: 85, tasks: 189, lastActivity: '20 min ago — Report compiled' },
    { id: 9, name: 'Customer Success AI', dept: 'Operations', emoji: '🤝', color: '#10b981', status: 'online', perf: 93, tasks: 507, lastActivity: '6 min ago — 3 tickets resolved' },
    { id: 10, name: 'Marketing Ops AI', dept: 'Operations', emoji: '⚙️', color: '#f97316', status: 'busy', perf: 90, tasks: 344, lastActivity: '2 min ago — Syncing HubSpot' },
    { id: 11, name: 'PR AI', dept: 'Marketing', emoji: '📰', color: '#ec4899', status: 'online', perf: 87, tasks: 122, lastActivity: '35 min ago — Press release drafted' },
  ];

  // ---- LIVE CLOCK ----
  function updateClock() {
    const el = document.getElementById('live-clock');
    if (!el) return;
    const now = new Date();
    const h = String(now.getUTCHours()).padStart(2, '0');
    const m = String(now.getUTCMinutes()).padStart(2, '0');
    const s = String(now.getUTCSeconds()).padStart(2, '0');
    el.querySelector('.time-display').textContent = `${h}:${m}:${s}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // ---- KPI COUNTER ANIMATION ----
  function animateCounters() {
    document.querySelectorAll('.kpi-value[data-target]').forEach(el => {
      const target = +el.dataset.target;
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const duration = 1200;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
        if (current >= target) clearInterval(timer);
      }, 16);
    });
  }

  // ---- AGENTS MINI GRID ----
  function renderAgentsGrid() {
    const grid = document.getElementById('agents-grid');
    if (!grid) return;
    grid.innerHTML = '';
    AGENTS.forEach(agent => {
      const statusClass = agent.status === 'online' ? 'status-online'
        : agent.status === 'busy' ? 'status-busy' : 'status-idle';
      const statusLabel = agent.status === 'online' ? 'ONLINE'
        : agent.status === 'busy' ? 'BUSY' : 'IDLE';

      const card = document.createElement('div');
      card.className = 'agent-mini-card';
      card.innerHTML = `
        <div class="agent-mini-top">
          <div class="agent-avatar-sm" style="background:${agent.color}1a;border:1px solid ${agent.color}33;">${agent.emoji}</div>
          <div class="agent-meta">
            <div class="agent-name-sm">${agent.name}</div>
            <div class="agent-dept-sm">${agent.dept}</div>
          </div>
          <span class="agent-status-pill ${statusClass}">${statusLabel}</span>
        </div>
        <div class="agent-mini-stats">
          <div class="mini-stat">
            <div class="mini-stat-val" style="color:${agent.color}">${agent.perf}%</div>
            <div class="mini-stat-key">Performance</div>
          </div>
          <div class="mini-stat">
            <div class="mini-stat-val">${agent.tasks.toLocaleString()}</div>
            <div class="mini-stat-key">Tasks Done</div>
          </div>
        </div>
        <div class="mini-progress">
          <div class="mini-progress-fill" style="width:0%;background:linear-gradient(90deg,${agent.color},${agent.color}aa)" data-width="${agent.perf}%"></div>
        </div>
        <div class="agent-last-activity">${agent.lastActivity}</div>
      `;
      card.addEventListener('click', () => {
        window.location.href = 'agents.html';
      });
      grid.appendChild(card);
    });

    // animate progress bars
    requestAnimationFrame(() => {
      document.querySelectorAll('.mini-progress-fill[data-width]').forEach(el => {
        setTimeout(() => { el.style.width = el.dataset.width; }, 100);
      });
    });
  }

  // ---- ACTIVITY FEED ----
  const ACTIVITIES = [
    { icon: '🔍', bg: '#06b6d41a', agent: 'SEO AI', action: 'completed keyword analysis for Q4 campaign', time: '1 min ago' },
    { icon: '🎨', bg: '#a855f71a', agent: 'Brand AI', action: 'launched new visual identity assets', time: '3 min ago' },
    { icon: '🧠', bg: '#FF2D8D1a', agent: 'CMO Orchestrator', action: 'approved content strategy for October', time: '5 min ago' },
    { icon: '📧', bg: '#f59e0b1a', agent: 'Email Marketing AI', action: 'sent 4,200 campaign emails — 42% open rate', time: '8 min ago' },
    { icon: '💰', bg: '#22c55e1a', agent: 'Paid Media AI', action: 'optimized Google Ads — ROAS improved 18%', time: '11 min ago' },
    { icon: '🤝', bg: '#10b9811a', agent: 'Customer Success AI', action: 'resolved 3 support tickets automatically', time: '14 min ago' },
    { icon: '⚙️', bg: '#f973161a', agent: 'Marketing Ops AI', action: 'synced HubSpot CRM — 127 contacts updated', time: '18 min ago' },
    { icon: '📱', bg: '#FF5CAB1a', agent: 'Social Media AI', action: 'scheduled 12 posts across LinkedIn & Twitter', time: '22 min ago' },
    { icon: '📰', bg: '#ec48991a', agent: 'PR AI', action: 'drafted TechCrunch press release for review', time: '35 min ago' },
  ];

  function renderActivityFeed() {
    const feed = document.getElementById('activity-feed');
    if (!feed) return;
    ACTIVITIES.forEach(a => {
      const item = document.createElement('div');
      item.className = 'activity-item';
      item.innerHTML = `
        <div class="activity-icon" style="background:${a.bg}">${a.icon}</div>
        <div class="activity-body">
          <div class="activity-text"><strong>${a.agent}</strong> ${a.action}</div>
          <div class="activity-time">${a.time}</div>
        </div>
      `;
      feed.appendChild(item);
    });
  }

  // ---- CHART ----
  function renderChart() {
    const canvas = document.getElementById('main-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.offsetWidth;
    const H = 200;
    canvas.width = W;
    canvas.height = H;

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    const data1 = [62, 71, 75, 68, 82, 78, 88, 91, 89, 97]; // performance
    const data2 = [70, 70, 72, 74, 76, 78, 80, 82, 84, 86]; // target
    const data3 = [40, 52, 58, 61, 70, 74, 80, 85, 84, 92]; // growth

    const pad = { top: 20, right: 20, bottom: 35, left: 40 };
    const cW = W - pad.left - pad.right;
    const cH = H - pad.top - pad.bottom;

    function toX(i) { return pad.left + (i / (labels.length - 1)) * cW; }
    function toY(v) { return pad.top + cH - ((v - 40) / 60) * cH; }

    function drawLine(data, color, dotColor, dashArr) {
      // gradient fill
      const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + cH);
      grad.addColorStop(0, color.replace(')', ', 0.15)').replace('rgb', 'rgba'));
      grad.addColorStop(1, color.replace(')', ', 0)').replace('rgb', 'rgba'));

      ctx.beginPath();
      ctx.moveTo(toX(0), toY(data[0]));
      for (let i = 1; i < data.length; i++) {
        const cpx = (toX(i - 1) + toX(i)) / 2;
        ctx.bezierCurveTo(cpx, toY(data[i-1]), cpx, toY(data[i]), toX(i), toY(data[i]));
      }
      ctx.lineTo(toX(data.length - 1), pad.top + cH);
      ctx.lineTo(toX(0), pad.top + cH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(toX(0), toY(data[0]));
      for (let i = 1; i < data.length; i++) {
        const cpx = (toX(i - 1) + toX(i)) / 2;
        ctx.bezierCurveTo(cpx, toY(data[i-1]), cpx, toY(data[i]), toX(i), toY(data[i]));
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      if (dashArr) ctx.setLineDash(dashArr); else ctx.setLineDash([]);
      ctx.stroke();
      ctx.setLineDash([]);

      // dots on last point
      const lx = toX(data.length - 1), ly = toY(data[data.length - 1]);
      ctx.beginPath();
      ctx.arc(lx, ly, 4, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(lx, ly, 7, 0, Math.PI * 2);
      ctx.strokeStyle = color.replace(')', ', 0.3)').replace('rgb', 'rgba');
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // grid lines
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (i / 4) * cH;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + cW, y); ctx.stroke();
    }

    // x axis labels
    ctx.fillStyle = 'rgba(189,189,199,0.6)';
    ctx.font = '10px Manrope, sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((l, i) => { ctx.fillText(l, toX(i), H - 8); });

    // y axis labels
    ctx.textAlign = 'right';
    ['40', '55', '70', '85', '100'].forEach((v, i) => {
      ctx.fillText(v + '%', pad.left - 6, pad.top + cH - (i / 4) * cH + 4);
    });

    drawLine(data2, '#a855f7', '#a855f7', [5, 4]);
    drawLine(data3, '#22C55E', '#22C55E');
    drawLine(data1, '#FF2D8D', '#FF2D8D');
  }

  // ---- CHART TABS ----
  function initChartTabs() {
    document.querySelectorAll('.chart-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.chart-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // re-render with slight randomization for demo
        renderChart();
      });
    });
  }

  // ---- MOBILE MENU ----
  function initMobileMenu() {
    const btn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    if (!btn || !sidebar) return;

    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      document.body.appendChild(overlay);
    }

    btn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    });

    overlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  // ---- INIT ----
  function init() {
    renderAgentsGrid();
    renderActivityFeed();
    animateCounters();
    initChartTabs();
    initMobileMenu();

    // Slight delay for chart to get proper width
    setTimeout(renderChart, 100);
    window.addEventListener('resize', () => setTimeout(renderChart, 100));

    // Simulate live activity
    let actIdx = 0;
    setInterval(() => {
      const feed = document.getElementById('activity-feed');
      if (!feed) return;
      const a = ACTIVITIES[actIdx % ACTIVITIES.length];
      actIdx++;
      const item = document.createElement('div');
      item.className = 'activity-item';
      item.innerHTML = `
        <div class="activity-icon" style="background:${a.bg}">${a.icon}</div>
        <div class="activity-body">
          <div class="activity-text"><strong>${a.agent}</strong> ${a.action}</div>
          <div class="activity-time">just now</div>
        </div>
      `;
      feed.insertBefore(item, feed.firstChild);
      if (feed.children.length > 12) feed.removeChild(feed.lastChild);
    }, 8000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
