// ─────────────────────────────────────────────────────────────
//  ZENTRALE STUDIO-DATEN — nur hier ändern.
// ─────────────────────────────────────────────────────────────
const STUDIO = {
  name: 'Luna Nails & Beauty',
  owner: 'Lara Meier',
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
  areaNote: 'Zentral in Zürich · gut mit ÖV erreichbar',
  hours: ['Mo–Fr: 09:00–19:00', 'Sa: 09:00–16:00', 'So: geschlossen'],
  // Dein Calendly-Link. In Calendly die Zeitzone (Europe/Zurich) und die
  // Verfügbarkeit setzen — dann erscheinen hier die freien Termine.
  calendly: 'https://calendly.com/julian-salewicz/30min',

  // <title> und Meta-Description der Startseite.
  metaTitle: 'Luna Nails & Beauty — Nagelstudio in Zürich | Nägel, Wimpern & Pflege',
  metaDescription: 'Luna Nails & Beauty in Zürich: saubere Maniküre, Gel-Nägel, Wimpern, Microblading und Pflege in ruhiger Atmosphäre. Termin online buchen oder per WhatsApp anfragen.',

  // Alle Bilder zentral. Für einen neuen Kunden hier die URLs durch dessen
  // eigene Fotos ersetzen — die Seite zieht sie automatisch.
  images: {
    hero: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=75',
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=600&q=75',
      'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&q=75',
      'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&q=75',
      'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=75',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=75',
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=601&q=75',
      'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=601&q=75',
    ],
    about1: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=600&q=80',
    about2: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=700&q=80',
    service1: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&q=80',
    service2: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80',
    service3: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    why: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=700&q=80',
    cta: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=1600&q=80',
  },

  // Preisliste. Pro Karte: Titel, Einträge ({name, sub?, price}), optionale Notiz.
  prices: [
    { title: 'Acrylnägel', items: [
      { name: 'Full Set Acryl', price: '75' },
      { name: 'Naturnagel-Overlay', price: '65' },
      { name: 'Auffüllen', price: '55' },
      { name: 'French / Pink & White', price: '70' },
    ] },
    { title: 'Gel-Nägel', items: [
      { name: 'Gel-Maniküre', price: '55' },
      { name: 'Gel mit Builder', price: '60' },
      { name: 'Jellie Nail Tips', price: '70' },
      { name: 'Gel Pediküre', price: '45' },
    ] },
    { title: 'Wimpern', note: 'Patch-Test vor jeder Wimpernbehandlung nötig.', items: [
      { name: 'Full Set Wimpern', price: '90' },
      { name: 'Auffüllen (2 Wochen)', price: '45' },
      { name: 'Auffüllen (3 Wochen)', price: '55' },
      { name: 'Cluster-Wimpern', price: '35' },
    ] },
    { title: 'Microblading', items: [
      { name: 'Augenbrauen komplett', sub: 'inkl. Nachbehandlung 4–6 Wochen', price: '450' },
      { name: 'Colour Boost', sub: 'Auffrischung bestehender Brows', price: '180' },
    ] },
    { title: 'Waxing', items: [
      { name: 'Augenbrauen', price: '15' },
      { name: 'Lippe & Kinn', price: '12' },
      { name: 'Achseln', price: '18' },
      { name: 'Beine komplett', price: '35' },
    ] },
    { title: 'Färben', items: [
      { name: 'Augenbrauen färben', price: '15' },
      { name: 'Wimpern färben', price: '18' },
      { name: 'Brow Lamination', price: '45' },
    ] },
    { title: 'Gesicht & Pflege', items: [
      { name: 'Gesichtsbehandlung — 1 Std.', sub: 'inkl. Kopf-, Nacken- & Handmassage', price: '90' },
      { name: 'Handpflege', sub: 'Peeling + Massage', price: '25' },
      { name: 'Fusspflege', sub: 'Peeling + Massage', price: '25' },
      { name: 'Pediküre', price: '55' },
    ] },
  ],
};

const CALENDLY_SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';

// Calendly-Link mit Studio-Theme (Taupe-Farben, Detail-Panel aus).
function calendlyUrl(link) {
  const theme = 'hide_event_type_details=1&hide_gdpr_banner=1&primary_color=9c7b5b&background_color=ffffff&text_color=322b25';
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

// <title> und Meta-Description aus der Config setzen.
function applyMeta() {
  // Rechtsseiten (Impressum/Datenschutz): Titel aus Überschrift + Studioname.
  const legal = document.querySelector('main.legal h1');
  if (legal) { document.title = `${legal.textContent} | ${STUDIO.name}`; return; }
  // Nur Startseite (hat den Hero).
  if (!document.querySelector('section.hero')) return;
  if (STUDIO.metaTitle) document.title = STUDIO.metaTitle;
  if (STUDIO.metaDescription) {
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', STUDIO.metaDescription);
  }
}

// Bild-URLs aus STUDIO.images in die <img data-img="…"> setzen. Galerie der Reihe nach.
function applyImages() {
  const img = STUDIO.images;
  if (!img) return;
  ['hero', 'about1', 'about2', 'service1', 'service2', 'service3', 'why', 'cta'].forEach(key => {
    if (!img[key]) return;
    document.querySelectorAll(`[data-img="${key}"]`).forEach(el => { el.src = img[key]; });
  });
  if (Array.isArray(img.gallery)) {
    document.querySelectorAll('[data-img="gallery"]').forEach((el, i) => {
      if (img.gallery[i]) el.src = img.gallery[i];
    });
  }
}

// Preiskarten aus STUDIO.prices rendern (DOM-Bau statt innerHTML).
function renderPrices() {
  const grid = document.querySelector('.price-grid');
  if (!grid || !Array.isArray(STUDIO.prices)) return;
  const cards = STUDIO.prices.map(card => {
    const wrap = document.createElement('div');
    wrap.className = 'price-card';
    const h3 = document.createElement('h3');
    h3.textContent = card.title;
    wrap.append(h3);
    const ul = document.createElement('ul');
    card.items.forEach(item => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = item.name;
      if (item.sub) {
        const em = document.createElement('em');
        em.textContent = item.sub;
        span.append(' ', em);
      }
      const b = document.createElement('b');
      b.textContent = item.price;
      li.append(span, b);
      ul.append(li);
    });
    wrap.append(ul);
    if (card.note) {
      const note = document.createElement('p');
      note.className = 'price-note';
      note.textContent = card.note;
      wrap.append(note);
    }
    return wrap;
  });
  grid.replaceChildren(...cards);
}

function bind() {
  const set = (sel, val) => document.querySelectorAll(sel).forEach(e => { e.textContent = val; });
  set('[data-f="name"]', STUDIO.name);
  set('[data-f="owner"]', STUDIO.owner);
  set('[data-f="tagline"]', STUDIO.tagline.toUpperCase());
  set('[data-f="city"]', STUDIO.city);
  set('[data-f="street"]', STUDIO.street);
  set('[data-f="zip"]', STUDIO.zip);
  set('[data-f="phone"]', STUDIO.phone);
  set('[data-f="email"]', STUDIO.email);
  set('[data-f="areaNote"]', STUDIO.areaNote);
  applyMeta();
  applyImages();
  renderPrices();
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
