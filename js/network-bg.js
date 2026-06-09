/* network-bg.js — Animated node network canvas */
(function () {
  const canvas = document.getElementById('network-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, nodes = [], animId;
  const NODE_COUNT = 60;
  const LINK_DIST = 160;
  const ACCENT = '#FF2D8D';

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randBetween(a, b) { return a + Math.random() * (b - a); }

  function init() {
    nodes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: randBetween(-0.25, 0.25),
        vy: randBetween(-0.25, 0.25),
        r: randBetween(1.5, 3),
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // draw links
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const alpha = (1 - dist / LINK_DIST) * 0.3;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(255, 45, 141, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // draw nodes
    const t = Date.now() * 0.001;
    nodes.forEach(n => {
      n.pulse += 0.015;
      const glow = 0.4 + 0.3 * Math.sin(n.pulse);
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 45, 141, ${glow})`;
      ctx.fill();
      // outer ring
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + 2, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 45, 141, ${glow * 0.3})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }

  function move() {
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
  }

  function loop() {
    move();
    draw();
    animId = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); init(); });
  resize();
  init();
  loop();

  // Reduce opacity when page not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(animId); }
    else { loop(); }
  });
})();
