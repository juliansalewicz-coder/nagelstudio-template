// ─────────────────────────────────────────────────────────────
//  ZENTRALE STUDIO-DATEN — nur hier ändern.
// ─────────────────────────────────────────────────────────────
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
  instagram: 'https://instagram.com/lunanails',
  facebook: 'https://facebook.com/lunanails',
  hours: ['Mo–Fr: 09:00–19:00', 'Sa: 09:00–16:00', 'So: geschlossen'],
  // Fallback-Calendly-Link (wird genutzt, wenn staff leer ist).
  calendly: 'https://calendly.com/julian-salewicz/30min',
  // Personen-Auswahl auf der Seite braucht je ein eigenes Calendly-Event
  // (Calendly Standard, $10/Mt). Aktuell LEER → ein Termin-Button; die Person
  // wählt die Kundin per Dropdown-Frage IN Calendly (gratis). Zum Aktivieren:
  //   { name: 'Anna', role: 'Nägel & Gel', calendly: 'https://calendly.com/dein-name/anna' },
  staff: [],
};

const CALENDLY_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';

// Calendly-Link mit Studio-Theme (Taupe-Farben, Detail-Panel aus).
function calendlyUrl(link) {
  const theme = 'hide_event_type_details=1&primary_color=9c7b5b&background_color=f6f3ee&text_color=322b25';
  const sep = link.includes('?') ? '&' : '?';
  return link + sep + theme;
}

function calendlyReady(link) {
  return Boolean(link) && !link.includes('DEIN-CALENDLY-LINK');
}

// widget.js nur einmal laden (egal wie viele Buttons).
function loadCalendlyOnce() {
  if (document.querySelector(`script[src="${CALENDLY_SCRIPT_SRC}"]`)) return;
  const calScript = document.createElement('script');
  calScript.src = CALENDLY_SCRIPT_SRC;
  calScript.async = true;
  document.head.append(calScript);
}

// Öffnet Calendly als Popup-Overlay; ohne JS bleibt der Link normal (neuer Tab).
function bindPopup(anchor, link) {
  anchor.href = calendlyUrl(link);
  anchor.addEventListener('click', event => {
    if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
      event.preventDefault();
      window.Calendly.initPopupWidget({ url: calendlyUrl(link) });
    }
  });
}

// Pro Kosmetikerin eine Karte mit eigenem Termin-Button. Gibt true zurück,
// wenn mindestens eine gültige Person gerendert wurde.
function renderStaff(list) {
  const wrap = document.getElementById('staff-list');
  if (!wrap) return false;
  const valid = (list || []).filter(p => calendlyReady(p.calendly));
  if (!valid.length) return false;

  wrap.replaceChildren(...valid.map(p => {
    const card = document.createElement('div');
    card.className = 'staff-card';

    const name = document.createElement('h3');
    name.className = 'staff-name';
    name.textContent = p.name;

    const role = document.createElement('p');
    role.className = 'staff-role';
    role.textContent = p.role || '';

    const btn = document.createElement('a');
    btn.className = 'btn';
    btn.textContent = 'Termin buchen';
    btn.target = '_blank';
    btn.rel = 'noopener';
    bindPopup(btn, p.calendly);

    card.append(name, role, btn);
    return card;
  }));
  return true;
}

// Booking-Bereich: mehrere Personen → Auswahl-Karten; sonst ein Button.
function setupBooking() {
  const single = document.getElementById('cal-popup');
  const staffBlock = document.getElementById('staff-block');
  const orLine = document.getElementById('booking-or-line');

  const hasStaff = Array.isArray(STUDIO.staff) && renderStaff(STUDIO.staff);

  if (hasStaff) {
    if (single) single.hidden = true;
    loadCalendlyOnce();
    return;
  }

  if (staffBlock) staffBlock.hidden = true;
  if (single && calendlyReady(STUDIO.calendly)) {
    bindPopup(single, STUDIO.calendly);
    loadCalendlyOnce();
  } else {
    if (single) single.hidden = true;
    if (orLine) orLine.hidden = true;
  }
}

function bind() {
  const set = (sel, val) => document.querySelectorAll(sel).forEach(e => { e.textContent = val; });
  set('[data-f="name"]', STUDIO.name);
  set('[data-f="tagline"]', STUDIO.tagline.toUpperCase());
  set('[data-f="city"]', STUDIO.city);
  set('[data-f="street"]', STUDIO.street);
  set('[data-f="zip"]', STUDIO.zip);
  set('[data-f="phone"]', STUDIO.phone);
  set('[data-f="email"]', STUDIO.email);
  document.querySelectorAll('[data-tel]').forEach(a => { a.href = 'tel:' + STUDIO.phoneRaw; });
  document.querySelectorAll('[data-mail]').forEach(a => { a.href = 'mailto:' + STUDIO.email; });
  document.querySelectorAll('[data-ig]').forEach(a => { a.href = STUDIO.instagram; });
  document.querySelectorAll('[data-fb]').forEach(a => { a.href = STUDIO.facebook; });
  document.querySelectorAll('[data-wa]').forEach(a => {
    a.href = `https://wa.me/${STUDIO.whatsapp}?text=` + encodeURIComponent(
      `Hallo ${STUDIO.name}, ich möchte gerne einen Termin anfragen. Wann wäre etwas frei?`);
  });
  document.querySelectorAll('[data-hours]').forEach(box => {
    const rows = STUDIO.hours.map(hour => {
      const span = document.createElement('span');
      span.textContent = hour;
      return span;
    });
    box.replaceChildren(...rows);
  });
  const map = document.querySelector('#map-frame');
  if (map) map.src = `https://maps.google.com/maps?q=${encodeURIComponent(STUDIO.street + ', ' + STUDIO.zip)}&z=15&output=embed`;

  setupBooking();
}

function imageFallbacks() {
  document.querySelectorAll('img').forEach(img => {
    const markBroken = () => img.classList.add('img-ph');
    if (img.complete && img.naturalWidth === 0) markBroken();
    else img.addEventListener('error', markBroken, { once: true });
  });
}

function nav() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  const setOpen = open => {
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
  };

  toggle.addEventListener('click', () => setOpen(!links.classList.contains('open')));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setOpen(false);
  });
}

document.addEventListener('DOMContentLoaded', () => { imageFallbacks(); bind(); nav(); });
