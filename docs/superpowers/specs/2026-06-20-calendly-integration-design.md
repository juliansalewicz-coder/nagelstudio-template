# Calendly-Integration

## Ziel

Kundinnen sollen freie Termine direkt auf der Website sehen und buchen können, ohne die Website verlassen zu müssen. Die Integration verwendet den bestehenden Calendly-Termin unter `https://calendly.com/julian-salewicz/30min`.

## Gewählte Lösung

Calendly wird als Inline-Kalender im bestehenden Abschnitt `#termin` eingebettet. Diese Variante hält den Buchungsweg kurz, funktioniert auf Desktop und Mobilgeräten und lässt die Kundin im visuellen Kontext des Studios.

## Verhalten

- Alle Termin-Buttons führen zum Abschnitt `#termin`.
- Der Calendly-Kalender wird mit den bestehenden Studiofarben konfiguriert.
- Das Widget passt sich an schmale und breite Viewports an.
- WhatsApp, Telefon und E-Mail bleiben als alternative Kontaktwege sichtbar.
- Falls das externe Widget nicht geladen werden kann, erscheint ein verständlicher Hinweis mit einem direkten Link zur Calendly-Buchungsseite.
- Der direkte Calendly-Link öffnet sicher in einem neuen Tab.

## Technische Grenzen

Calendly bleibt ein externer Dienst. Verfügbarkeit, Bestätigungs-E-Mails, Zeitzonen und Terminverwaltung werden im Calendly-Konto konfiguriert. Die Website selbst benötigt dafür kein Backend.

## Verifikation

- Der Calendly-Endpunkt antwortet erfolgreich.
- Der konfigurierte Link wird korrekt in das Widget übernommen.
- Das externe Widget-Skript wird geladen.
- Alle internen Termin-Links zeigen auf `#termin`.
- Der Fallback ist ohne Calendly-Skript bedienbar.
- Die Buchungssektion bleibt auf typischen Mobil- und Desktopbreiten nutzbar.
