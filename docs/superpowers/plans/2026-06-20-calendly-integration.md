# Calendly Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Embed the studio's real Calendly event reliably, on brand, responsive, and with a usable fallback when Calendly is blocked.

**Architecture:** Keep the existing static HTML/CSS/JavaScript structure and the central `STUDIO.calendly` setting. Configure the widget first, then load Calendly's external script dynamically so the third-party script cannot race an empty `data-url`; observe widget initialization and expose a direct booking fallback on load failure.

**Tech Stack:** HTML5, CSS, vanilla JavaScript, Node.js built-in test runner

---

### Task 1: Add a regression test for the booking contract

**Files:**
- Create: `tests/calendly.test.mjs`
- Test: `tests/calendly.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const script = await readFile(new URL('../script.js', import.meta.url), 'utf8');

test('uses the real Calendly event and configures the studio theme', () => {
  assert.match(script, /calendly:\s*'https:\/\/calendly\.com\/julian-salewicz\/30min'/);
  assert.match(script, /primary_color=9c7b5b/);
});

test('loads Calendly only after the widget URL is configured', () => {
  assert.doesNotMatch(html, /assets\.calendly\.com\/assets\/external\/widget\.js/);
  assert.match(script, /cal\.setAttribute\('data-url'/);
  assert.match(script, /loadCalendlyScript\(cal/);
});

test('offers a safe direct booking fallback', () => {
  assert.match(html, /id="cal-direct"/);
  assert.match(html, /id="cal-fallback-note"/);
  assert.match(script, /calScript\.onerror/);
  assert.match(script, /showCalendlyFallback/);
  assert.match(script, /target="_blank"/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/calendly.test.mjs`

Expected: FAIL because the direct fallback and deterministic script loader do not exist yet.

### Task 2: Implement deterministic Calendly loading and fallback

**Files:**
- Modify: `index.html:215-231`
- Modify: `script.js:1-70`
- Modify: `styles.css:149-155`
- Test: `tests/calendly.test.mjs`

- [ ] **Step 1: Add accessible booking status and direct-link markup**

Replace the current Calendly widget/fallback block with a widget container, a live status message, a hidden error note, and a direct booking link. Keep WhatsApp, phone, and email below it.

- [ ] **Step 2: Configure the widget before loading Calendly**

Create `showCalendlyFallback`, `watchCalendlyWidget`, and `loadCalendlyScript` helpers. Set the themed `data-url`, configure `#cal-direct`, begin observing for Calendly's iframe, and only then append `https://assets.calendly.com/assets/external/widget.js` to the document.

- [ ] **Step 3: Handle script failures and timeouts**

On `calScript.onerror` or when no iframe appears within 12 seconds, hide the empty widget, reveal the error note, update the live status, and leave the direct booking button available.

- [ ] **Step 4: Style responsive booking states**

Give the widget a responsive minimum height, style the status and fallback text with existing tokens, and ensure direct/alternative actions wrap on narrow screens.

- [ ] **Step 5: Run the focused test**

Run: `node --test tests/calendly.test.mjs`

Expected: 3 tests pass, 0 fail.

### Task 3: Verify the complete static site

**Files:**
- Verify: `index.html`
- Verify: `script.js`
- Verify: `styles.css`

- [ ] **Step 1: Check syntax**

Run: `node --check script.js`

Expected: exit code 0 with no output.

- [ ] **Step 2: Check links and booking anchors**

Run: `rg -n 'href="#termin"|calendly.com/julian-salewicz/30min|cal-direct|cal-fallback-note' index.html script.js`

Expected: every internal booking CTA points to `#termin`, the configured event URL is present once in `STUDIO`, and both fallback elements are present.

- [ ] **Step 3: Verify the remote event endpoint**

Run: `curl.exe -I -L --max-time 20 https://calendly.com/julian-salewicz/30min`

Expected: final response `HTTP/1.1 200 OK` and `x-frame-options: ALLOWALL`.

- [ ] **Step 4: Run all automated checks**

Run: `node --test tests/*.test.mjs`

Expected: all tests pass.

No commit step is included because this directory is not a Git repository.
