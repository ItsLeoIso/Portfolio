# Leandro Sinatra — Fotografie

Portfolio für Architektur-, Landschafts- und Wildlife-Fotografie: [itsleoiso.ch](https://itsleoiso.ch).

## Seiten

- `index.html` — Startseite, ausgewählte Arbeiten, Projektübersicht, Über und Kontakt.
- `projekte.html` — Projektserien und fotografische Geschichten. Die bisherige URL `Projekte.html` bleibt als kompatibler Einstieg erhalten.
- `100.html` — Wochenarchiv „Archiv · 100“.

## Technik

- Statische HTML-, CSS- und JavaScript-Seiten; kein Build-Schritt und keine Framework-Abhängigkeiten.
- Fotografien liegen im Ordner `Arbeiten/` und werden als WebP ausgeliefert.
- Switzer wird über Fontshare geladen. Für Metadaten wird eine Monospace-Schrift mit lokalen System-Fallbacks verwendet.
- Die Website wird über GitHub Pages mit der benutzerdefinierten Domain `itsleoiso.ch` veröffentlicht.

## Lokal prüfen

1. Repository klonen oder herunterladen.
2. Im Projektordner einen lokalen statischen HTTP-Server starten, zum Beispiel `python3 -m http.server 8000`.
3. `http://localhost:8000/` öffnen und die Startseite, `projekte.html` und `100.html` auf Desktop- und Mobilbreiten prüfen.

## Bilder ergänzen oder ändern

- Bestehende Bilddateien nicht umbenennen, ohne alle HTML-Referenzen zu aktualisieren.
- Dateinamen klein und beschreibend mit Bindestrichen schreiben, z. B. `grey-heron-la-sauge.webp`.
- Für jedes informative Foto einen sachlichen deutschen `alt`-Text verwenden; dekorative Bilder erhalten `alt=""`.
- Bildtitel, Ort und Index in der Bildunterschrift konsistent halten.
- Keine EXIF-Werte ergänzen, sofern sie nicht aus den Originaldateien verifiziert wurden.

## Vor einer Veröffentlichung prüfen

- Interne Links und Bildpfade auf fehlende Dateien kontrollieren.
- Navigation, Lightbox (Maus, Tastatur und Touch), Fokusführung und reduzierte Bewegung testen.
- Desktop und Mobilgeräte visuell prüfen; anschliessend Lighthouse bzw. Core Web Vitals messen.
- Die Kontaktadresse bleibt `itsleo.iso.contact@gmail.com`, bis eine Domain-Adresse eingerichtet und getestet wurde.
