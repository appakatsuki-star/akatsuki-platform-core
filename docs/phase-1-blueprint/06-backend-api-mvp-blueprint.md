# Backend API MVP Blueprint

## Status and conventions

This is a proposed API responsibility map, not endpoint implementation. Routes would be versioned (for example `/api/v1`), validate input/output, resolve trusted actor/tenant context, authorize server-side, use stable errors, idempotency where required, and emit audit/outbox records.

## Auth and sessions

- Registration, email verification, login/logout, MFA enrollment/challenge/recovery, password recovery/change.
- Session list/revoke and current actor/membership/assurance context.
- Staff invitations and membership activation/suspension.
- No browser JWT design or secrets returned to frontend.

## Tenants and users

- Super Admin tenant create/list/detail/status, initial owner assignment, module entitlement/readiness.
- Tenant Admin staff invite/list/status and allowed fixed-role assignment.
- Customer profile/current tenant membership and consent state.
- Separate explicit platform and tenant administration endpoints/use cases.

## Providers

- Provider connection create/update-secret/test/disable/rotate metadata; credential input write-only.
- Connection health/balance/last sync and authorized sync request/history.
- Provider webhook entry points scoped by stored connection with signature/replay checks where supported.

## Provider Products

- Raw product list/detail/filter and change state.
- Sync results and safe diff of cost/status/input/availability changes.
- Review state and mapping candidates; no public/customer endpoint.

## Catalog

- Tenant category create/update/publish visibility/order/visual metadata.
- Store Product create/update/preview/publish/unpublish.
- Package/Variant create/map/update/enable/disable/order.
- `ADD_AS_PACKAGE` command; standalone publication contract reserved but customer path later.
- Versioned input-field definitions/mappings and publication preview.

## Pricing tiers

- Tier create/update/activate/default and optional customer assignment.
- Quote calculation for tenant/customer/package and price explanation safe for actor.
- Package pricing override only under separate permission.
- Commission configuration endpoints remain disabled/unavailable unless approved.

## Wallet and ledger

- Customer wallet/available-held-posted summary and paginated statement.
- Internal commands for deposit confirmation, hold, capture, release, refund, reversal, and approved adjustment; never generic balance update.
- Admin reconciliation/discrepancy view under permission.

## Orders

- Customer quote/create/list/detail and customer-safe timeline.
- Admin list/detail with permission-based cost/profit/provider fields.
- Internal provider dispatch/inquiry/status commands used by workers, not arbitrary public requests.
- Cancellation/refund/manual-review commands following state/approval policy.

## Audit logs

- Authorized platform/tenant audit search/detail/export request using safe views.
- Audit writes are not generic client-created records; domain commands create them.

## API rules

- Money/order commands require scoped idempotency keys; same key with different payload is rejected.
- Pagination is bounded and tenant-aware; IDs never prove authorization.
- Jobs/events contain tenant, event/message ID, aggregate reference, version, correlation/causation—not secrets or large inputs.
- Provider/network calls never run inside database transactions.
- Errors do not reveal account existence, keys, raw provider responses, cross-tenant existence, or sensitive input.
