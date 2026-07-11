# Sprint 3 — Super Admin and Tenants

## Tickets

- `TEN-001` — Create tenant and assign initial owner.
- `TEN-002` — Tenant status and module enablement.
- `TEN-003` — Basic tenant overview and platform audit view.

## Goal

Allow a Super Admin to create and govern one tenant—for example `Ahmad Store`—without provider, catalog, wallet, or orders.

## Planned work

- Create draft tenant with immutable ID and approved currency/locale/time-zone/plan data.
- Invite/assign initial Tenant Admin while preventing ownerless tenant.
- Activate/deactivate/restrict through explicit state transitions and reason codes.
- Enable only approved modules after dependency/readiness checks.
- Show minimal owner/status/module/domain/provider-readiness/alert overview.
- Show safe platform audit events with separate export permission.

## Entry conditions

- Sprint 2 isolation/permission tests pass.
- Tenant lifecycle/module/suspension policies are accepted.
- Audit event foundation for these actions is ready.

## Required tests

- Atomic tenant+owner creation and rollback.
- Duplicate identifiers, invalid owner, invitation abuse, last-admin protection.
- Allowed/invalid status and module transitions.
- Deactivation blocks new business but preserves safe future inquiry/reconciliation paths.
- Super Admin overview/audit field masking and tenant-data overreach denial.

## Acceptance criteria

- Authorized Super Admin can create `Ahmad Store`, assign its owner, activate/deactivate it, enable approved modules, and view safe audit/readiness.
- Tenant owner sees only their tenant.
- No provider connection, product, wallet, or order functionality exists yet.

## Explicit non-scope

- Self-service tenant signup, billing, plan marketplace, default impersonation, global customer/order browsing, or public activation.

## Stop conditions

- Owner/tenant relationship can cross tenant incorrectly.
- Tenant state transition loses/audits incompletely or implies data deletion.
- Super Admin gains silent broad tenant-data/key/balance access.
- Last Tenant Admin can be removed without safe replacement.
