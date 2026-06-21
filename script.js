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
  // Behandlungen für die Termin-Anfrage. Hinzufügen = eine Zeile ergänzen.
  services: [
    'Maniküre',
    'Gel-Nägel',
    'Acrylnägel',
    'Auffüllen',
    'Wimpern (Lifting / Extensions)',
    'Augenbrauen / Microblading',
    'Pflege & Waxing',
    'Beratung',
  ],
  // Kosmetikerinnen. Mitarbeiterin hinzufügen = einfach eine Zeile ergänzen.
  staff: [
    { name: 'Sara',  role: 'Nägel & Gel' },
    { name: 'Elena', role: 'Wimpern & Brows' },
    { name: 'Nora',  role: 'Pflege & Waxing' },
  ],
};

const pad = n => String(n).padStart(2, '0');
const todayISO = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };

// Selbst-enthaltene Termin-Anfrage: Behandlung + Kosmetikerin + Wunschtermin
// + Kontakt → fertige WhatsApp-Nachricht ans Studio. Kein Backend, kein Konto.
function buildBooking() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  // Behandlungen befüllen
  const service = document.getElementById('bk-service');
  if (service) STUDIO.services.forEach(s => {
    const o = document.createElement('option');
    o.value = s; o.textContent = s;
    service.append(o);
  });

  // Kosmetikerinnen befüllen ("Egal" bleibt als erste Option im HTML)
  const staff = document.getElementById('bk-staff');
  if (staff) STUDIO.staff.forEach(p => {
    const o = document.createElement('option');
    o.value = p.name;
    o.textContent = p.role ? `${p.name} — ${p.role}` : p.name;
    staff.append(o);
  });

  // Zeit-Slots 09:00–18:30 in 30-Min-Schritten
  const time = document.getElementById('bk-time');
  if (time) for (let h = 9; h <= 18; h++) for (const m of ['00', '30']) {
    const t = `${pad(h)}:${m}`;
    const o = document.createElement('option');
    o.value = t; o.textContent = t;
    time.append(o);
  }

  // Datum frühestens heute (lokal gerechnet → kein Zeitzonen-Versatz)
  const date = document.getElementById('bk-date');
  if (date) date.min = todayISO();

  form.addEventListener('submit', event => {
    event.preventDefault();
    const val = id => (document.getElementById(id)?.value || '').trim();
    const iso = val('bk-date');
    const datePretty = iso ? iso.split('-').reverse().join('.') : '';
    const message = [
      `Hallo ${STUDIO.name}, ich möchte gerne einen Termin anfragen:`,
      `• Behandlung: ${val('bk-service')}`,
      `• Kosmetikerin: ${val('bk-staff') || 'egal, wer frei ist'}`,
      `• Wunschtermin: ${`${datePretty} ${val('bk-time')}`.trim()}`,
      `• Name: ${val('bk-name')}`,
      `• Telefon: ${val('bk-phone')}`,
    ].join('\n');
    window.open(`https://wa.me/${STUDIO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
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
  buildBooking();
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
