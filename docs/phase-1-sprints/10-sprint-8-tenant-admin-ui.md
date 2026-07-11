# Sprint 8 — Tenant Admin UI

## Tickets

- `TAUI-001` — Login, shell, and permission-aware navigation.
- `TAUI-002` — Provider connection and Provider Products pages.
- `TAUI-003` — Catalog publishing, pricing, orders, and profit pages.

## Goal

Expose the approved tenant operator workflow without moving authority or business calculations into the browser.

## Planned work

- Secure login/MFA/session/logout and tenant-branded permission/module-aware shell.
- Provider connection write-only credentials, test/status/disable/rotate, safe balance/health.
- Raw Provider Products/change/sync history pages.
- Games/PUBG/package management and `ADD_AS_PACKAGE` preview/confirm.
- Controlled category/product image/icon/banner and Player ID/server input editing.
- Default tier page and exact server-calculated price preview.
- Order list/detail with role-masked provider cost/customer price/tier/markup/profit/provider status/timeline.
- Permissioned inquiry/refund/review actions; never direct retry/status/balance edit.

## Entry conditions

- Sprint 7 backend APIs/policies/tests accepted.
- Tenant Admin/Catalog/Order/Support permissions and field masking finalized.
- Asset/storage and audit behavior available.
- UI/accessibility/design primitives approved.

## Required tests

- Login/MFA/revocation/tenant mismatch and direct-route server denial.
- Credential never returned/logged/autofilled after save.
- Provider sync/change/disabled/error states.
- Publish stale/disabled/mismatched input/price flows.
- Asset/input validation and accessibility/responsive/keyboard behavior.
- Cost/profit masking, exact display, timeout/inquiry, and audit evidence.

## Acceptance criteria

- Authorized operator can connect/test provider, review raw products, publish packages, manage visuals/inputs/tier, and inspect safe orders.
- UI respects RBAC and cost/profit visibility; server remains authoritative.
- No secret, blind retry, direct balance/status edit, or unsupported feature appears.

## Stop conditions

- RBAC/field masking bypass through route/API/client state.
- Provider key appears in response, DOM, logs, telemetry, or storage.
- Browser calculates authoritative price/profit or order transition.
- Sensitive publish/price/provider action lacks audit/step-up/approval.
