# Graph Report - .  (2026-06-21)

## Corpus Check
- Corpus is ~5,259 words - fits in a single context window. You may not need a graph.

## Summary
- 46 nodes · 61 edges · 8 communities
- Extraction: 75% EXTRACTED · 21% INFERRED · 3% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.82)
- Token cost: 57,024 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Hardening Test Internals|Hardening Test Internals]]
- [[_COMMUNITY_script.js Core Functions|script.js Core Functions]]
- [[_COMMUNITY_Site Hardening & Privacy|Site Hardening & Privacy]]
- [[_COMMUNITY_Config & DOM Bindings|Config & DOM Bindings]]
- [[_COMMUNITY_Booking Form|Booking Form]]
- [[_COMMUNITY_Calendly (RemovedLegacy)|Calendly (Removed/Legacy)]]
- [[_COMMUNITY_Booking Product Principles|Booking Product Principles]]

## God Nodes (most connected - your core abstractions)
1. `buildBooking()` - 9 edges
2. `Site hardening tests` - 6 edges
3. `Calendly embed (removed concept)` - 6 edges
4. `STUDIO config object` - 5 edges
5. `Datenschutzerklärung` - 5 edges
6. `WhatsApp prefilled booking request` - 5 edges
7. `buildBooking()` - 4 edges
8. `bind()` - 4 edges
9. `Booking form (#booking-form)` - 4 edges
10. `Booking form tests` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Calendly embed (removed concept)` --conceptually_related_to--> `buildBooking()`  [AMBIGUOUS]
  docs/superpowers/specs/2026-06-20-calendly-integration-design.md → script.js
- `Datenschutzerklärung` --semantically_similar_to--> `Impressum`  [INFERRED] [semantically similar]
  datenschutz.html → impressum.html
- `Impressum` --shares_data_with--> `STUDIO config object`  [INFERRED]
  impressum.html → script.js
- `buildBooking()` --implements--> `WhatsApp prefilled booking request`  [INFERRED]
  script.js → PRODUCT.md
- `Calendly embed (removed concept)` --semantically_similar_to--> `WhatsApp prefilled booking request`  [INFERRED] [semantically similar]
  docs/superpowers/specs/2026-06-20-calendly-integration-design.md → PRODUCT.md

## Hyperedges (group relationships)
- **Self-contained WhatsApp booking flow** — index_bookingForm, script_buildBooking, script_STUDIO, concept_whatsappBooking [INFERRED 0.85]
- **Site hardening contract enforcement** — hardeningtest_suite, index_csp, hardspec_doc, hardplan_doc [INFERRED 0.75]

## Communities (8 total, 0 thin omitted)

### Community 0 - "Hardening Test Internals"
Cohesion: 0.18
Nodes (6): context, decoded, fields, handlers, pages, values

### Community 1 - "script.js Core Functions"
Cohesion: 0.39
Nodes (5): bind(), buildBooking(), pad(), STUDIO, todayISO()

### Community 2 - "Site Hardening & Privacy"
Cohesion: 0.38
Nodes (6): Datenschutzerklärung, Site hardening tests, Site hardening plan, Site hardening design, Content Security Policy (index), Mobile nav toggle (#navToggle)

### Community 3 - "Config & DOM Bindings"
Cohesion: 0.29
Nodes (6): Impressum, data-* binding attributes, Google Maps iframe (#map-frame), README, STUDIO config object, bind()

### Community 4 - "Booking Form"
Cohesion: 0.70
Nodes (5): Booking form tests, Booking form (#booking-form), buildBooking(), pad(), todayISO()

### Community 5 - "Calendly (Removed/Legacy)"
Cohesion: 0.67
Nodes (4): Calendly integration plan, Calendly integration design, Calendly embed (removed concept), README Calendly section (outdated)

### Community 6 - "Booking Product Principles"
Cohesion: 0.67
Nodes (3): WhatsApp prefilled booking request, Booking without backend principle, Product brief

## Ambiguous Edges - Review These
- `buildBooking()` → `Calendly embed (removed concept)`  [AMBIGUOUS]
  docs/superpowers/plans/2026-06-20-calendly-integration.md · relation: conceptually_related_to
- `Booking form (#booking-form)` → `Calendly embed (removed concept)`  [AMBIGUOUS]
  docs/superpowers/specs/2026-06-20-calendly-integration-design.md · relation: conceptually_related_to

## Knowledge Gaps
- **10 isolated node(s):** `STUDIO`, `pages`, `values`, `handlers`, `fields` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `buildBooking()` and `Calendly embed (removed concept)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Booking form (#booking-form)` and `Calendly embed (removed concept)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `buildBooking()` connect `Booking Form` to `Site Hardening & Privacy`, `Config & DOM Bindings`, `Calendly (Removed/Legacy)`, `Booking Product Principles`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Why does `Site hardening tests` connect `Site Hardening & Privacy` to `Config & DOM Bindings`, `Booking Form`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `Calendly embed (removed concept)` connect `Calendly (Removed/Legacy)` to `Booking Form`, `Booking Product Principles`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `Datenschutzerklärung` (e.g. with `Impressum` and `Google Maps iframe (#map-frame)`) actually correct?**
  _`Datenschutzerklärung` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `STUDIO`, `pages`, `values` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._