import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const read = path => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const [index, impressum, datenschutz, script, styles] = await Promise.all([
  read('index.html'),
  read('impressum.html'),
  read('datenschutz.html'),
  read('script.js'),
  read('styles.css'),
]);

const pages = { index, impressum, datenschutz };

test('every HTML page declares a restrictive CSP', () => {
  for (const [name, html] of Object.entries(pages)) {
    assert.match(html, /http-equiv="Content-Security-Policy"/i, `${name} has no CSP`);
    const scriptPolicy = html.match(/script-src[^;]+/i)?.[0] ?? '';
    assert.match(scriptPolicy, /'self'/, `${name} does not allow local scripts`);
    assert.doesNotMatch(scriptPolicy, /'unsafe-inline'/, `${name} allows inline scripts`);
  }
});

test('markup contains no inline event handlers', () => {
  for (const [name, html] of Object.entries(pages)) {
    assert.doesNotMatch(html, /\son[a-z]+\s*=/i, `${name} contains an inline event handler`);
  }
});

test('contact actions have static no-JavaScript fallbacks', () => {
  assert.match(index, /<a[^>]+href="https:\/\/wa\.me\/41781234567[^>]+data-wa/);
  assert.match(index, /<a[^>]+href="tel:\+41781234567"[^>]+data-tel/);
  assert.match(index, /<a[^>]+href="mailto:hello@lunanails\.ch"[^>]+data-mail/);
  assert.match(index, /<a[^>]+href="https:\/\/instagram\.com\/lunanails"[^>]+data-ig/);
  assert.match(index, /<a[^>]+href="https:\/\/facebook\.com\/lunanails"[^>]+data-fb/);
  assert.equal((index.match(/<p class="hours" data-hours>[\s\S]*?Mo–Fr:[\s\S]*?<\/p>/g) ?? []).length, 2);
});

test('all images reserve space and below-fold images load lazily', () => {
  const images = index.match(/<img\b[^>]*>/g) ?? [];
  assert.ok(images.length > 1, 'expected project images');
  for (const image of images) {
    assert.match(image, /\bwidth="\d+"/);
    assert.match(image, /\bheight="\d+"/);
    assert.match(image, /\bdecoding="async"/);
  }
  assert.match(images[0], /\bfetchpriority="high"/);
  for (const image of images.slice(1)) assert.match(image, /\bloading="lazy"/);
});

test('privacy copy names every remote service used by the page', () => {
  for (const service of ['Google Fonts', 'Unsplash', 'Google Maps', 'WhatsApp']) {
    assert.match(datenschutz, new RegExp(service, 'i'), `privacy copy omits ${service}`);
  }
});

test('JavaScript avoids HTML injection', () => {
  assert.doesNotMatch(script, /\.innerHTML\s*=/);
});

test('CSS respects reduced motion and contains no dead booking selectors', () => {
  assert.match(styles, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(styles, /scroll-behavior:\s*auto/);
  assert.match(styles, /\.row-a\s*\{[^}]*animation:\s*none/s);
  assert.doesNotMatch(styles, /\.bk-grid|\.bk-form|\.why-note/);
});

test('mobile navigation exposes its expanded state', () => {
  assert.match(index, /id="navToggle"[^>]+aria-controls="navLinks"[^>]+aria-expanded="false"/);
  assert.match(script, /setAttribute\('aria-expanded'/);
});

test('the booking form builds a prefilled WhatsApp request from its fields', () => {
  const values = {
    'bk-service': 'Gel-Nägel',
    'bk-staff': 'Sara',
    'bk-date': '2026-06-27',
    'bk-time': '14:00',
    'bk-name': 'Test Kundin',
    'bk-phone': '079 000 00 00',
  };
  const handlers = {};
  const fields = {};
  for (const [id, value] of Object.entries(values)) fields[id] = { value, min: '', append() {} };
  fields['booking-form'] = { addEventListener(type, fn) { handlers[type] = fn; } };

  let openedUrl = null;
  const context = vm.createContext({
    document: {
      addEventListener() {},
      getElementById(id) { return fields[id] ?? null; },
      createElement() { return {}; },
    },
    window: { open(url) { openedUrl = url; } },
    Date,
    setTimeout,
    clearTimeout,
  });
  vm.runInContext(script, context);
  context.buildBooking();

  assert.equal(typeof handlers.submit, 'function');
  handlers.submit({ preventDefault() {} });

  assert.match(openedUrl, /wa\.me\/41781234567/);
  const decoded = decodeURIComponent(openedUrl);
  assert.match(decoded, /Behandlung: Gel-Nägel/);
  assert.match(decoded, /Kosmetikerin: Sara/);
  assert.match(decoded, /27\.06\.2026 14:00/);
  assert.match(decoded, /Telefon: 079 000 00 00/);
});
