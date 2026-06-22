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

test('setupSetmore embeds the booking page and wires the fallback link', () => {
  const frameChildren = [];
  const fallback = { href: '' };
  const frame = { replaceChildren(...nodes) { frameChildren.push(...nodes); } };
  const iframe = { setAttribute() {} };
  const elements = { 'setmore-frame': frame, 'setmore-fallback': fallback };

  const context = vm.createContext({
    document: {
      addEventListener() {},
      getElementById(id) { return elements[id] ?? null; },
      createElement() { return iframe; },
    },
    window: {},
    setTimeout,
    clearTimeout,
  });
  vm.runInContext(script, context);
  context.setupSetmore();

  // Ersatzlink zeigt auf die Setmore-Buchungsseite.
  assert.match(fallback.href, /\.setmore\.com/);
  // Genau ein iframe mit Setmore-URL und zugänglichem Titel wurde eingebettet.
  assert.equal(frameChildren.length, 1);
  assert.match(iframe.src, /\.setmore\.com/);
  assert.match(iframe.title, /Online-Terminbuchung/);
});
