# Customer Storefront UI Tickets

## STORE-001 — Customer registration, login, and wallet header

- **Goal:** Plan tenant-branded registration/session flow and safe wallet summary.
- **Why it matters:** Customer must enter the correct tenant and understand available versus held money.
- **Scope:** Register, email verification, login/logout/recovery links, consent, current customer, wallet available/held labels, session-safe navigation.
- **Non-scope:** Social/phone login, guest checkout, wallet mutation, deposits UI beyond approved payment path, or multi-currency.
- **Expected files or modules:** Future customer web auth/account/layout/wallet summary and API clients.
- **Data/entities touched:** Customer profile/consent/session and wallet safe projection.
- **API groups if relevant:** Customer auth/current profile/session/wallet summary.
- **Security requirements:** Trusted tenant domain, Secure HttpOnly cookie, CSRF, enumeration protection, no token/local storage, no provider/internal data.
- **Tests required:** Verify/login/logout/recovery states, wrong tenant, revoked session, wallet labels/refresh, accessibility/responsive/safe errors.
- **Acceptance criteria:** Verified customer sees only their tenant/profile and correctly labeled USD balance components.
- **Do not do:** Show one mutable “balance” that hides holds or accept client tenant header as scope.
- **Notes for Codex:** Exact wallet/payment wording requires Legal/Finance approval.

## STORE-002 — Games, PUBG Mobile, package selector, and Player ID form

- **Goal:** Plan branded browsing and validated configuration of one published package.
- **Why it matters:** Proves tenant catalog presentation and dynamic input mapping without exposing raw provider data.
- **Scope:** Games category, PUBG Mobile page, 60/325/660-like package selector, tenant visuals, Player ID and required server/region field, availability/help/errors.
- **Non-scope:** SMM quantity, cart, multiple items, password input, provider selection/status/cost, or package-specific images by default.
- **Expected files or modules:** Future customer web category/product/package/form components and catalog API client.
- **Data/entities touched:** Published catalog/input/price safe read models only.
- **API groups if relevant:** Public tenant catalog category/product/package and quote validation.
- **Security requirements:** Server-provided versioned schema; encode output; no hidden provider field editing; CSP/safe assets; tenant/cache key correctness.
- **Tests required:** Unpublished/disabled/stale package, invalid Player ID/server, provider input change, image fallback/override, XSS, accessibility/responsive.
- **Acceptance criteria:** Customer can select exactly one available package and produce a valid server-accepted form without seeing provider metadata.
- **Do not do:** Render arbitrary provider HTML/regex unsafely or trust client validation alone.
- **Notes for Codex:** Package examples change if selected provider catalog differs.

## STORE-003 — Price, order submission, and status page

- **Goal:** Plan quote display, idempotent confirmation, and customer-safe timeline.
- **Why it matters:** Customer needs one truthful order and price despite retries/provider complexity.
- **Scope:** USD price/tier/expiry, wallet/payment confirmation, submit/loading/retry UX, stable order reference, internal status/timestamps, safe input/package summary, support link.
- **Non-scope:** Provider cost/profit/ID/raw status, agent commission, cart, partial refund, manual status controls, or public API.
- **Expected files or modules:** Future customer web quote/checkout/order detail/status/support link and API client.
- **Data/entities touched:** Safe quote/order/item/input/status/wallet projections.
- **API groups if relevant:** Quote/create/list/detail/customer timeline.
- **Security requirements:** Idempotency key, CSRF, server price/ownership/state checks, no duplicate click effect, safe polling/backoff/error.
- **Tests required:** Quote expiry/cost change, insufficient funds, double click/network response loss, pending inquiry, rejected/fulfilled/refunded state, cross-customer/tenant.
- **Acceptance criteria:** Repeated customer actions create one order and show consistent safe state until terminal/review outcome.
- **Do not do:** Interpret provider/browser response directly or show failure on ambiguous timeout.
- **Notes for Codex:** Notification failure must not replace authenticated status truth.
