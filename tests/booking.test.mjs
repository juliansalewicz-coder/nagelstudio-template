import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const script = await readFile(new URL('../script.js', import.meta.url), 'utf8');

test('uses the configured Calendly event', () => {
  assert.match(script, /calendly:\s*'https:\/\/calendly\.com\/julian-salewicz\/30min'/);
});

test('themes the embed with the studio colours and hides generic details', () => {
  assert.match(script, /primary_color=9c7b5b/);
  assert.match(script, /hide_event_type_details=1/);
});

test('embeds Calendly as an inline calendar with a config-driven data-url', () => {
  assert.match(html, /class="calendly-inline-widget" id="calendly"/);
  assert.match(script, /wrap\.setAttribute\('data-url'/);
});

test('loads the Calendly widget script dynamically, not inline in the HTML', () => {
  assert.doesNotMatch(html, /assets\.calendly\.com\/assets\/external\/widget\.js/);
  assert.match(script, /assets\.calendly\.com\/assets\/external\/widget\.js/);
});

test('a fallback link opens Calendly in a new tab', () => {
  assert.match(html, /id="cal-fallback"[^>]*target="_blank"[^>]*rel="noopener"/);
  assert.match(html, /Terminbuchung öffnen/);
});

test('no Setmore embed or self-built booking form remains', () => {
  assert.doesNotMatch(html, /setmore/i);
  assert.doesNotMatch(script, /setmore/i);
  assert.doesNotMatch(html, /id="booking-form"/);
});
