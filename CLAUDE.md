# Projektregeln: Luise Riegel Foto

Nuxt 4 + Tailwind CSS 4. Fotografie-Website – das Design soll individuell und
hochwertig wirken, nicht wie eine generische KI-generierte Landingpage.

Die folgenden Punkte sind **Faustregeln, keine starren Vorschriften**. Im
Zweifel hat das, was für Luises Marke und das konkrete Design am besten
funktioniert, Vorrang vor dem Abhaken der Liste.

## KI-Merkmale im Hinterkopf behalten (Design)

Diese Muster wirken oft generisch/"KI-generiert" und sollten nicht ohne
bewussten Grund übernommen werden:

- **Keine lila/violett-blauen Farbverläufe** im Hintergrund oder in Überschriften.
  Stattdessen eine eigene, zur Marke passende Farbpalette verwenden.
- **Keine Emojis als Icons.** Echte Icons verwenden (SVG), keine Emoji-Symbole.
- **Keine kleinen "Pillen"-Labels** über Überschriften (z. B. "Jetzt verfügbar"
  mit grünem/blauem Punkt).
- **Keine zwei nebeneinanderstehenden Header-Buttons** (gefüllt + umrandet).
  Ein klarer Hauptbutton reicht.
- **Keine Standardschrift wie Inter oder system-ui als bewusste Design-Entscheidung.**
  Eigene Schrift wählen, die zur Marke passt. Gute Optionen: DM Sans, Axiforma,
  SF Pro, Geist, Plus Jakarta Sans, Montserrat, Unbounded.
- **Kein animiertes Scroll-/Mausrad-Symbol** am unteren Bildschirmrand.
- **Keine austauschbaren Standardkarten** (dünner heller Rand, stark gerundete
  Ecken, weicher Schatten – überall gleich). Rahmen, Rundungen und Größen variieren.
- **Kein "Icon-in-Kachel"-Dreierlayout** (Icon im Quadrat, darunter Titel + Text,
  dreimal nebeneinander). Stattdessen Fotos, Illustrationen oder unterschiedlich
  große Bereiche einsetzen – passt ohnehin besser zu einer Foto-Website.
- **Kein dunkler Hintergrund mit verwaschenen Glow-Flecken** (lila/blau/türkis).
- **Kein Verlaufstext** in Überschriften zur Hervorhebung einzelner Wörter.
- **Keine reinen Tailwind-Standardfarben** (Standardblau/-Indigo, ungefärbtes
  Grau) ohne eigene Markenfarbe. `#2563eb` (Tailwind blue-600) ist aktuell in
  `app/assets/css/main.css` als `--primary-color` gesetzt und sollte durch eine
  eigene Markenfarbe ersetzt werden.
- **Nicht alles zentriert ausrichten.** Layouts mit bewusster Asymmetrie/Spannung
  gestalten.
- **Typische KI-Floskeln vermeiden:** "Entdecke", "Nahtlos", "Revolutionieren",
  "Auf das nächste Level bringen", "Maßgeschneiderte Lösungen".
- **Keine erzwungenen Dreierlisten** für Aufzählungen.
- **Gedankenstriche und "Nicht nur X, sondern Y"-Konstruktionen vermeiden.**
- **Barrierefreiheit nicht vergessen:** Alt-Texte für alle Bilder, ausreichender
  Kontrast (kein hellgraues auf weißem Text).

## UI/UX-Grundsätze

- Bevorzugte Schriften: DM Sans, Axiforma, SF Pro, Geist, Plus Jakarta Sans,
  Montserrat, Unbounded.
- Padding: vertikal ca. doppelt so groß wie horizontal.
- Soft Shadows: Schattenfarbe an die Hintergrundfarbe angleichen, nicht
  Standard-Schwarz.

## Technische Qualitätskriterien

- **Google Fonts lokal einbinden**, nicht per `<link>` von `fonts.googleapis.com`
  laden (Datenschutz, LG München 2022, kürzere Ladezeit). Dafür `@nuxt/fonts`
  nutzen. Icons als Inline-SVG statt Icon-Fonts.
- **Cookie-Banner** einplanen, sobald Tracking oder eingebettete Dienste
  (z. B. Google Maps) genutzt werden. Bei Maps/Videos reicht oft Klick-vor-Laden.
- **Performance:** Bilder komprimieren, `srcset`/`sizes` nutzen (`@nuxt/image`),
  Above-the-fold-Inhalte priorisieren, Caching, minimierter Code.
- **Sicherheit:** HTTPS, aktuelle Abhängigkeiten, Schutz von Formularen vor Spam/Malware.
- **Neutrale statt reine Farben:** kein reines Schwarz (`#000`)/Grau. Textfarbe
  z. B. `#1a1a1f` statt Schwarz, Grautöne mit leichtem Marken-Farbstich.
- **Verschachtelte Rundungen berechnen:** innere Rundung = äußere Rundung minus
  Innenabstand.
- **Optischer statt mathematischer Ausgleich** bei Icons in Buttons, Play-Symbolen,
  Pfeilen – ggf. 1–2px von Hand nachjustieren.
- **Mehrschichtige, getönte Schatten** (2–3 Ebenen, geringe Deckkraft, in
  Hintergrundfarbe statt Schwarz) statt einem einzelnen Standard-Schatten.
- **Feine Kontur an Bildern** (1px Rand, niedrige Deckkraft) gegen Ausfransen
  heller Bilder auf hellem Hintergrund.
- **Fließende Schriftgrößen** mit `clamp()`.
- **Überschriften ausbalancieren:** `text-wrap: balance` für Headlines,
  `text-wrap: pretty` für Fließtext.
- **Deutsche Besonderheiten:** `lang="de"` setzen, `hyphens: auto` für lange
  Wörter, deutsche Anführungszeichen („so"), geschütztes Leerzeichen zwischen
  Zahl und Einheit (`10&nbsp;km`), Halbgeviertstrich bei Bereichen.
- **Variable Fonts** nutzen statt mehrerer Schriftschnitt-Dateien.
- **Fallback-Schrift angleichen** (`size-adjust`), `@nuxt/fonts` übernimmt das
  größtenteils automatisch.
- **Alle Zustände gestalten:** Hover, Fokus, Aktiv, Deaktiviert, Ladezustand,
  Fehler, Leerzustand.
- **Formulare für Mobilgeräte optimieren:** korrekte `type`-Attribute (`email`,
  `tel`), `autocomplete`, `inputmode`, Labels immer sichtbar (nicht nur Placeholder).
- **Drittanbieter-Inhalte** (Google Maps, YouTube, Chat-Widgets) erst nach Klick
  laden (Vorschaubild + Klickfläche).
- **Eigene 404-Seite** mit Link zur Startseite, idealerweise mit Suchfunktion.
