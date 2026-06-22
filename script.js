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
  // Öffentlicher Setmore-Buchungslink. Dienstleistungen, Mitarbeiter, Zeiten
  // und Bestätigungen verwaltet das Studio direkt im Setmore-Konto.
  setmore: 'https://julian1bu6.setmore.com',
};

// Setmore-Buchungsseite als responsives iframe einbetten. Setmore übernimmt
// Dienstleistung, Mitarbeiter, Verfügbarkeit, Termin, Kontakt und Bestätigung.
function setupSetmore() {
  const link = STUDIO.setmore;
  const ready = typeof link === 'string' && /^https:\/\/[^ "']+\.setmore\.com/.test(link);

  const fallback = document.getElementById('setmore-fallback');
  if (fallback && ready) fallback.href = link;

  const frame = document.getElementById('setmore-frame');
  if (frame && ready) {
    const iframe = document.createElement('iframe');
    iframe.src = link;
    iframe.title = `Online-Terminbuchung — ${STUDIO.name}`;
    iframe.loading = 'lazy';
    iframe.setAttribute('allow', 'payment');
    frame.replaceChildren(iframe);
  }

  // Ohne gültigen Link: Buchungs-Embed ausblenden, Kontaktwege bleiben sichtbar.
  if (!ready) document.getElementById('setmore-embed')?.setAttribute('hidden', '');
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
  setupMapConsent();
  setupSetmore();
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
