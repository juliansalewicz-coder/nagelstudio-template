import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const script = await readFile(new URL('../script.js', import.meta.url), 'utf8');

test('booking is a self-contained request form, not a third-party embed', () => {
  assert.match(html, /id="booking-form"/);
  assert.doesNotMatch(html, /calendly/i);
  assert.doesNotMatch(script, /calendly/i);
});

test('the form collects service, staff, date, time and contact', () => {
  for (const id of ['bk-service', 'bk-staff', 'bk-date', 'bk-time', 'bk-name', 'bk-phone']) {
    assert.match(html, new RegExp(`id="${id}"`), `missing field ${id}`);
  }
});

test('key fields are required so a request is actionable', () => {
  assert.match(html, /id="bk-service"[^>]*\brequired\b/);
  assert.match(html, /id="bk-date"[^>]*\brequired\b/);
  assert.match(html, /id="bk-name"[^>]*\brequired\b/);
  assert.match(html, /id="bk-phone"[^>]*\brequired\b/);
});

test('services and staff come from the central STUDIO config', () => {
  assert.match(script, /services:\s*\[/);
  assert.match(script, /staff:\s*\[/);
  assert.match(script, /STUDIO\.services\.forEach/);
  assert.match(script, /STUDIO\.staff\.forEach/);
});

test('the earliest date is computed locally to avoid timezone drift', () => {
  assert.match(script, /date\.min = todayISO\(\)/);
  assert.doesNotMatch(script, /toISOString\(\)\.slice/);
});
