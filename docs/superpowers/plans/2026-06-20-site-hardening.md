# Site Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden the static Nail Studio demo against third-party failures, unsafe browser defaults, unnecessary loading, and accessibility regressions without replacing demo business data.

**Architecture:** Preserve the framework-free HTML/CSS/JavaScript structure. Enforce testable contracts at source level, progressively enhance already-functional HTML, and keep Calendly as a contained third-party integration with a direct-link fallback.

**Tech Stack:** HTML5, CSS, vanilla JavaScript, Node.js built-in test runner and `node:vm`

---

### Task 1: Add failing hardening contract tests

**Files:**
- Create: `tests/site-hardening.test.mjs`
- Modify: `tests/calendly.test.mjs`

- [ ] **Step 1: Test the desired source contracts**

Add assertions that all HTML documents contain a CSP, `index.html` contains no inline event handlers, contact links have real `href` values, every image has intrinsic dimensions, below-fold images use lazy loading, the hero is prioritized, privacy copy names Calendly/Google Fonts/Unsplash, CSS handles reduced motion, and `script.js` does not assign to `innerHTML`.

- [ ] **Step 2: Test real fallback behavior**

Evaluate `script.js` with `node:vm` and minimal DOM doubles, call `showCalendlyFallback(cal)`, and assert that the calendar is hidden, `aria-busy` becomes false, status text changes, and the fallback note becomes visible.

- [ ] **Step 3: Verify RED**

Run: `node --test tests/*.test.mjs`

Expected: existing Calendly tests pass and new hardening tests fail on missing CSP, inline handlers, static fallbacks, media attributes, privacy disclosures, reduced motion, and `innerHTML`.

### Task 2: Harden markup, privacy copy, and media loading

**Files:**
- Modify: `index.html`
- Modify: `impressum.html`
- Modify: `datenschutz.html`

- [ ] **Step 1: Add a deployment-independent CSP**

Add a CSP meta element immediately after the viewport meta on all three pages. Allow only self-hosted scripts plus Calendly, the existing Google font endpoints, Unsplash images, and the two required frame origins. Keep inline scripts forbidden; permit style attributes only because the Calendly widget injects them.

- [ ] **Step 2: Make HTML useful without JavaScript**

Give WhatsApp, telephone, email, Instagram, and Facebook anchors their current demo URLs. Put the three opening-hour spans into both empty `.hours` containers. Give the map iframe its encoded static `src`.

- [ ] **Step 3: Remove inline image handlers and optimize media**

Remove every `onerror` attribute. Give all images `width` and `height`; add `loading="lazy" decoding="async"` below the hero; add `fetchpriority="high" decoding="async"` to the hero.

- [ ] **Step 4: Correct third-party privacy disclosure**

Document Calendly, Google Fonts, Unsplash, Google Maps, and WhatsApp in `datenschutz.html`. Replace the absolute no-third-party-sharing sentence with wording consistent with the actual embeds.

- [ ] **Step 5: Verify focused tests**

Run: `node --test tests/site-hardening.test.mjs`

Expected: HTML, media, and privacy checks pass; JavaScript and reduced-motion checks may remain red until Task 3.

### Task 3: Harden JavaScript behavior and accessibility

**Files:**
- Modify: `script.js`
- Modify: `index.html`
- Modify: `styles.css`
- Test: `tests/site-hardening.test.mjs`
- Test: `tests/calendly.test.mjs`

- [ ] **Step 1: Replace the HTML injection sink**

Replace the hours assignment with `replaceChildren` and `textContent`-backed `<span>` elements.

- [ ] **Step 2: Move image fallback handling into JavaScript**

Register an error listener on each image that adds `img-ph`; no inline handler remains.

- [ ] **Step 3: Wait for the Calendly iframe load event**

Observe iframe insertion, attach a one-time `load` listener, keep the 12-second timeout, and show the fallback if no iframe load completes. Remove `hide_gdpr_banner=1` while preserving studio colors and hidden generic event details.

- [ ] **Step 4: Make the mobile navigation stateful**

Add `aria-controls="navLinks" aria-expanded="false"` in HTML. Update `aria-expanded` and the accessible label on toggle, link activation, and Escape.

- [ ] **Step 5: Respect reduced motion and remove dead CSS**

Disable smooth scrolling and the marquee animation under `prefers-reduced-motion: reduce`; collapse transitions to near-instant. Remove unused `.bk-grid`, `.bk-form`, and `.why-note` rules.

- [ ] **Step 6: Verify GREEN**

Run: `node --check script.js && node --test tests/*.test.mjs`

Expected: syntax exit 0 and all tests pass.

### Task 4: Browser verification

**Files:**
- Verify: `index.html`
- Verify: `script.js`
- Verify: `styles.css`

- [ ] **Step 1: Serve the static site locally**

Run a temporary `python -m http.server` process bound to `127.0.0.1` and close it after checks.

- [ ] **Step 2: Verify healthy Calendly rendering**

Use Chromium DevTools Protocol to confirm the widget is processed, an iframe exists, the loading status is hidden, the healthy fallback stays hidden, and the calendar bounds remain within desktop and 390px mobile viewports.

- [ ] **Step 3: Verify the blocked-widget state**

Invoke the fallback function in the browser page and confirm the direct Calendly, WhatsApp, telephone, and email actions remain visible.

- [ ] **Step 4: Run final checks**

Run: `node --check script.js`; `node --test tests/*.test.mjs`; search for inline handlers and `innerHTML` assignments.

Expected: all commands exit 0, tests report zero failures, and prohibited patterns have zero matches.

No commit steps are included because this directory is not a Git repository.
