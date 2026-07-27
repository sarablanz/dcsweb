(function () {
  "use strict";

  var RISKS = [
    { id: "R-01", cat: "Identidad y accesos", label: "Cuentas sin autenticación multifactor (MFA) activa", hint: "Causa típica: falta de política de acceso obligatorio.", score: 8, priority: "Media", action: "Activar MFA obligatorio en todas las cuentas", responsable: "Dirección/TI" },
    { id: "R-02", cat: "Correo electrónico", label: "Reglas de reenvío automático de correo no autorizadas", hint: "Causa típica: una cuenta comprometida sin detectar.", score: 15, priority: "Alta", action: "Revisar y eliminar reglas de reenvío desconocidas; activar alerta nativa", responsable: "TI/Admin" },
    { id: "R-03", cat: "Alertas y monitoreo", label: "Ausencia de alertas de inicio de sesión inusual", hint: "Causa típica: configuración por defecto sin activar.", score: 16, priority: "Alta", action: "Activar alertas nativas (Defender / Alert Center / GuardDuty)", responsable: "TI/Admin" },
    { id: "R-04", cat: "Identidad y accesos", label: "Cuentas de exempleados o inactivas sin desactivar", hint: "Causa típica: falta de proceso de baja.", score: 12, priority: "Media", action: "Revisar y desactivar accesos cada 90 días", responsable: "RRHH/TI" },
    { id: "R-05", cat: "Alertas y monitoreo", label: "Sin alerta de gasto o consumo inusual en la nube", hint: "Causa típica: presupuestos o alarmas sin configurar.", score: 6, priority: "Baja", action: "Configurar alertas de facturación (AWS Budgets / panel admin)", responsable: "Administración" },
    { id: "R-06", cat: "Datos y continuidad", label: "Backups sin prueba de restauración", hint: "Causa típica: falta de simulacro periódico.", score: 15, priority: "Alta", action: "Programar prueba trimestral de restauración", responsable: "TI/Admin" },
    { id: "R-07", cat: "Terceros y dispositivos", label: "Acceso de terceros/proveedores sin auditar", hint: "Causa típica: permisos heredados sin revisión.", score: 12, priority: "Media", action: "Auditar accesos externos y aplicar mínimo privilegio", responsable: "Dirección/TI" },
    { id: "R-08", cat: "Terceros y dispositivos", label: "Dispositivos sin antivirus/EDR o actualizaciones al día", hint: "Causa típica: falta de política de dispositivos (BYOD).", score: 9, priority: "Media", action: "Exigir EDR y actualizaciones automáticas", responsable: "TI/Admin" },
    { id: "R-09", cat: "Correo electrónico", label: "Falta de SPF/DKIM/DMARC en el dominio de correo", hint: "Causa típica: configuración técnica pendiente.", score: 12, priority: "Media", action: "Configurar registros de autenticación del dominio", responsable: "TI/Proveedor web" },
    { id: "R-10", cat: "Identidad y accesos", label: "Contraseñas compartidas o reutilizadas", hint: "Causa típica: cultura y hábito del equipo.", score: 16, priority: "Alta", action: "Implementar gestor de contraseñas + política interna", responsable: "Dirección" },
    { id: "R-11", cat: "Alertas y monitoreo", label: "Sin notificación ante cambios de permisos/roles críticos", hint: "Causa típica: alertas administrativas desactivadas.", score: 12, priority: "Media", action: "Activar notificaciones de cambios administrativos", responsable: "TI/Admin" },
    { id: "R-12", cat: "Personas × Plataforma", label: "Equipo sin capacitación en phishing/ingeniería social", hint: "Causa típica: falta de formación práctica.", score: 16, priority: "Alta", action: "Capacitación breve + simulacro de phishing", responsable: "Dirección/RRHH" },
    { id: "R-13", cat: "Datos y continuidad", label: "Datos sensibles sin cifrar en tránsito/reposo", hint: "Causa típica: configuración por defecto insuficiente.", score: 10, priority: "Media", action: "Activar cifrado nativo de la plataforma", responsable: "TI/Admin" },
    { id: "R-14", cat: "Personas / Incidentes", label: "Sin responsable asignado ante alerta de fraude", hint: "Causa típica: falta de protocolo de respuesta.", score: 15, priority: "Alta", action: "Definir responsable y playbook de una página", responsable: "Dirección" }
  ];

  var NATIVE_ALERTS = [
    { platform: "Microsoft 365 / Entra ID", alert: "Alertas de inicio de sesión de riesgo / ubicación inusual", where: "Entra ID > Protección > Identity Protection > Políticas de riesgo" },
    { platform: "Microsoft 365 / Entra ID", alert: "Detección de reglas de reenvío de correo sospechosas", where: "Purview / Exchange admin center > Reglas de flujo de correo" },
    { platform: "Microsoft 365", alert: "Alertas de actividad y amenazas (phishing, malware)", where: "Microsoft 365 Defender > Directiva de alertas" },
    { platform: "Microsoft 365", alert: "Requerir MFA para todos los usuarios", where: "Entra ID > Acceso condicional / Seguridad predeterminada" },
    { platform: "Google Workspace", alert: "Centro de alertas de seguridad (login sospechoso, phishing)", where: "Consola admin > Seguridad > Centro de alertas" },
    { platform: "Google Workspace", alert: "Reglas de actividad inusual y exfiltración de datos", where: "Consola admin > Seguridad > Reglas" },
    { platform: "Google Workspace", alert: "Verificación en dos pasos obligatoria", where: "Consola admin > Seguridad > Verificación en 2 pasos" },
    { platform: "AWS", alert: "Detección de amenazas (accesos anómalos, IPs maliciosas)", where: "Consola AWS > GuardDuty > Activar detector" },
    { platform: "AWS", alert: "Alertas de gasto o consumo inusual", where: "Consola AWS > Billing > AWS Budgets > Crear alarma" },
    { platform: "AWS", alert: "Registro y trazabilidad de cambios críticos", where: "Consola AWS > CloudTrail + CloudWatch Alarms" },
    { platform: "AWS", alert: "MFA obligatorio para usuarios raíz e IAM", where: "Consola AWS > IAM > Añadir MFA" }
  ];

  function initRadarApp() {
    var root = document.getElementById("radar-app-root");
    if (!root) return;

    var answers = new Array(RISKS.length).fill(null);
    var index = -1; // -1 = start screen

    function priorityClass(p) {
      return p === "Alta" ? "alta" : p === "Media" ? "media" : "baja";
    }

    function renderStart() {
      root.innerHTML =
        '<div class="quiz-shell quiz-start">' +
        '<span class="eyebrow">Radar Cloud · 14 preguntas</span>' +
        "<h2>Vamos a revisar tu exposición al fraude en la nube</h2>" +
        '<p style="color:var(--text-muted); margin-bottom:32px;">Responde con honestidad. Cada pregunta describe una señal de riesgo real: dinos si eso pasa hoy en tu empresa o si ya lo tienes controlado. Toma unos 5 minutos.</p>' +
        '<button type="button" class="btn btn-primary" id="quiz-start-btn">Empezar autodiagnóstico</button>' +
        "</div>";
      document.getElementById("quiz-start-btn").addEventListener("click", function () {
        index = 0;
        renderQuestion();
      });
    }

    function renderQuestion() {
      var risk = RISKS[index];
      var pct = Math.round((index / RISKS.length) * 100);
      root.innerHTML =
        '<div class="quiz-shell">' +
        '<div class="quiz-progress-row"><span>Pregunta ' + (index + 1) + " de " + RISKS.length + "</span><span>" + pct + "%</span></div>" +
        '<div class="quiz-progress-track"><div class="quiz-progress-fill" style="width:' + pct + '%;"></div></div>' +
        '<div class="quiz-card">' +
        '<span class="tag">' + risk.cat + "</span>" +
        "<h3>" + risk.label + "</h3>" +
        '<p class="quiz-hint">' + risk.hint + "</p>" +
        '<div class="quiz-answers">' +
        '<button type="button" class="quiz-answer-btn is-risk" data-answer="yes">Sí, esto pasa en mi empresa</button>' +
        '<button type="button" class="quiz-answer-btn is-safe" data-answer="no">No, ya lo tengo controlado</button>' +
        "</div>" +
        "</div>" +
        '<div class="quiz-nav-row">' +
        (index > 0 ? '<button type="button" class="quiz-back-btn" id="quiz-back-btn">← Volver a la pregunta anterior</button>' : "") +
        "</div>" +
        "</div>";

      root.querySelectorAll(".quiz-answer-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
          answers[index] = btn.getAttribute("data-answer") === "yes";
          index++;
          if (index >= RISKS.length) {
            renderResults();
          } else {
            renderQuestion();
          }
        });
      });

      var backBtn = document.getElementById("quiz-back-btn");
      if (backBtn) {
        backBtn.addEventListener("click", function () {
          index--;
          renderQuestion();
        });
      }
    }

    function renderResults() {
      var flagged = RISKS.filter(function (r, i) { return answers[i]; });
      var counts = { Alta: 0, Media: 0, Baja: 0 };
      flagged.forEach(function (r) { counts[r.priority]++; });

      var level, levelLabel, levelText, emoji;
      if (counts.Alta >= 4) {
        level = "alto"; levelLabel = "Riesgo alto"; emoji = "🔴";
        levelText = "Tu empresa está expuesta a fraude en la nube de forma activa. Recomendamos pasar al Nivel 2 —DCS Consulting gestiona la implementación y el monitoreo— antes de 30 días.";
      } else if (counts.Alta >= 2 || counts.Media >= 5) {
        level = "medio"; levelLabel = "Riesgo medio"; emoji = "🟠";
        levelText = "Ya tienes algunas defensas activas, pero quedan brechas importantes. Puedes seguir en Nivel 1 si completas las acciones pendientes en 2-4 semanas; si no tienes tiempo o equipo interno, el Nivel 2 acelera el cierre.";
      } else {
        level = "controlado"; levelLabel = "Riesgo controlado"; emoji = "🟢";
        levelText = "Buen nivel básico. Mantén el Nivel 1 con revisión trimestral y repite este autodiagnóstico cada 90 días.";
      }

      var sorted = flagged.slice().sort(function (a, b) { return b.score - a.score; });

      var actionsHtml = sorted.length
        ? sorted.map(function (r) {
            return (
              '<div class="quiz-action-item priority-' + priorityClass(r.priority) + '">' +
              '<span class="priority-tag">Prioridad ' + r.priority + " · " + r.id + "</span>" +
              "<h4>" + r.label + "</h4>" +
              "<p><strong>Acción:</strong> " + r.action + " — <em>" + r.responsable + "</em></p>" +
              "</div>"
            );
          }).join("")
        : '<p style="color:var(--text-muted); text-align:center;">No marcaste ningún riesgo activo — buen trabajo.</p>';

      var alertsHtml = NATIVE_ALERTS.map(function (a) {
        return (
          '<div class="quiz-alerts-row">' +
          '<div class="platform">' + a.platform + "</div>" +
          "<div>" + a.alert + "</div>" +
          '<div class="where">' + a.where + "</div>" +
          "</div>"
        );
      }).join("");

      root.innerHTML =
        '<div class="quiz-shell quiz-results">' +
        '<div class="quiz-semaphore level-' + level + '">' + emoji + "</div>" +
        '<span class="eyebrow">Tu resultado</span>' +
        '<h2 class="level-' + level + '">' + levelLabel + "</h2>" +
        '<p style="color:var(--text-muted);">' + levelText + "</p>" +
        '<div class="quiz-stats-row">' +
        '<div class="quiz-stat stat-alta"><span class="num">' + counts.Alta + '</span><span class="label">Prioridad alta</span></div>' +
        '<div class="quiz-stat stat-media"><span class="num">' + counts.Media + '</span><span class="label">Prioridad media</span></div>' +
        '<div class="quiz-stat stat-baja"><span class="num">' + counts.Baja + '</span><span class="label">Prioridad baja</span></div>' +
        "</div>" +
        (sorted.length ? "<h3 style=\"text-align:left;\">Qué atender primero</h3>" : "") +
        '<div class="quiz-action-list">' + actionsHtml + "</div>" +
        '<button type="button" class="quiz-alerts-toggle" id="quiz-alerts-toggle">Ver guía de alertas nativas gratuitas ↓</button>' +
        '<div class="quiz-alerts-table" id="quiz-alerts-table">' + alertsHtml + "</div>" +
        '<div class="hero-actions" style="margin-top:36px;">' +
        '<a href="contacto.html" class="btn btn-primary">Hablar con DCS Consulting</a>' +
        '<a href="ebook.html" class="btn btn-outline">Ver el ebook · $5</a>' +
        "</div>" +
        '<p style="margin-top:20px;"><a href="assets/downloads/Radar-Cloud-DCS-Nivel1.xlsx" style="color:var(--blue); font-weight:600;">Descargar el kit completo en Excel →</a></p>' +
        '<p style="margin-top:12px;"><button type="button" id="quiz-restart-btn" style="background:none; border:none; color:var(--text-muted); text-decoration:underline; cursor:pointer; font-size:0.85rem;">Repetir el autodiagnóstico</button></p>' +
        "</div>";

      document.getElementById("quiz-alerts-toggle").addEventListener("click", function () {
        document.getElementById("quiz-alerts-table").classList.toggle("is-open");
      });
      document.getElementById("quiz-restart-btn").addEventListener("click", function () {
        answers = new Array(RISKS.length).fill(null);
        index = -1;
        renderStart();
      });
    }

    renderStart();
  }

  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { safe(initRadarApp, "initRadarApp"); });
  } else {
    safe(initRadarApp, "initRadarApp");
  }
})();
