import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const script = await readFile(new URL('../script.js', import.meta.url), 'utf8');

test('uses the real Calendly event', () => {
  assert.match(script, /calendly:\s*'https:\/\/calendly\.com\/julian-salewicz\/30min'/);
});

test('configures the widget with the studio colors', () => {
  assert.match(script, /primary_color=9c7b5b/);
});

test('hides generic event details in the studio embed', () => {
  assert.match(script, /hide_event_type_details=1/);
});

test('loads the Calendly widget script dynamically and opens it as a popup', () => {
  assert.doesNotMatch(html, /assets\.calendly\.com\/assets\/external\/widget\.js/);
  assert.match(script, /loadCalendlyOnce\s*\(/);
  assert.match(script, /initPopupWidget/);
});

test('the booking button is a real link that works without JavaScript', () => {
  assert.match(html, /id="cal-popup"[^>]*target="_blank"[^>]*rel="noopener"/);
  assert.match(html, /id="cal-popup"[^>]*href="https:\/\/calendly\.com\/julian-salewicz\/30min"/);
});

test('only hijacks the click once Calendly has actually loaded', () => {
  assert.match(script, /window\.Calendly && typeof window\.Calendly\.initPopupWidget === 'function'/);
  assert.match(script, /event\.preventDefault\(\)/);
});
