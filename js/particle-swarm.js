(function () {
  "use strict";

  var COLORS = ["242, 153, 74", "168, 102, 216", "74, 104, 240"];

  function initParticleSwarm() {
    var canvases = document.querySelectorAll(".particle-swarm");
    if (!canvases.length) return;

    var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    canvases.forEach(function (canvas) {
      var ctx = canvas.getContext("2d");
      var container = canvas.parentElement;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = 0, h = 0, particles = [];

      function makeParticles() {
        var count = Math.round(Math.max(16, Math.min(70, (w * h) / 8000)));
        particles = [];
        for (var i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.18,
            vy: (Math.random() - 0.5) * 0.18,
            r: 1 + Math.random() * 1.6,
            c: COLORS[i % COLORS.length]
          });
        }
      }

      function resize() {
        w = container.clientWidth;
        h = container.clientHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        makeParticles();
      }

      function drawFrame() {
        ctx.clearRect(0, 0, w, h);
        var linkDist = Math.min(w, h) * 0.32;

        for (var i = 0; i < particles.length; i++) {
          for (var j = i + 1; j < particles.length; j++) {
            var a = particles[i], b = particles[j];
            var dx = a.x - b.x, dy = a.y - b.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < linkDist) {
              ctx.strokeStyle = "rgba(" + a.c + ", " + (0.22 * (1 - dist / linkDist)) + ")";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }

        particles.forEach(function (p) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(" + p.c + ", 0.85)";
          ctx.fill();
        });
      }

      function step() {
        particles.forEach(function (p) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        });
        drawFrame();
        if (!reduced) requestAnimationFrame(step);
      }

      window.addEventListener("resize", resize);
      resize();
      step();
    });
  }

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { safe(initParticleSwarm, "initParticleSwarm"); });
  } else {
    safe(initParticleSwarm, "initParticleSwarm");
  }
})();
