# Testing and Validation Blueprint

## Purpose

Define evidence required for Phase 1 completion. This is a test plan, not authorization to implement or execute tests now.

## Authentication tests

- Registration/verification/login/logout/password recovery/change.
- Session rotation, idle/absolute expiry, revocation, fixation/theft reuse denial.
- Admin MFA enrollment/challenge/recovery/step-up and reset abuse denial.
- Invitation expiry/reuse/wrong identity and account-enumeration/rate-limit behavior.
- CSRF, origin/CORS, cookie, and security-header checks.

## Tenant isolation tests

- Tenant A cannot access/mutate tenant B via IDs, list/search/pagination/cursor, relationships, raw SQL, file/URL, cache, job/event, provider connection/webhook, export, audit, support, or domain mismatch.
- Non-null tenant/composite foreign key/uniqueness enforcement.
- RLS pooled connection, worker, migration, maintenance, missing/stale context, and table-owner bypass behavior.
- Platform/global repository requires explicit permission/audit and never follows missing tenant scope.

## Provider catalog and mapping tests

- Sync imports raw hidden Provider Product and never publishes automatically.
- New/updated/disabled/removed, cost/currency, input/limit, and status changes are detected/versioned/audited.
- `ADD_AS_PACKAGE` maps 60/325/660-like services under one product; mapping cannot cross tenant/provider.
- Provider change cannot silently overwrite tenant visuals, form, published price, or historical order.
- Visual fallback/override, no hot-linking, active/visibility/order behavior.
- Input schema validation/mapping and provider-only field protection.

## Pricing tests

- Exact provider cost + tier markup with approved rounding and no floating point.
- One active default tier, inactive/expired quote denial, customer assignment boundaries.
- Provider cost/tier change affects new quote only.
- Cost/price/tier/markup/commission/profit snapshot remains unchanged.
- Field masking by role; override/assignment/change audit.
- If commission enabled later: eligibility, conflict, earning, refund reversal, and no retroactive attribution.

## Ledger tests

- Every posted transaction has at least two entries and balances per currency.
- Posted transaction/entry update/delete rejected at database level.
- Direct balance mutation absent; projection rebuild equals ledger.
- Hold prevents concurrent double spend; capture/release exactly once.
- Duplicate/reordered deposit/capture/refund/reversal/adjustment commands remain idempotent.
- Full refund/reversal does not exceed captured/reversible value.
- Maker-checker self-approval denied; audit/reconciliation evidence complete.

## Order/provider lifecycle tests

- Quote/create/hold/dispatch/status/capture or release/refund allowed transitions.
- Double submit/client timeout/outbox replay does not duplicate order/provider order/money.
- Provider definite rejection, invalid input, insufficient balance, disabled service, unknown status, duplicate response, rate limit, and late update.
- Timeout after create triggers inquiry, not blind retry.
- Provider/internal/customer states remain distinct; terminal state cannot regress improperly.
- Tenant/module/product/package/provider suspension during in-flight order follows policy.

## Permission and audit tests

- Allow and deny matrix for every fixed role and sensitive field/action.
- Catalog Manager cannot reveal key/adjust balance; Order/Support cannot change price/roles; Customer owns only own resources.
- Maker-checker and recent MFA enforcement.
- Every required action produces one complete safe append-only audit record; mutation/delete denied.
- Logs/audit/errors/jobs redact secrets, passwords, sensitive inputs, personal/payment data, and cross-tenant existence.

## API and health tests

- Boundary schema/size/type/depth validation and stable safe error codes.
- Health/liveness/readiness behavior under database/queue/provider degradation without leaking details.
- Rate limit, idempotency payload conflict, pagination bound, correlation propagation, graceful shutdown.
- API/worker startup and supported Node/dependency compatibility.

## Migration, backup, and recovery tests

- Clean install and upgrade from supported previous migration journal; rerun no-op, concurrent runner lock, checksum/drift failure.
- Expand/migrate/contract compatibility and bounded resumable backfill/forward recovery.
- Production-like PITR/restore verifies migration level, tenant isolation, ledger balance/immutability, order snapshots, objects/secrets, audit, and application health.
- Queue/outbox/provider reconciliation prevents duplicate external effect after recovery.

## Exit evidence

Automated results, test versions/data, negative cases, security review, provider sandbox evidence, accountant-approved expected postings, restore report, unresolved defects/risks, and named owner. Any critical isolation, financial, credential, or duplicate-provider defect blocks completion.
