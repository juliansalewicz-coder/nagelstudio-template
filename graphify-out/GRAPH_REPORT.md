# Graph Report - .  (2026-06-20)

## Corpus Check
- Corpus is ~5,200 words - fits in a single context window. You may not need a graph.

## Summary
- 57 nodes · 86 edges · 10 communities (9 shown, 1 thin omitted)
- Extraction: 74% EXTRACTED · 24% INFERRED · 1% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.83)
- Token cost: 62,653 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Calendly Integration & Config|Calendly Integration & Config]]
- [[_COMMUNITY_script.js Functions|script.js Functions]]
- [[_COMMUNITY_Hardening Tests|Hardening Tests]]
- [[_COMMUNITY_DOM Bootstrap & Bindings|DOM Bootstrap & Bindings]]
- [[_COMMUNITY_Site Hardening Design|Site Hardening Design]]
- [[_COMMUNITY_Progressive Enhancement & Plans|Progressive Enhancement & Plans]]
- [[_COMMUNITY_Content Security Policy|Content Security Policy]]
- [[_COMMUNITY_Product Principles|Product Principles]]
- [[_COMMUNITY_Privacy & Disclosure|Privacy & Disclosure]]

## God Nodes (most connected - your core abstractions)
1. `STUDIO config object` - 7 edges
2. `setupBooking()` - 7 edges
3. `index.html landing page` - 7 edges
4. `setupBooking()` - 6 edges
5. `Site hardening plan` - 6 edges
6. `index.html Content Security Policy` - 5 edges
7. `datenschutz.html privacy page` - 5 edges
8. `Calendly integration plan` - 5 edges
9. `Calendly integration design spec` - 5 edges
10. `Direct-link Calendly fallback` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Single-source STUDIO data principle` --references--> `STUDIO config object`  [INFERRED]
  README.md → script.js
- `Deterministic Calendly script loading` --references--> `loadCalendlyOnce()`  [INFERRED]
  docs/superpowers/plans/2026-06-20-calendly-integration.md → script.js
- `setupBooking()` --references--> `#termin booking section`  [INFERRED]
  script.js → index.html
- `bind()` --references--> `data-* field bindings`  [INFERRED]
  script.js → index.html
- `index.html landing page` --references--> `DOMContentLoaded bootstrap`  [EXTRACTED]
  index.html → script.js

## Hyperedges (group relationships)
- **Calendly booking flow** — script_setupBooking, script_renderStaff, script_bindPopup, script_loadCalendlyOnce, index_termin_section [EXTRACTED 0.85]
- **Cross-page CSP hardening** — index_csp, impressum_csp, datenschutz_csp, hardening_spec_csp [INFERRED 0.85]
- **External-service fallback resilience** — product_fallback_principle, calendly_spec_fallback, calendly_plan_deterministic_loading, datenschutz_thirdparty_disclosure [INFERRED 0.75]

## Communities (10 total, 1 thin omitted)

### Community 0 - "Calendly Integration & Config"
Cohesion: 0.26
Nodes (11): Calendly integration plan, Deterministic Calendly script loading, Calendly integration design spec, #termin booking section, Single-source STUDIO data principle, STUDIO config object, bindPopup(), calendlyReady() (+3 more)

### Community 1 - "script.js Functions"
Cohesion: 0.29
Nodes (8): bind(), bindPopup(), calendlyReady(), calendlyUrl(), loadCalendlyOnce(), renderStaff(), setupBooking(), STUDIO

### Community 2 - "Hardening Tests"
Cohesion: 0.25
Nodes (6): attributes, calendar, context, note, pages, status

### Community 3 - "DOM Bootstrap & Bindings"
Cohesion: 0.40
Nodes (5): data-* field bindings, bind(), DOMContentLoaded bootstrap, imageFallbacks(), nav()

### Community 4 - "Site Hardening Design"
Cohesion: 0.50
Nodes (4): Direct-link Calendly fallback, Site hardening design spec, Hosting-independent CSP hardening, prefers-reduced-motion respect

### Community 5 - "Progressive Enhancement & Plans"
Cohesion: 0.67
Nodes (3): Site hardening plan, Progressive enhancement of working HTML, index.html landing page

### Community 6 - "Content Security Policy"
Cohesion: 0.50
Nodes (4): datenschutz.html Content Security Policy, impressum.html Content Security Policy, impressum.html legal page, index.html Content Security Policy

### Community 7 - "Product Principles"
Cohesion: 0.50
Nodes (4): Inline-embed booking choice, Design principles (Vertrauen vor Effekt), External services must not block the core path, PRODUCT.md product brief

## Ambiguous Edges - Review These
- `site-hardening.test.mjs` → `Direct-link Calendly fallback`  [AMBIGUOUS]
  tests/site-hardening.test.mjs · relation: references

## Knowledge Gaps
- **8 isolated node(s):** `STUDIO`, `pages`, `status`, `note`, `context` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `site-hardening.test.mjs` and `Direct-link Calendly fallback`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **Why does `STUDIO config object` connect `Calendly Integration & Config` to `DOM Bootstrap & Bindings`, `Progressive Enhancement & Plans`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Why does `Direct-link Calendly fallback` connect `Site Hardening Design` to `Calendly Integration & Config`, `Privacy & Disclosure`, `Progressive Enhancement & Plans`, `Product Principles`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `setupBooking()` connect `Calendly Integration & Config` to `DOM Bootstrap & Bindings`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `STUDIO config object` (e.g. with `Single-source STUDIO data principle` and `renderStaff()`) actually correct?**
  _`STUDIO config object` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Site hardening plan` (e.g. with `Site hardening design spec` and `site-hardening.test.mjs`) actually correct?**
  _`Site hardening plan` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `STUDIO`, `pages`, `status` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._