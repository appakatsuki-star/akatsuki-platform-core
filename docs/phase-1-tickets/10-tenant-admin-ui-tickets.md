# Tenant Admin UI Tickets

## TAUI-001 — Tenant Admin login, shell, and permission-aware navigation

- **Goal:** Plan secure Tenant Admin authentication entry and minimal module/permission-aware shell.
- **Why it matters:** Every later screen needs trusted tenant context and cannot rely on hidden controls for security.
- **Scope:** Login/MFA/step-up/recovery links, session/logout, tenant identity/brand, accessible navigation for provider/catalog/pricing/orders/support/audit according to permission/module state.
- **Non-scope:** Auth backend implementation, custom dashboards, mobile app, theme builder, or permission enforcement only in UI.
- **Expected files or modules:** Future tenant-admin web auth/session/layout/navigation and API client contracts.
- **Data/entities touched:** Session/current membership/tenant/module/permission read models only.
- **API groups if relevant:** Auth/current context/session and tenant readiness.
- **Security requirements:** Secure cookies, no tokens in JS storage, safe errors, reauth prompts, field/route guards backed by server policy.
- **Tests required:** Login/MFA/logout, tenant mismatch, revoked role/session, hidden+server-denied routes, accessibility/keyboard/responsive.
- **Acceptance criteria:** User sees only allowed navigation and server denies every unauthorized direct request.
- **Do not do:** Decode client claims as authority or expose provider/profit data in global state/logs.
- **Notes for Codex:** Use shared accessible UI primitives only after scaffold approval.

## TAUI-002 — Provider connection and Provider Products pages

- **Goal:** Plan connection create/test/status and raw provider catalog review screens.
- **Why it matters:** Tenant must safely connect supply and understand changes without exposing secrets or customers.
- **Scope:** Write-only credential form; masked status/health/balance; test/disable/replace; sync request/history; provider product filters/detail/change review.
- **Non-scope:** Credential read/reveal, multiple-provider routing, bulk publish, provider raw response viewer, or public catalog.
- **Expected files or modules:** Future tenant-admin provider connection/products routes/components/forms/API clients.
- **Data/entities touched:** Provider connection safe projection, sync runs, raw Provider Products/change records, audit references.
- **API groups if relevant:** Provider connection/test/sync/products.
- **Security requirements:** MFA/permission for credentials/test; cost field masking; no secret in browser after submission/telemetry; bounded tables/exports.
- **Tests required:** Unauthorized roles, secret redaction/autofill/error, connection states, sync progress/failure, changed/disabled/removed display, tenant isolation.
- **Acceptance criteria:** Authorized admin can manage connection and review raw hidden products without retrieving a saved key.
- **Do not do:** Show `apiKey` after save, auto-sync on every page load, or publish from list selection without review.
- **Notes for Codex:** Provider-specific fields must come from approved adapter/config schema.

## TAUI-003 — Catalog publishing, pricing, orders, and profit pages

- **Goal:** Plan the minimum admin workflow from raw provider service to package and operational order detail.
- **Why it matters:** This is the tenant operator's core MVP workflow.
- **Scope:** Games/PUBG/product/package CRUD; `ADD_AS_PACKAGE` wizard; asset/input/price preview; publish confirmation; default tier page; order list/detail with safe cost/profit/timeline/inquiry.
- **Non-scope:** Standalone SMM UI, bulk publication, stock/manual fulfillment, advanced tier/agent, analytics BI, direct state/balance edit.
- **Expected files or modules:** Future tenant-admin catalog/assets/inputs/pricing/orders pages and API clients.
- **Data/entities touched:** Catalog/mapping/assets/inputs/tiers/order/commercial/status/audit read/write contracts.
- **API groups if relevant:** Catalog publication, asset/input, pricing tier/quote, admin orders/inquiry/refund/audit.
- **Security requirements:** Prepare/publish separation, cost/profit field permissions, signed upload, step-up/maker-checker policy, audit every change/action.
- **Tests required:** Wizard stale/disabled service, preview/publish mismatch, asset/input validation, role masking, pricing exact display, order timeout/inquiry, accessibility.
- **Acceptance criteria:** Authorized roles can publish one reviewed package set and operate orders with immutable snapshots and no forbidden data/action.
- **Do not do:** Calculate authoritative price/profit only in browser, allow blind retry, or permit raw status/balance editing.
- **Notes for Codex:** Split into smaller implementation PRs when executed; this ticket defines the page family contract.
