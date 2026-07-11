# Sprint 9 — Customer Storefront UI

## Tickets

- `STORE-001` — Customer registration, login, and wallet header.
- `STORE-002` — Games, PUBG Mobile, package selector, and Player ID form.
- `STORE-003` — Price, order submission, and status page.

## Goal

Deliver one tenant-branded customer journey using only published products and server-authoritative price/order status.

## Planned work

- Registration, email verification, login/logout/recovery links, consent, session-safe account navigation.
- Correctly labeled USD available/held wallet summary.
- Games category and PUBG Mobile page with tenant visuals.
- Published 60/325/660-like package selector.
- Versioned Player ID and required server/region form.
- Server quote/tier/expiry and wallet/payment confirmation.
- Idempotent submit with stable order reference and safe loading/retry behavior.
- Customer-safe order status/timeline and owned support-ticket link.

## Entry conditions

- Sprint 8 accepted for admin publication/operations.
- Sprint 7 order API and Sprint 6 money behavior accepted.
- Customer terms/refund/status wording and accessibility requirements accepted.
- At least one reviewed published reference package exists in non-public approved environment.

## Required tests

- Register/verify/login/logout/recovery/session/tenant isolation.
- Unpublished/disabled/stale package and provider change.
- Player ID/server validation, hidden-field tampering, XSS/safe assets.
- Quote expiry/price change/insufficient funds/double click/network response loss.
- Pending inquiry/rejected/fulfilled/refund states and cross-customer denial.
- Accessibility, responsive behavior, safe errors, cache/tenant correctness.

## Acceptance criteria

- Customer sees only published tenant products and correct server-calculated tier price.
- One confirmation produces one order, even with retries.
- Customer never sees provider cost/profit/credentials/raw status/hidden metadata.
- Wallet and order states remain truthful during provider ambiguity.

## Stop conditions

- Unpublished/cross-tenant product or order becomes visible.
- Client price differs from server/order snapshot.
- Duplicate submit creates duplicate order/provider/financial effect.
- Ambiguous timeout shown as definite failure/success.
- Accessibility/security-critical form or session defect.
