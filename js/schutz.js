/* =====================================================================
   Bildschutz: verhindert «Bild sichern unter …» per Rechtsklick,
   das Herausziehen von Bildern und langes Drücken auf dem Handy.
   Links (E-Mail, Adresse, Index) funktionieren weiterhin normal.
   ===================================================================== */
(function () {
  "use strict";

  function istBildbereich(el) {
    return !!(el && el.closest && el.closest("img, .bildfeld, .hintergrund, .overlay"))
      && !el.closest("a, button");
  }

  // Rechtsklick-Menü über Bildern unterdrücken
  document.addEventListener("contextmenu", function (ev) {
    if (istBildbereich(ev.target) || document.body.classList.contains("landing") && !ev.target.closest("a")) {
      ev.preventDefault();
    }
  });

  // Bilder nicht auf den Schreibtisch ziehen lassen
  document.addEventListener("dragstart", function (ev) {
    if (ev.target && ev.target.tagName === "IMG") ev.preventDefault();
  });
})();

/* =====================================================================
   Links ohne Adressanzeige: Die Links haben kein «href», sondern
   «data-link». Dadurch blendet der Browser unten links keine Adresse ein.
   «data-neu» öffnet den Link in einem neuen Tab (Google Maps).
   ===================================================================== */
(function () {
  "use strict";

  function oeffnen(el) {
    const ziel = el.getAttribute("data-link");
    if (!ziel) return;
    if (el.hasAttribute("data-neu")) window.open(ziel, "_blank", "noopener");
    else window.location.href = ziel;
  }

  document.querySelectorAll("[data-link]").forEach(function (el) {
    el.setAttribute("role", "link");
    el.tabIndex = 0;
    el.addEventListener("click", function (ev) { ev.preventDefault(); oeffnen(el); });
    el.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter") { ev.preventDefault(); oeffnen(el); }
    });
  });
})();
