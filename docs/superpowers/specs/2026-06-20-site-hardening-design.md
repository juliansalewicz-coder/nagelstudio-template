# Site Hardening Design

## Ziel

Das statische Nail-Studio-Demo soll technisch robust, schneller, sicherer und barriereärmer werden. Die bestehenden Demo-Firmendaten bleiben unverändert.

## Umfang

- Eine restriktive, zur aktuellen Drittanbieter-Nutzung passende Content Security Policy wird in alle HTML-Seiten aufgenommen.
- Inline-Eventhandler werden entfernt, damit die CSP ohne `unsafe-inline` auskommt.
- Telefon, E-Mail, WhatsApp und Social-Links funktionieren bereits ohne JavaScript; JavaScript darf sie weiterhin aus `STUDIO` aktualisieren.
- Öffnungszeiten besitzen einen statischen HTML-Fallback und werden bei aktiviertem JavaScript sicher über DOM-Elemente statt `innerHTML` aktualisiert.
- Calendly bleibt direkt eingebettet. Sein eigener Datenschutzhinweis wird nicht unterdrückt; Laden, Timeout und Fehler-Fallback bleiben erhalten.
- Die Datenschutzerklärung nennt Calendly, Google Fonts und Unsplash als eingebundene Drittanbieter und dient weiterhin als zu prüfender Entwurf, nicht als Rechtsberatung.
- Das Hero-Bild wird priorisiert. Bilder unterhalb des sichtbaren Bereichs erhalten Lazy Loading, asynchrones Decoding und intrinsische Abmessungen.
- Endlosanimation und Smooth Scrolling respektieren `prefers-reduced-motion`.
- Die mobile Navigation pflegt `aria-expanded`, Beschriftung und Schliesszustand korrekt.
- Nicht verwendete Booking-CSS-Selektoren werden entfernt.
- Tests decken die neuen Sicherheits-, Fallback-, Performance- und Accessibility-Verträge ab.

## Nicht im Umfang

- Demo-Firmendaten werden nicht ersetzt.
- Der Calendly-Eventname und der Veranstaltungsort werden nicht im externen Calendly-Konto verändert.
- HSTS und weitere reine HTTP-Response-Header benötigen später eine konkrete Hosting-Plattform; die CSP im HTML bietet eine hostingunabhängige Grundhärtung.

## Erfolgskriterien

- JavaScript-Syntax und sämtliche Node-Tests bestehen.
- Die Seite enthält keine Inline-Eventhandler oder unsichere `innerHTML`-Dateneinfügung.
- Primäre Kontaktwege bleiben im statischen HTML nutzbar.
- Calendly lädt unter der CSP und zeigt bei Blockierung den Fallback.
- Desktop- und Mobilansicht bleiben ohne horizontalen Überlauf bedienbar.
- Reduzierte Bewegung deaktiviert Endlosanimation und Smooth Scrolling.
