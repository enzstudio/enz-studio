/* =====================================================================
   INDEX-DATEN  –  Studio Matyas Enz
   ---------------------------------------------------------------------
   Hier wird der gesamte Index gepflegt. Die Website liest diese Liste
   und baut daraus die Seite auf. Am HTML muss nichts geändert werden.

   Einen Eintrag hinzufügen:
   Einfach eine Zeile kopieren, an der gewünschten Stelle einfügen und
   anpassen. Die Reihenfolge hier = Reihenfolge auf der Website.

   Felder:
     nr      Kürzel / Datum, z.B. "2605"
     titel   Titel ohne Anführungszeichen (die ‘ ’ werden automatisch gesetzt)
     zusatz  (optional) fett gesetzter Zusatz nach dem Titel, z.B. "1. Preis"
     text    Beschreibung nach dem Schrägstrich
     ordner  (optional) Bildordner in /images/, z.B. "spannungsfelder"
     bilder  (optional) Dateinamen der Bilder in diesem Ordner, in der
             Reihenfolge der Diashow, z.B. ["01.jpg", "02.jpg"]
     farbe   (optional) Farbe für Hinterlegung und Bildlegende als RGB-Hex,
             z.B. "#0000FF". Ohne Angabe wird bei jedem Überfahren
             eine zufällige reine RGB-Farbe gewählt.
     credit  (optional) senkrechte Bildlegende neben den Bildern
     einpassen (optional) true = Bild wird ganz gezeigt statt randabfallend
               (für Bilder, die nicht hochformatig sind)

   Nur Einträge mit «bilder» reagieren auf Maus und Klick.
   ===================================================================== */

const INDEX = [
  {
    rubrik: "PROJEKTE",
    eintraege: [
      { nr: "2605", titel: "Il Fera Beau Demain", zusatz: "1. Preis", text: "Studienauftrag Städtli, Cham ZG / mit Boris Gusic" },
      { nr: "2601", titel: "Spannungsfelder", zusatz: "3. Preis", text: "Design Wettbewerb, Wiener Netz AU / mit büro stainhauser",
        farbe: "#0000FF", ordner: "spannungsfelder", bilder: ["01.jpg", "02.jpg", "03.jpg"],
        credit: "GroundFloor_©StudioMatyasEnz_büro stainhauser_AU_2026" },
      { nr: "2507", titel: "Acht Uhr Dreizehn", text: "offener Wettbewerb, Bern BE / als Studio DREI + Studio Proxi" },
      { nr: "2408", titel: "Rosengarten", zusatz: "Ausführung", text: "Direktauftrag, Illighausen TG / mit büro stainhauser" },
      { nr: "2405", titel: "PV, Plants + Paper", text: "Planerwahlverfahren, Uster ZH / mit Boris Gusic" },
      { nr: "2402", titel: "du Solaire au Polaire", text: "offener Wettbewerb, Bouquetin VS / mit ALIAS",
        farbe: "#FF00FF", ordner: "du-solaire-au-polaire", bilder: ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"],
        credit: "DuPolairAuSolaire_©StudioMatyasEnz_ALIAS_VS_2024" },
      { nr: "2401", titel: "Putting Things Together Taking Things Apart", zusatz: "Ausführung", text: "Grün Stadt ZH / mit Boris Gusic" },
      { nr: "2306", titel: "Crushing Polybotes", text: "Research Project, Nysiros GR / mit TEN" },
      { nr: "2301", titel: "Heliocentric Architecture", text: "Research Project, Zürich ZH",
        farbe: "#01FF00", ordner: "heliocentric-architecture", bilder: ["02.jpg", "01.jpg", "03.jpg", "04.jpg"],
        credit: "HeliocentricArchitecture_©PierreMarmy_ZH_2024" },
      { nr: "2211", titel: "Witikerhof", zusatz: "2. Preis", text: "Selektiver Wettbewerb, Zürich ZH / mit TEN + Boris Gusic" },
    ],
  },
  {
    rubrik: "PUBLIK",
    eintraege: [
      { nr: "2606", titel: "Solarhaus Nadig", zusatz: "Anerkennung", text: "REAR Reflect Architecture Award" },
      { nr: "2511", titel: "Bauen mit der Sonne", zusatz: "U.+ S. Schäfer", text: "Publikation, Architecture Suisse CH AS 235" },
      { nr: "2502", titel: "Vermächtnis eines Solarpioniers", text: "Publikation, Werk Bauen + Wohnen CH Ausgabe 04-2025" },
      { nr: "2409", titel: "Heliocentrism", text: "Lecture, ZAZ Bellerive ZH Solar Festival" },
      { nr: "2403", titel: "The Sun and the City", text: "Lecture, Studio BA 3 (Assemble) EPFL",
        farbe: "#FF0000", ordner: "the-sun-and-the-city", bilder: ["01.jpg", "02.jpg", "03.jpg"], einpassen: true,
        credit: "TheSunAndTheCity_©StudioMatyasEnz_LectureEPFL_2024" },
      { nr: "2402", titel: "Heliocentric Architecture", text: "Lecture, Think Earth Project ETHZ" },
      { nr: "2305", titel: "U+S Schäfer – Solarpioniere", text: "Lecture, Studio Tom Emerson ETHZ ZH" },
      { nr: "2208", titel: "SOLARIUM", text: "Publikation, Trans Magazin ZH Ausgabe #41 fire / mit Fabiana Frisullo",
        farbe: "#0000FF", ordner: "solarium", bilder: ["01.jpg", "02.jpg", "03.jpg"],
        credit: "Solarium_©StudioMatyasEnz_FabianaFrisullo_Trans41_2022" },
      { nr: "2202", titel: "Moteur, Action, Forme", text: "Ausstellungsobjekt, Arc-En-Rêve Bordeaux FR",
        farbe: "#FFFF00", ordner: "moteur-action-forme", bilder: ["01.jpg", "02.jpg", "03.jpg"],
        credit: "MoteurActionForme_©ArnaudBostelmann_Bordeaux_2022" },
    ],
  },
  {
    rubrik: "TEACHING",
    eintraege: [
      { nr: "2606", titel: "Becoming Embodied", zusatz: "Summerschool", text: "Teacher, UIA World Congress ESP / mit TEN" },
      { nr: "2605", titel: "Parasite", zusatz: "Interim Crit", text: "Guest Crit, Studio Tom Emerson ETHZ" },
      { nr: "2604", titel: "Soft Occupancy", zusatz: "Interim Crit", text: "Guest Crit, Comte/Meuwly ETHZ" },
      { nr: "2503", titel: "Critical Construction", text: "Lecturer, Chair Comte/Meuwly ETHZ / mit A.Comte, A.Meuwly, M.Vrolixs" },
      { nr: "2501", titel: "BESTAND", zusatz: "Final Crit", text: "Guest Crit, Bachelor Modul Hochschule Luzern HSLU" },
      { nr: "2502", titel: "(In)appropriate Technology", text: "Teacher, experimental studio ETHZ / mit TEN" },
    ],
  },
];

/* Takt der Diashow in Millisekunden (2000 = 2 Sekunden) */
const DIASHOW_TAKT = 2000;

/* =====================================================================
   KOLLABORATIONEN
   Diese Namen werden im Index automatisch verlinkt, wo immer sie in
   einer Beschreibung («text») vorkommen. Neue Partner einfach ergänzen:
     "Name wie im Index": "https://adresse.ch",
   ===================================================================== */
const PARTNER = {
  "büro stainhauser": "https://buero.stainhauser.ch/index.html",
  "TEN": "https://www.ten.studio",
  "ALIAS": "https://alias.ooo",
  "Boris Gusic": "https://buero.llc",
};
