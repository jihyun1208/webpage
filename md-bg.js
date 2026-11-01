/* Molecular-dynamics-style animated background for the home page.
   Coarse-grained "beads" drift with thermal jitter; nearby beads are
   connected by faint bonds, evoking a Martini CG simulation snapshot. */
(function () {
  var canvas = document.getElementById('md-bg');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, particles = [], raf = null;
  var CUTOFF = 110;
  var COLORS = [
    'rgba(26, 82, 118, 0.60)',   /* accent blue  — head groups */
    'rgba(46, 134, 171, 0.50)',  /* lighter blue — tails */
    'rgba(102, 165, 173, 0.45)', /* teal         — water beads */
    'rgba(228, 148, 58, 0.55)',  /* orange       — cargo molecules */
    'rgba(91, 63, 160, 0.40)'    /* purple       — ions */
  ];
  var reduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    var dpr = window.devicePixelRatio || 1;
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    init();
    if (reduced) draw();
  }

  function init() {
    var n = Math.min(120, Math.floor((W * H) / 13000));
    particles = [];
    for (var i = 0; i < n; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 2.5 + Math.random() * 4.5,
        c: COLORS[Math.floor(Math.random() * COLORS.length)]
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < particles.length; i++) {
      var a = particles[i];
      for (var j = i + 1; j < particles.length; j++) {
        var b = particles[j];
        var dx = a.x - b.x, dy = a.y - b.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < CUTOFF * CUTOFF) {
          var alpha = 0.15 * (1 - Math.sqrt(d2) / CUTOFF);
          ctx.strokeStyle = 'rgba(26, 82, 118, ' + alpha.toFixed(3) + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    for (var k = 0; k < particles.length; k++) {
      var p = particles[k];
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function step() {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      /* thermal jitter with a velocity cap, periodic boundary wrap */
      p.vx += (Math.random() - 0.5) * 0.03;
      p.vy += (Math.random() - 0.5) * 0.03;
      var s = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (s > 0.5) { p.vx *= 0.5 / s; p.vy *= 0.5 / s; }
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -12) p.x = W + 12; else if (p.x > W + 12) p.x = -12;
      if (p.y < -12) p.y = H + 12; else if (p.y > H + 12) p.y = -12;
    }
    draw();
    raf = window.requestAnimationFrame(step);
  }

  window.addEventListener('resize', resize);
  resize();
  if (!reduced) step();

  document.addEventListener('visibilitychange', function () {
    if (reduced) return;
    if (document.hidden) {
      if (raf) window.cancelAnimationFrame(raf);
      raf = null;
    } else if (!raf) {
      step();
    }
  });
})();
