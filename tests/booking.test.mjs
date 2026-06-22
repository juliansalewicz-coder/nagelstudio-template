import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const script = await readFile(new URL('../script.js', import.meta.url), 'utf8');

test('booking uses the configured Setmore link, not a hand-rolled system', () => {
  assert.match(script, /setmore:\s*'https:\/\/[^']+\.setmore\.com'/);
});

test('the booking section embeds Setmore via a config-driven iframe', () => {
  assert.match(html, /id="setmore-frame"/);
  assert.match(script, /const link = STUDIO\.setmore/);
  assert.match(script, /document\.createElement\('iframe'\)/);
  assert.match(script, /iframe\.src = link/);
});

test('the embedded iframe gets an accessible title', () => {
  assert.match(script, /iframe\.title = `Online-Terminbuchung/);
});

test('a fallback link opens Setmore in a new tab', () => {
  assert.match(html, /id="setmore-fallback"[^>]*target="_blank"[^>]*rel="noopener"/);
  assert.match(html, /Terminbuchung öffnen/);
});

test('the Setmore page is injected by JS, not hard-coded as an inline iframe', () => {
  assert.doesNotMatch(html, /<iframe[^>]*setmore\.com/);
});

test('no self-built booking form or calendar remains', () => {
  assert.doesNotMatch(html, /id="booking-form"/);
  assert.doesNotMatch(script, /buildBooking/);
});
