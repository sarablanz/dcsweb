(function () {
  "use strict";

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  function initNav() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => links.classList.remove("open"));
    });
  }

  function initThemeToggle() {
    const btn = document.querySelector(".theme-toggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      if (isLight) {
        document.documentElement.removeAttribute("data-theme");
        try { localStorage.setItem("dcs-theme", "dark"); } catch (e) {}
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        try { localStorage.setItem("dcs-theme", "light"); } catch (e) {}
      }
    });
  }

  function initRadarFormRedirect() {
    const form = document.getElementById("radar-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando...";
      }

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then((response) => {
          if (response.ok) {
            window.location.href = "radar-gracias.html";
          } else {
            throw new Error("Formspree error");
          }
        })
        .catch(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
          }
          alert("Hubo un problema al enviar el formulario. Intenta de nuevo o escríbenos a info@dcsconsulting.es.");
        });
    });
  }

  function initMouseGradient() {
    const heroes = document.querySelectorAll(".hero");
    if (!heroes.length) return;

    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty("--mx", x + "%");
      document.documentElement.style.setProperty("--my", y + "%");
    });
  }

  function initReveals() {
    const targets = document.querySelectorAll(".card, .step, .section-head, .cta-banner, .form-wrap");
    if (!targets.length) return;

    targets.forEach((el) => {
      el.classList.add("reveal");
      // Cascade cards/steps within the same row instead of popping in together.
      const group = el.closest(".grid, .steps");
      if (group) {
        const index = Array.prototype.indexOf.call(group.children, el);
        if (index > -1) el.style.transitionDelay = Math.min(index * 55, 275) + "ms";
      }
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -2% 0px" });

    targets.forEach((el) => io.observe(el));

    // Safety net: force-reveal anything still hidden after 4s (e.g. IO didn't fire)
    setTimeout(() => {
      document.querySelectorAll(".reveal:not(.is-revealed)").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-revealed");
        }
      });
    }, 4000);
  }

  function initMagnetic() {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.querySelectorAll("a.btn-primary, a.btn-outline").forEach((el) => {
      const strength = 0.25;
      const inner = document.createElement("span");
      inner.className = "magnetic-inner";
      while (el.firstChild) inner.appendChild(el.firstChild);
      el.appendChild(inner);
      el.classList.add("has-magnetic");

      let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;

      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        tx = (e.clientX - r.left - r.width / 2) * strength;
        ty = (e.clientY - r.top - r.height / 2) * strength;
        if (!raf) raf = requestAnimationFrame(loop);
      });

      el.addEventListener("mouseleave", () => {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(loop);
      });

      function loop() {
        cx += (tx - cx) * 0.2;
        cy += (ty - cy) * 0.2;
        inner.style.transform = "translate3d(" + cx + "px, " + cy + "px, 0)";
        raf = (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) ? requestAnimationFrame(loop) : null;
      }
    });
  }

  function boot() {
    safe(initNav, "initNav");
    safe(initThemeToggle, "initThemeToggle");
    safe(initRadarFormRedirect, "initRadarFormRedirect");
    safe(initMouseGradient, "initMouseGradient");
    safe(initReveals, "initReveals");
    safe(initMagnetic, "initMagnetic");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
