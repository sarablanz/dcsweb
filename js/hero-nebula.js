(function () {
  "use strict";

  function initHeroNebula() {
    if (!window.THREE) return;

    var container = document.querySelector(".hero-nebula");
    if (!container) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    var clock = new THREE.Clock();

    var vertexShader = [
      "varying vec2 vUv;",
      "void main() {",
      "  vUv = uv;",
      "  gl_Position = vec4(position, 1.0);",
      "}"
    ].join("\n");

    // Slow, low-contrast nebula in the DCS brand palette (orange -> purple -> blue).
    var fragmentShader = [
      "precision mediump float;",
      "uniform vec2 iResolution;",
      "uniform float iTime;",
      "varying vec2 vUv;",
      "mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }",
      "float field(vec3 p, float t){",
      "  p.xz *= rot(t*0.5);",
      "  p.xy *= rot(t*0.35);",
      "  vec3 q = p*2.0 + t;",
      "  return length(p) * log(length(p)+1.0)",
      "       + sin(q.x + sin(q.z + sin(q.y))) * 0.5 - 1.0;",
      "}",
      "void main() {",
      "  float t = iTime * 0.12;",
      "  vec2 uv = (vUv * iResolution - 0.5*iResolution) / min(iResolution.x, iResolution.y);",
      "  vec3 col = vec3(0.0);",
      "  float d = 2.6;",
      "  vec3 orange = vec3(0.949, 0.6, 0.29);",
      "  vec3 purple = vec3(0.608, 0.349, 0.816);",
      "  vec3 blue   = vec3(0.29, 0.408, 0.941);",
      "  for (int i = 0; i <= 4; i++) {",
      "    vec3 p = vec3(0.0, 0.0, 5.0) + normalize(vec3(uv, -1.0)) * d;",
      "    float rz = field(p, t);",
      "    float f = clamp((rz - field(p + 0.1, t)) * 0.5, -0.1, 1.0);",
      "    vec3 base = mix(mix(orange, purple, 0.5 + 0.5*sin(t+p.x)), blue, 0.4 + 0.3*cos(t*0.7+p.y));",
      "    col = col * base + smoothstep(2.6, 0.0, rz) * 0.5 * base * f;",
      "    d += min(rz, 1.0);",
      "  }",
      "  col *= 0.22;",
      "  gl_FragColor = vec4(col, clamp(length(col), 0.0, 0.55));",
      "}"
    ].join("\n");

    var uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
    };

    var material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: uniforms,
      transparent: true,
    });

    var mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    function resize() {
      var w = container.clientWidth;
      var h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.iResolution.value.set(w, h);
    }

    window.addEventListener("resize", resize);
    resize();

    renderer.setAnimationLoop(function () {
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    });
  }

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { safe(initHeroNebula, "initHeroNebula"); });
  } else {
    safe(initHeroNebula, "initHeroNebula");
  }
})();
