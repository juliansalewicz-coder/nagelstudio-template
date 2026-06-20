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

test('loads Calendly only after the widget URL is configured', () => {
  assert.doesNotMatch(html, /assets\.calendly\.com\/assets\/external\/widget\.js/);
  assert.match(script, /cal\.setAttribute\('data-url'/);
  assert.match(script, /loadCalendlyScript\(cal/);
});

test('offers a safe direct booking fallback', () => {
  assert.match(html, /id="cal-direct"[^>]*target="_blank"[^>]*rel="noopener"/);
  assert.match(html, /id="cal-fallback-note"/);
});

test('handles a blocked Calendly script', () => {
  assert.match(script, /calScript\.onerror/);
  assert.match(script, /showCalendlyFallback/);
});
