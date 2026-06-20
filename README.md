# Nagelstudio-/Beauty-Template

Statisches, elegantes Studio-Template (HTML/CSS/JS, kein Build-Tool). Demo-Daten: **Luna Nails & Beauty, Zürich**. Echtes lokales Studio-Gefühl, Termin per **Anfrage** (WhatsApp / Telefon / E-Mail) — keine Fake-Buchung.

## Daten ändern — nur an EINER Stelle
Alle Studio-Daten stehen im `STUDIO`-Objekt oben in **`script.js`**:

```js
const STUDIO = {
  name: 'Luna Nails & Beauty',
  tagline: 'Nägel · Wimpern · Pflege',
  city: 'Zürich',
  street: 'Bahnhofstrasse 12',
  zip: '8001 Zürich',
  phone: '+41 78 123 45 67',
  phoneRaw: '+41781234567',
  email: 'hello@lunanails.ch',
  whatsapp: '41781234567',
  instagram: '…', facebook: '…',
  hours: ['Mo–Fr: 09:00–19:00', 'Sa: 09:00–16:00', 'So: geschlossen'],
};
```

JS füllt damit automatisch: Logo, Adresse, Telefon, E-Mail, Öffnungszeiten, Social-Links,
die Google-Map (echte Adresse) und alle WhatsApp-Anfrage-Links (inkl. vorausgefülltem Text
pro Behandlung). Fliesstexte (Über uns, Warum wir, Leistungen) stehen direkt im `index.html`.

## Termin (Calendly)
Der Termin-Bereich bettet **Calendly** ein (echte Buchung mit Bestätigung).
1. In Calendly den Event-Typ passend benennen, z. B. **Beauty-Termin (30 Min.)**.
2. Als Ort die Studioadresse statt einer Webkonferenz wählen und die Verfügbarkeit eintragen.
3. Deinen Calendly-Link kopieren (`https://calendly.com/dein-name/dein-event`).
4. In `script.js` bei `STUDIO.calendly` einsetzen — fertig, der Kalender erscheint.

Darunter als Fallback: WhatsApp / Anrufen / E-Mail. Kein Backend nötig.

## Bilder
Stock (Unsplash) als Platzhalter, kuratiert auf Nägel/Wimpern/Pflege ohne Fremd-Branding.
Pro echtem Studio durch eigene Fotos ersetzen (`src` der `<img>`-Tags).

## Vor Live-Gang
- Eigene Fotos einsetzen, Social-Links + echte Cal-/Telefon-/Mail-Daten in `script.js`.
- Impressum/Datenschutz prüfen (Inhaberin-Name, ggf. UID ergänzen).

## Lokal ansehen
```
python -m http.server 8088
```
→ http://localhost:8088/

## Projektgraph (Graphify)

Der aktuelle strukturelle Codegraph liegt unter `graphify-out/`:

- `graph.html` — interaktive Ansicht
- `GRAPH_REPORT.md` — kompakter Architekturbericht
- `graph.json` — maschinenlesbarer Graph

Aktualisieren:

```bash
graphify update . --no-cluster
graphify cluster-only .
```
