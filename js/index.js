/* =====================================================================
   Index – Aufbau der Liste, Hover-Farben und Diashow
   Inhalte werden in js/daten.js gepflegt, hier muss nichts angepasst werden.
   ===================================================================== */
(function () {
  "use strict";

  const BILDPFAD = "images/";
  const liste = document.getElementById("liste");
  const feldDesktop = document.getElementById("bildfeld");
  const feldMobil = document.getElementById("bildfeld-mobil");
  const overlay = document.getElementById("overlay");
  const overlayTitel = document.getElementById("overlay-titel");
  const mobil = window.matchMedia("(max-width: 860px)");
  const ohneHover = window.matchMedia("(hover: none)");

  /* ---------- Hilfsfunktionen ---------- */

  // Zufällige reine RGB-Farbe (volle Sättigung, wie die Farben im PDF)
  function zufallsfarbe() {
    const h = Math.random() * 360;
    const s = 1;
    const l = 0.5;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
    return `rgb(${f(0)}, ${f(8)}, ${f(4)})`;
  }

  function el(tag, klasse, text) {
    const e = document.createElement(tag);
    if (klasse) e.className = klasse;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ---------- Partner-Links ---------- */

  const partnerNamen = (typeof PARTNER === "object" ? Object.keys(PARTNER) : [])
    .sort((x, y) => y.length - x.length)
    .map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const partnerMuster = partnerNamen.length
    ? new RegExp("(^|[^\\p{L}])(" + partnerNamen.join("|") + ")(?![\\p{L}])", "gu")
    : null;

  // Text einfügen und Partnernamen darin als Link setzen
  function beschreibung(ziel, text) {
    if (!partnerMuster) { ziel.appendChild(document.createTextNode(text)); return; }
    let pos = 0;
    text.replace(partnerMuster, (treffer, davor, name, index) => {
      const start = index + davor.length;
      ziel.appendChild(document.createTextNode(text.slice(pos, start)));
      const a = el("a", "inv partner", name);
      a.setAttribute("data-link", PARTNER[name]);
      a.setAttribute("data-neu", "");
      ziel.appendChild(a);
      pos = start + name.length;
      return treffer;
    });
    ziel.appendChild(document.createTextNode(text.slice(pos)));
  }

  /* ---------- Liste aufbauen ---------- */

  INDEX.forEach((gruppe) => {
    const block = el("div", "rubrik");
    block.appendChild(el("h2", null, gruppe.rubrik + ":"));
    const ul = el("ul");

    gruppe.eintraege.forEach((e) => {
      const li = el("li");
      const titel = el("span", "eintrag-titel");
      titel.textContent =
        `${e.nr}_‘${e.titel}’` + (e.zusatz ? ` – ${e.zusatz}` : "") + " ";

      if (e.bilder && e.bilder.length) {
        titel.classList.add("hat-bilder");
        titel.tabIndex = 0;
        titel.setAttribute("role", "button");
        titel.setAttribute("aria-label", `${e.titel}: Bilder zeigen`);
        titel._eintrag = e;
        verknuepfen(titel);
      }

      li.appendChild(titel);
      if (e.text) beschreibung(li, "/ " + e.text);
      ul.appendChild(li);
    });

    block.appendChild(ul);
    liste.appendChild(block);
  });

  /* ---------- Hover + Klick ---------- */

  let aktiv = null;      // aktuell abgespieltes Titel-Element
  let takt = null;       // Interval der Diashow

  function einfaerben(t) {
    if (!t._farbe) t._farbe = t._eintrag.farbe || zufallsfarbe();
    t.style.background = t._farbe;
    t.classList.add("an");
  }
  function entfaerben(t) {
    if (t === aktiv) return;
    t.style.background = "";
    t.classList.remove("an");
    t._farbe = null; // beim nächsten Überfahren neue Zufallsfarbe
  }

  function vorladen(e) {
    if (e._geladen) return;
    e._geladen = e.bilder.map((b) => {
      const img = new Image();
      img.decoding = "async";
      img.src = BILDPFAD + e.ordner + "/" + b;
      return img;
    });
  }

  function verknuepfen(t) {
    t.addEventListener("mouseenter", () => {
      if (ohneHover.matches) return;
      einfaerben(t);
      vorladen(t._eintrag);
    });
    t.addEventListener("mouseleave", () => entfaerben(t));
    t.addEventListener("focus", () => vorladen(t._eintrag));
    t.addEventListener("click", () => umschalten(t));
    t.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); umschalten(t); }
    });
  }

  function umschalten(t) {
    if (aktiv === t) { stoppen(); return; }
    starten(t);
  }

  function starten(t) {
    stoppen(true);
    aktiv = t;
    einfaerben(t);
    const e = t._eintrag;
    vorladen(e);

    const feld = mobil.matches ? feldMobil : feldDesktop;
    feld.innerHTML = "";
    feld.classList.toggle("einpassen", !!e.einpassen);

    // Bilder als Hintergrundflächen (kein <img>, daher nicht speicherbar)
    const bilder = e._geladen.map((img) => {
      const b = el("div", "bild");
      b.style.backgroundImage = `url("${img.src}")`;
      b.setAttribute("role", "img");
      b.setAttribute("aria-label", e.titel);
      feld.appendChild(b);
      return b;
    });

    if (e.credit) {
      const c = el("span", "credit", e.credit);
      c.style.color = t._farbe;
      feld.appendChild(c);
    }

    if (mobil.matches) {
      overlayTitel.innerHTML = "";
      const ot = el("span", "eintrag-titel hat-bilder an", t.textContent);
      ot.style.background = t._farbe;
      overlayTitel.appendChild(ot);
      overlay.classList.add("offen");
      document.body.style.overflow = "hidden";
    }

    let i = 0;
    bilder[0].classList.add("sichtbar");
    if (bilder.length > 1) {
      takt = setInterval(() => {
        bilder[i].classList.remove("sichtbar");
        i = (i + 1) % bilder.length;
        bilder[i].classList.add("sichtbar");
      }, DIASHOW_TAKT);
    }
  }

  function stoppen(nurWechsel) {
    clearInterval(takt);
    takt = null;
    const alt = aktiv;
    aktiv = null;
    if (alt && !alt.matches(":hover")) entfaerben(alt);
    else if (alt && ohneHover.matches) entfaerben(alt);
    if (!nurWechsel) {
      feldDesktop.innerHTML = "";
      feldMobil.innerHTML = "";
    }
    overlay.classList.remove("offen");
    document.body.style.overflow = "";
  }

  document.getElementById("schliessen").addEventListener("click", () => stoppen());
  overlay.addEventListener("click", (ev) => { if (ev.target === overlay) stoppen(); });
  document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") stoppen(); });

  // Wechsel zwischen schmal/breit während eine Diashow läuft
  mobil.addEventListener("change", () => { if (aktiv) starten(aktiv); });

  // Jahreszahl im Copyright automatisch aktuell halten
  document.querySelectorAll(".jahr").forEach((j) => (j.textContent = new Date().getFullYear()));
})();
