# Frontend and Template Plan

## 1. Frontend applications

Maintain distinct Super Admin, Tenant Admin, and Customer applications so security assumptions, release cadence, and bundles do not blur. They may share accessible UI primitives, design tokens, API contracts, localization, and authentication utilities, but each owns its routes, navigation, screens, and permission/module guards.

All clients call versioned APIs. Business invariants must not exist only in client code. Responsive customer flows and stable contracts establish the path for future mobile apps.

## 2. White-label tenant resolution

At the edge or trusted server boundary, resolve hostname to a verified active tenant domain. Load a published tenant presentation snapshot containing theme, logo/assets, locale, navigation, template assignment, and enabled customer modules. Unknown, unverified, suspended, or ambiguous domains fail closed. Cache snapshots by tenant and version; invalidate after publication.

Custom domain lifecycle: requested → ownership verification → TLS provisioning → active → suspended/removed. Prevent domain takeover by requiring fresh ownership proof and reserving platform domains.

## 3. Template engine model

A template is a controlled, versioned schema—not arbitrary executable code. It defines:

- supported page types and named layout slots;
- approved components and their validated props;
- design tokens (color, type, spacing, radius, imagery);
- navigation/footer structures and optional module slots;
- compatibility with platform and module versions;
- localization keys and accessibility metadata.

Tenant customization is stored as overrides against a template version. Publication creates an immutable presentation snapshot. Preview uses a draft version visible only through authorized, expiring preview access. Publishing validates schema, contrast/accessibility, required assets, links, and enabled-module references; rollback selects a prior known-good snapshot.

Never permit raw server-side code, unrestricted JavaScript, arbitrary package imports, unsafe HTML, or unscoped network calls in tenant templates. If advanced customization is later required, use sandboxed components with CSP and a reviewed capability model.

## 4. Module-aware user experience

Navigation and routes are derived from server-authoritative entitlements plus effective permissions. Direct URL/API access remains server checked. Disabling a module removes entry points and displays safe historical read-only references where retention requires them. Module frontends register routes, menu descriptors, translations, and approved template components through explicit contracts.

## 5. State, errors, and accessibility

- Server state uses a consistent query/cache layer; local UI state remains local.
- Mutations expose pending/success/failure states and support idempotent retry where appropriate.
- Financial confirmations show amount, currency, fees, recipient, and irreversible consequences.
- Error messages use stable API codes, safe user wording, and correlation IDs for support.
- Target WCAG 2.2 AA, keyboard navigation, visible focus, semantic structure, reduced motion, and RTL from the design-system level.
- Arabic and other locales must account for layout direction, pluralization, dates, numbers, and currency formatting.

## 6. Frontend security

Prefer secure HTTP-only cookies for browser sessions, CSRF protection for cookie-authenticated mutations, strict CSP, output encoding, safe URL handling, and dependency integrity controls. Avoid sensitive data in local storage, analytics, logs, URLs, or client error reports. Signed download and preview URLs are short-lived and single-purpose.

## 7. Performance and quality

Set measurable budgets for core web vitals, JavaScript, images, and API waterfalls. Serve optimized tenant assets through CDN with immutable versioned URLs. Test each surface for accessibility, localization/RTL, visual regressions, permission combinations, module combinations, and critical end-to-end journeys.
