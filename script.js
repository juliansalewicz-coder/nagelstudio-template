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
  // Dein Calendly-Link. In Calendly die Zeitzone (Europe/Zurich) und die
  // Verfügbarkeit setzen — dann erscheinen hier die freien Termine.
  calendly: 'https://calendly.com/julian-salewicz/30min',
};

const CALENDLY_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';

// Calendly-Link mit Studio-Theme (Taupe-Farben, Detail-Panel aus).
function calendlyUrl(link) {
  const theme = 'hide_event_type_details=1&primary_color=9c7b5b&background_color=f6f3ee&text_color=322b25';
  const sep = link.includes('?') ? '&' : '?';
  return link + sep + theme;
}

function calendlyReady(link) {
  return typeof link === 'string' && /^https:\/\/calendly\.com\//.test(link);
}

// Calendly als Inline-Kalender direkt auf der Seite. widget.js rendert jeden
// .calendly-inline-widget mit data-url automatisch. Ersatzlink bleibt als Fallback.
function setupCalendlyInline() {
  const fallback = document.getElementById('cal-fallback');
  if (fallback) fallback.href = STUDIO.calendly;

  const wrap = document.getElementById('calendly');
  if (!wrap || !calendlyReady(STUDIO.calendly)) return;

  wrap.setAttribute('data-url', calendlyUrl(STUDIO.calendly));

  const calScript = document.createElement('script');
  calScript.src = CALENDLY_SCRIPT_SRC;
  calScript.async = true;
  document.head.append(calScript);
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
  const route = document.getElementById('route-link');
  if (route) route.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STUDIO.street + ', ' + STUDIO.zip)}`;
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
  setupMapConsent();
  setupCalendlyInline();
}

// Google Maps erst nach aktivem Klick laden (kein Daten­abfluss ohne Einwilligung).
function setupMapConsent() {
  const wrap = document.getElementById('map-frame');
  const btn = document.getElementById('map-load');
  if (!wrap || !btn) return;
  btn.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = `https://maps.google.com/maps?q=${encodeURIComponent(STUDIO.street + ', ' + STUDIO.zip)}&z=15&output=embed`;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.title = `Standort ${STUDIO.name}`;
    wrap.replaceChildren(iframe);
  });
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
