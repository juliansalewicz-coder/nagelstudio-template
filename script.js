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
  // Dein Calendly-Link (Account auf calendly.com anlegen, Event-Typ erstellen, Link hier einsetzen):
  calendly: 'https://calendly.com/julian-salewicz/30min',
};

const CALENDLY_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';
const CALENDLY_LOAD_TIMEOUT_MS = 12000;

function showCalendlyFallback(cal) {
  cal.hidden = true;
  cal.setAttribute('aria-busy', 'false');

  const status = document.getElementById('cal-status');
  if (status) {
    status.textContent = 'Kalender konnte nicht geladen werden.';
    status.classList.add('is-error');
  }

  const note = document.getElementById('cal-fallback-note');
  if (note) note.hidden = false;
}

function watchCalendlyWidget(cal) {
  let timeoutId;
  let watchedIframe;
  let settled = false;

  const markReady = () => {
    if (settled) return;
    settled = true;
    clearTimeout(timeoutId);
    observer.disconnect();
    cal.setAttribute('aria-busy', 'false');
    const status = document.getElementById('cal-status');
    if (status) status.hidden = true;
  };

  const watchIframe = () => {
    const iframe = cal.querySelector('iframe');
    if (!iframe || iframe === watchedIframe) return;
    watchedIframe = iframe;
    iframe.addEventListener('load', markReady, { once: true });
  };

  const observer = new MutationObserver(watchIframe);

  observer.observe(cal, { childList: true, subtree: true });
  watchIframe();
  timeoutId = setTimeout(() => {
    if (settled) return;
    settled = true;
    observer.disconnect();
    watchedIframe?.removeEventListener('load', markReady);
    showCalendlyFallback(cal);
  }, CALENDLY_LOAD_TIMEOUT_MS);

  return () => {
    settled = true;
    clearTimeout(timeoutId);
    observer.disconnect();
    watchedIframe?.removeEventListener('load', markReady);
  };
}

function loadCalendlyScript(cal) {
  const stopWatching = watchCalendlyWidget(cal);
  const calScript = document.createElement('script');
  calScript.src = CALENDLY_SCRIPT_SRC;
  calScript.async = true;
  calScript.onerror = () => {
    stopWatching();
    showCalendlyFallback(cal);
  };
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

  // Erst Widget konfigurieren, dann Calendly laden. So kann das externe Skript
  // nicht vor der fertigen data-url starten.
  const cal = document.getElementById('calendly');
  const calDirect = document.getElementById('cal-direct');
  const calReady = STUDIO.calendly && !STUDIO.calendly.includes('DEIN-CALENDLY-LINK');
  if (calDirect && calReady) calDirect.href = STUDIO.calendly;
  if (cal) {
    if (calReady) {
      const theme = 'hide_event_type_details=1&primary_color=9c7b5b&background_color=f6f3ee&text_color=322b25';
      const sep = STUDIO.calendly.includes('?') ? '&' : '?';
      cal.setAttribute('data-url', STUDIO.calendly + sep + theme);
      cal.setAttribute('aria-busy', 'true');
      loadCalendlyScript(cal);
    } else {
      showCalendlyFallback(cal);
      if (calDirect) calDirect.hidden = true;
      const orLine = document.getElementById('booking-or-line');
      if (orLine) orLine.hidden = true;
    }
  }
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
