# Phase 1 Build Sequence

## Important gate

Do not execute this sequence while Phase 1 is `NO-GO`. It is the recommended order only after the entry checklist is fully satisfied and formal authorization is recorded.

## 0. Freeze approved contracts

- Record founder/legal/finance/security/architecture/platform decisions.
- Name provider/payment/cloud and pin supported versions.
- Freeze reference journey, permission matrix, posting matrix, provider capability/status/input contract, and acceptance tests.

**Exit:** Phase 1 entry gate says GO. This is currently not satisfied.

## 1. Repository and runtime foundation

- Approved monorepo/workspace/composition boundaries, typed configuration, error/context conventions, structured logging, test harness.
- API/worker/web deployable shapes only according to approved plan.
- Health/liveness/readiness and architecture boundary checks.

## 2. Database and migration foundation

- Production migration journal/lock/drift/review conventions.
- Tenant/user/membership/session/RBAC/audit/outbox/idempotency base schemas and database roles.
- Tenant composite keys/indexes and approved RLS foundation.

## 3. Authentication and tenant context

- Registration/invitation/verification/login/logout/recovery, opaque sessions, MFA, revocation.
- Trusted domain/membership tenant resolver and fail-closed context.
- Auth/tenant negative tests before business modules.

## 4. Tenant lifecycle and RBAC

- Super Admin create/status/owner/module flow.
- Fixed tenant roles, permissions, staff invitation/status, policy/maker-checker framework.
- Platform/tenant audit views and denial matrix.

## 5. Ledger and wallet foundation

- Accountant-approved accounts/postings, transactions/entries, immutable database protections, holds, projections, idempotency, reversals.
- Concurrency and balance/rebuild tests before order/payment integration.

## 6. Payment/funding foundation

- Approved one provider/method intent/attempt/callback/inquiry/ledger-credit/settlement path.
- Signed/replay-safe confirmation, no browser truth, reconciliation and failure tests.

## 7. Provider connection and worker foundation

- Secret-backed connection, test/disable/rotate metadata, adapter contract, sync/dispatch/inquiry jobs, outbox/inbox/retry/DLQ/monitoring.
- Named provider sandbox contract tests.

## 8. Provider catalog and Store Catalog

- Raw Provider Product sync/change/version model.
- Tenant category/product/package/mapping/visual/input lifecycle and preview/publication.
- `ADD_AS_PACKAGE` reference flow and cross-tenant/auto-publish denial tests.

## 9. Pricing

- Default tier, exact quote calculation, assignment, snapshot, safe admin/customer views.
- Keep agent commission execution disabled unless separately approved; test fields/policies accordingly.

## 10. Orders and provider fulfillment

- Quote/order/item/input/commercial snapshot, hold, dispatch intent, provider attempt/inquiry/status, capture/release/refund/reversal transitions.
- Ambiguous timeout, duplicate, late/reordered update, suspension, and reconciliation tests.

## 11. Admin surfaces

- Super Admin tenant/module/audit minimum.
- Tenant Admin provider connection/products, category/product/packages, visuals/inputs, pricing, order/profit snapshot minimum.
- Field masking, MFA/permissions/audit verified per action.

## 12. Customer storefront

- Auth, Games, PUBG Mobile, package selection, Player ID form, quote, payment/wallet, submit, status, support link.
- Accessibility, responsive behavior, safe errors, and tenant branding.

## 13. End-to-end hardening

- Full automated matrix from `13-testing-and-validation-blueprint.md`.
- Observability/alerts/runbooks, migration rehearsal, backup/PITR restore, provider/payment reconciliation, incident tabletop.
- Security/accounting/operations evidence review and Phase 1 completion gate.

## Sequencing rule

Do not build UI that bypasses unfinished application policies. Do not integrate provider ordering before idempotency/outbox/inquiry exist. Do not integrate money before accountant-approved ledger foundation. Do not expose tenant data before auth/isolation/RBAC negative tests pass.
